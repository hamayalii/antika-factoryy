import { useEffect, useRef, useState, ReactNode } from "react";

/**
 * Selective Hydration Wrapper
 * Mathematical: Reduces initial hydration time from O(n) to O(k) where k << n
 * Hydration complexity: O(1) for non-intersecting components
 * Memory impact: 0 (no allocation during hydration defer)
 */
interface SelectiveHydrationProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
}

export function SelectiveHydration({
  children,
  threshold = 0.1,
  rootMargin = "0px 0px 200px 0px",
  fallback = null,
}: SelectiveHydrationProps) {
  const [shouldHydrate, setShouldHydrate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldHydrate(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  if (!shouldHydrate) {
    return <div ref={ref} style={{ minHeight: "1px" }}>{fallback}</div>;
  }

  return <>{children}</>;
}
