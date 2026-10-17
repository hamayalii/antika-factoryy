import { useEffect, useRef, useState } from "react";
import { Languages } from "lucide-react";
import { LANGUAGES, useLanguage, type Language } from "../contexts/LanguageContext";

/**
 * Expanding segmented language switcher (navbar).
 *
 * Collapsed it is a small pill: [translate icon] [active code]. Hovering,
 * tapping or tab-focusing it smoothly expands it horizontally to reveal every
 * available language (KU · EN · AR). The active language sits on a white pill
 * with a soft drop shadow; inactive codes stay as plain text. Leaving the
 * component (mouse-out, blur, outside click, Escape) collapses it again.
 *
 * The control carries `dir="ltr"` on purpose: language codes are Latin/mute
 * labels, so KU · EN · AR keeps a stable reading order in both the RTL and
 * LTR versions of the site.
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // While expanded: click-outside and Escape collapse the control. Registered
  // only when open so the listeners cost nothing on the collapsed default.
  useEffect(() => {
    if (!expanded) return;

    const onPointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  const selectLanguage = (next: Language) => {
    setLanguage(next);
    setExpanded(false);
  };

  return (
    <div
      ref={containerRef}
      dir="ltr"
      role="group"
      aria-label={t("header.language")}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocusCapture={() => setExpanded(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setExpanded(false);
        }
      }}
      className={`flex items-center rounded-full border border-black/[0.06] bg-white/75 p-1 shadow-sm backdrop-blur-md ${className}`}
    >
      {/* Translate glyph — fixed anchor of the collapsed pill */}
      <span
        aria-hidden="true"
        className={`grid h-6 w-6 shrink-0 place-items-center text-gray-600 transition-colors duration-300 ${
          expanded ? "text-gray-800" : ""
        }`}
      >
        <Languages className="h-4 w-4" />
      </span>

      {LANGUAGES.map((option) => {
        const isActive = option.code === language;
        return (
          <button
            key={option.code}
            type="button"
            lang={option.htmlLang}
            title={option.ready ? option.nativeName : `${option.nativeName} — ${t("header.languageSoon")}`}
            aria-pressed={isActive}
            onClick={() => selectLanguage(option.code)}
            className={`relative h-6 overflow-hidden rounded-full text-[11px] font-bold tracking-wide transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 ${
              isActive
                ? "max-w-12 bg-white px-3 text-gray-900 shadow-[0_1px_4px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
                : expanded
                  ? "max-w-12 px-2.5 text-gray-500 opacity-100 hover:text-gray-900"
                  : "pointer-events-none max-w-0 px-0 text-gray-500 opacity-0"
            }`}
          >
            {option.label}
            {/* AR ships ahead of its copy: small amber dot flags "coming soon". */}
            {!option.ready && (
              <span className="absolute right-1 top-1 h-1 w-1 rounded-full bg-amber-400" aria-hidden="true" />
            )}
          </button>
        );
      })}
    </div>
  );
}
