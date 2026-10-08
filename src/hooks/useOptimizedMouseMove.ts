import { useEffect, useRef, useCallback } from "react";

/**
 * Optimized Mouse Move Hook
 * Mathematical: O(1) time per frame, O(1) space (pre-allocated objects)
 * Prevents memory leaks by reusing objects instead of creating new ones
 * Critical: Mousemove fires 60-120 times per second - allocations cause GC thrashing
 */
interface MousePosition {
  x: number;
  y: number;
}

export function useOptimizedMouseMove(
  callback: (position: MousePosition) => void,
  throttleMs: number = 16 // 60fps default
) {
  const lastCallRef = useRef(0);
  const positionRef = useRef<MousePosition>({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);

  const optimizedCallback = useCallback(() => {
    callback(positionRef.current);
    rafIdRef.current = null;
  }, [callback]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Reuse existing object instead of creating new one
      // Mathematical: O(1) space (no allocation) vs O(1) with allocation
      positionRef.current.x = e.clientX;
      positionRef.current.y = e.clientY;

      // Throttle via RAF
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(optimizedCallback);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [optimizedCallback]);
}

/**
 * Pattern: Avoid Array/Object Allocation in Hot Paths
 * Mathematical: Allocation cost = O(n) for GC, 0 for reuse
 * Example: DON'T do this in scroll/mousemove:
 * 
 * ❌ BAD (allocates on every event):
 * const position = { x: e.clientX, y: e.clientY };
 * const items = data.filter(...); // New array allocation
 * 
 * ✅ GOOD (pre-allocated):
 * positionRef.current.x = e.clientX;
 * positionRef.current.y = e.clientY;
 * // Mutate existing array, don't create new one
 */

/**
 * High-Frequency Event Pattern
 * Use this pattern for any event that fires > 10 times per second
 */
export function useHighFrequencyEvent<T extends keyof WindowEventMap>(
  event: T,
  callback: (e: WindowEventMap[T]) => void,
  options: { passive?: boolean; throttle?: boolean } = {}
) {
  const { passive = true, throttle = true } = options;
  const rafIdRef = useRef<number | null>(null);
  const lastEventRef = useRef<WindowEventMap[T] | null>(null);

  useEffect(() => {
    const handler = (e: WindowEventMap[T]) => {
      if (throttle) {
        lastEventRef.current = e;
        if (rafIdRef.current === null) {
          rafIdRef.current = requestAnimationFrame(() => {
            if (lastEventRef.current) {
              callback(lastEventRef.current);
            }
            rafIdRef.current = null;
          });
        }
      } else {
        callback(e);
      }
    };

    window.addEventListener(event, handler, { passive });

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener(event, handler);
    };
  }, [event, callback, throttle, passive]);
}
