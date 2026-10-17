import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/* Grapheme-safe text segmentation                                     */
/* ------------------------------------------------------------------ */

/**
 * Minimal structural types for `Intl.Segmenter`. The project compiles
 * against lib ES2020, which predates `Intl.Segmenter`, so the API is
 * feature-detected at runtime instead of being referenced directly.
 */
interface GraphemeSegmenter {
  segment(input: string): Iterable<{ segment: string }>;
}

interface GraphemeSegmenterConstructor {
  new (
    locales?: string | string[],
    options?: { granularity: "grapheme" }
  ): GraphemeSegmenter;
}

let segmenterCache: GraphemeSegmenter | null | undefined;

function getGraphemeSegmenter(): GraphemeSegmenter | null {
  if (segmenterCache !== undefined) return segmenterCache;

  const Segmenter = (
    Intl as unknown as { Segmenter?: GraphemeSegmenterConstructor }
  ).Segmenter;

  if (!Segmenter) {
    segmenterCache = null;
    return null;
  }

  try {
    segmenterCache = new Segmenter("und", { granularity: "grapheme" });
  } catch {
    segmenterCache = null;
  }
  return segmenterCache;
}

/**
 * Splits text into user-perceived characters (graphemes).
 *
 * Why this matters for Kurdish/Arabic (RTL) text: Arabic-script glyphs can be
 * combining sequences and emoji are surrogate pairs. Slicing by UTF-16 code
 * unit would occasionally paint half a "character" mid-animation (a floating
 * diacritic or a broken glyph). Grapheme slicing never splits those apart.
 *
 * The text itself is never reversed or reordered — the browser's bidi engine
 * renders the growing prefix correctly for RTL and LTR, exactly like typing.
 */
function toGraphemes(text: string): string[] {
  const segmenter = getGraphemeSegmenter();
  if (segmenter) {
    const graphemes: string[] = [];
    for (const { segment } of segmenter.segment(text)) {
      graphemes.push(segment);
    }
    return graphemes;
  }
  // Fallback: code-point iteration — still safe against surrogate-pair splits.
  return Array.from(text);
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export interface TypewriterProps {
  /** The full text to reveal. Rendered exactly as provided — never reversed. */
  text: string;
  /** Milliseconds between characters. 50 = 20 characters/second. Default: 50. */
  speed?: number;
  /** Milliseconds to wait before the first character appears. Default: 0. */
  delay?: number;
  /** Show a blinking caret while typing (hidden when finished). Default: true. */
  showCursor?: boolean;
  /**
   * Base text direction. Defaults to inherited — pass "rtl" for Kurdish/Arabic
   * when the component is used outside an RTL context.
   */
  dir?: "ltr" | "rtl" | "auto";
  /** Called once the final character has been painted. */
  onComplete?: () => void;
  /** Extra classes for the wrapper element. */
  className?: string;
}

/**
 * Zero-lag Typewriter — optimized for the "Zero-Lag Policy":
 *
 * 1. NO React re-renders during the animation. The rAF loop mutates the
 *    text node of a single `<span>` through a ref. React never reconciles
 *    per character.
 * 2. NO `setInterval`. Progress is computed from the rAF timestamp
 *    (`elapsed / speed`), so dropped frames reveal more characters on the
 *    next frame instead of slowing the animation down — no timer drift,
 *    and rAF pauses automatically in background tabs.
 * 3. NO layout thrash. An invisible copy of the full text reserves the
 *    final wrapped layout, and the animated text is painted into an
 *    absolutely-positioned overlay. Document flow never changes while typing.
 * 4. Zero DOM cost before mount — render it conditionally (e.g. only after
 *    a submit succeeds) and it does not exist on first paint.
 *
 * Accessibility: the full message is exposed to assistive tech immediately
 * (the animated layers are `aria-hidden`), and `prefers-reduced-motion`
 * users get the finished text instantly with no animation at all.
 */
export function Typewriter({
  text,
  speed = 50,
  delay = 0,
  showCursor = true,
  dir,
  onComplete,
  className,
}: TypewriterProps) {
  const typedRef = useRef<HTMLSpanElement | null>(null);
  const caretRef = useRef<HTMLSpanElement | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Latest-ref pattern: a parent re-render with a new inline `onComplete`
  // must not restart the animation (the loop only depends on text/speed/delay).
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    const node = typedRef.current;
    const caret = caretRef.current;
    if (!node) return;

    const finish = () => {
      // Direct DOM mutation — one paint, zero re-renders.
      if (caret) caret.style.display = "none";
      onCompleteRef.current?.();
    };

    // Accessibility: users who prefer reduced motion get the full message
    // instantly, with no animation loop at all.
    const reduceMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      node.textContent = text;
      finish();
      return;
    }

    const graphemes = toGraphemes(text);
    const total = graphemes.length;

    if (total === 0) {
      node.textContent = "";
      finish();
      return;
    }

    if (caret) caret.style.display = "";
    node.textContent = "";

    const charMs = Number.isFinite(speed) && speed > 0 ? speed : 50;
    const waitMs = Number.isFinite(delay) && delay > 0 ? delay : 0;

    let rafId = 0;
    let started = false;
    let startAt = 0;
    let painted = 0;

    const step = (now: number) => {
      if (!started) {
        started = true;
        startAt = now + waitMs;
      }

      const elapsed = now - startAt;
      // Time-based progress — immune to frame drops and timer drift.
      const count =
        elapsed < 0
          ? 0
          : Math.min(total, Math.floor(elapsed / charMs) + 1);

      if (count !== painted) {
        painted = count;
        // One text-node write per visible change. The guard keeps 120Hz+
        // displays from re-writing identical content between character steps.
        node.textContent =
          count >= total ? text : graphemes.slice(0, count).join("");
      }

      if (count < total) {
        rafId = requestAnimationFrame(step);
      } else {
        finish();
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [text, speed, delay]);

  return (
    <span dir={dir} className={`relative inline-block ${className ?? ""}`}>
      {/* Assistive tech reads the complete message immediately. */}
      <span className="sr-only">{text}</span>
      {/* Invisible copy reserves the final wrapped layout -> zero reflow/CLS while typing. */}
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      {/* Painted layer: updated directly through the DOM by requestAnimationFrame. */}
      <span aria-hidden="true" className="absolute inset-0">
        <span ref={typedRef} />
        {showCursor && <span ref={caretRef} className="typewriter-caret" />}
      </span>
    </span>
  );
}
