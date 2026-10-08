import { useSyncExternalStore, useEffect, useRef, useMemo } from "react";

/**
 * External Store Pattern for High-Frequency Data
 * Mathematical: O(1) space complexity for store, O(k) renders where k = subscription count
 * Uses useSyncExternalStore to bypass React state cycle for external mutable data
 * Forces render only when snapshot changes, minimizing memory thrashing
 */

type Listener = () => void;
type Snapshot<T> = T;
type GetSnapshot<T> = () => Snapshot<T>;
type Subscribe = (listener: Listener) => () => void;

export interface ExternalStore<T> {
  getSnapshot: GetSnapshot<T>;
  subscribe: Subscribe;
  set: (value: T) => void;
}

/**
 * Create an external store outside React's render cycle
 * Mathematical: Store allocation O(1), subscription O(1), notification O(k) where k = listeners
 * Memory: Single allocation, no thrashing on updates
 */
export function createExternalStore<T>(initialValue: T): ExternalStore<T> {
  let value = initialValue;
  const listeners = new Set<Listener>();

  const getSnapshot: GetSnapshot<T> = () => value;

  const subscribe: Subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const set = (newValue: T) => {
    if (value !== newValue) {
      value = newValue;
      listeners.forEach((listener) => listener());
    }
  };

  return { getSnapshot, subscribe, set };
}

/**
 * React hook to subscribe to external store
 * Mathematical: Render triggers only when snapshot actually changes
 * Space complexity: O(1) (store reference, no copy)
 */
export function useExternalStore<T>(store: ExternalStore<T>): T {
  return useSyncExternalStore(store.subscribe, store.getSnapshot);
}

/**
 * Optimized Scroll Store
 * Mathematical: O(1) space, O(1) update time
 * Stores scroll position outside React state, subscribes on demand
 */
export const scrollStore = createExternalStore({ x: 0, y: 0 });

/**
 * Hook to read scroll position with zero React state overhead
 * Mathematical: Render only when scroll position changes by threshold
 */
export function useScrollPosition(threshold: number = 1) {
  const lastScroll = useRef({ x: 0, y: 0 });
  
  const throttledStore = useMemo(() => {
    return createExternalStore({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          const x = window.scrollX || window.pageXOffset;
          const y = window.scrollY || window.pageYOffset;

          // Threshold check to minimize renders
          if (Math.abs(y - lastScroll.current.y) >= threshold ||
              Math.abs(x - lastScroll.current.x) >= threshold) {
            throttledStore.set({ x, y });
            lastScroll.current = { x, y };
          }

          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, throttledStore]);

  return useExternalStore(throttledStore);
}
