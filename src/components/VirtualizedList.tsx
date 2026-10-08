import { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

/**
 * Virtualized List Component
 * Mathematical: 
 * - DOM Space Complexity: O(c) where c = visible + overscan (constant)
 * - Rendering Time Complexity: O(c) per frame, O(1) amortized per item
 * - Comparison: O(n) → O(c) where n = total items, c ≈ 20-30
 * - For n = 100,000: DOM nodes reduced from 100,000 to ~30 (99.97% reduction)
 * 
 * Uses CSS transform: translateY() for positioning
 * Bypasses expensive Browser Layout/Reflow cycles
 * Recycling pattern: DOM nodes are reused, not destroyed/created
 */
interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  estimateSize?: (index: number) => number;
  overscan?: number;
  height?: number | string;
}

export function VirtualizedList<T>({
  items,
  renderItem,
  estimateSize = () => 60,
  overscan = 5,
  height = "500px",
}: VirtualizedListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  // useVirtualizer implements windowing algorithm
  // Mathematical: O(c) virtual rows computed in O(log n) via binary search
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      style={{
        height,
        overflow: "auto",
        position: "relative",
        // Force GPU acceleration for container
        willChange: "transform",
        // Prevent subpixel rendering issues
        transform: "translateZ(0)",
      }}
    >
      {/* Spacer at top to maintain scroll position */}
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />

      {/* Virtual items - only O(c) rendered */}
      {virtualItems.map((virtualItem) => {
        const item = items[virtualItem.index];
        return (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              // CSS transform: translateY() for positioning
              // Mathematical: transform is composited, no layout/reflow
              transform: `translateY(${virtualItem.start}px)`,
              // Force GPU layer for smooth scrolling
              willChange: "transform",
              // Prevent content jumping during measurement
              contain: "layout style paint",
            }}
          >
            {renderItem(item, virtualItem.index)}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Variable Height Virtualized List
 * For items with dynamic heights (images, variable text)
 * Mathematical: Same O(c) space complexity, but with O(log n) lookup for positions
 */
interface VariableHeightVirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  defaultEstimateSize?: number;
  overscan?: number;
  height?: number | string;
}

export function VariableHeightVirtualizedList<T>({
  items,
  renderItem,
  defaultEstimateSize = 60,
  overscan = 5,
  height = "500px",
}: VariableHeightVirtualizedListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => defaultEstimateSize,
    overscan,
    // Measure actual size after render for variable heights
    measureElement: (element) => {
      // Mathematical: O(1) measurement per item, cached after first render
      return element?.getBoundingClientRect().height ?? defaultEstimateSize;
    },
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      style={{
        height,
        overflow: "auto",
        position: "relative",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />

      {virtualItems.map((virtualItem) => {
        const item = items[virtualItem.index];
        return (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualItem.start}px)`,
              willChange: "transform",
              contain: "layout style paint",
            }}
          >
            {renderItem(item, virtualItem.index)}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Infinite Scroll Virtualized List
 * Mathematical: O(c) space, O(1) amortized per new item loaded
 * Combines virtualization with infinite loading
 */
interface InfiniteVirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  fetchMore: () => void | Promise<void>;
  hasMore: boolean;
  isLoading?: boolean;
  estimateSize?: (index: number) => number;
  overscan?: number;
  height?: number | string;
}

export function InfiniteVirtualizedList<T>({
  items,
  renderItem,
  fetchMore,
  hasMore,
  isLoading = false,
  estimateSize = () => 60,
  overscan = 5,
  height = "500px",
}: InfiniteVirtualizedListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: hasMore ? items.length + 1 : items.length,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan,
  });

  const virtualItems = virtualizer.getVirtualItems();

  // Detect when near bottom to fetch more
  // Mathematical: O(1) check per render
  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse();
    if (!lastItem) return;

    const isNearBottom = lastItem.index >= items.length - 5;
    if (isNearBottom && hasMore && !isLoading) {
      fetchMore();
    }
  }, [virtualItems, items.length, hasMore, isLoading, fetchMore]);

  return (
    <div
      ref={parentRef}
      style={{
        height,
        overflow: "auto",
        position: "relative",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />

      {virtualItems.map((virtualItem) => {
        if (virtualItem.index >= items.length) {
          // Loading indicator
          return (
            <div
              key="loading"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
                padding: "16px",
                textAlign: "center",
              }}
            >
              {isLoading ? "Loading..." : "End of list"}
            </div>
          );
        }

        const item = items[virtualItem.index];
        return (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualItem.start}px)`,
              willChange: "transform",
              contain: "layout style paint",
            }}
          >
            {renderItem(item, virtualItem.index)}
          </div>
        );
      })}
    </div>
  );
}
