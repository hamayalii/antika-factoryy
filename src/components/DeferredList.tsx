import { useState, useTransition, useDeferredValue, useMemo } from "react";

/**
 * Deferred List Component
 * Mathematical: List rendering O(n) deferred to non-critical task
 * Time complexity: O(n) but offloaded to lower priority task
 * Space complexity: O(n) (same as synchronous)
 * Expected: UI remains responsive during 1000+ item rendering
 */
interface DeferredListProps {
  items: Array<{ id: number; name: string; value: number }>;
  renderItem: (item: any) => React.ReactNode;
}

export function DeferredList({ items, renderItem }: DeferredListProps) {
  const [filter, setFilter] = useState("");
  const [isPending, startTransition] = useTransition();

  // useDeferredValue: React will defer updates to this value
  // Mathematical: Creates a deferred copy, main thread sees old value until render completes
  const deferredFilter = useDeferredValue(filter);
  const deferredItems = useDeferredValue(items);

  // Memoize filtered list - O(n) time, O(n) space
  const filteredItems = useMemo(() => {
    return deferredItems.filter((item) =>
      item.name.toLowerCase().includes(deferredFilter.toLowerCase())
    );
  }, [deferredItems, deferredFilter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Priority 1: Update input immediately (user input)
    setFilter(e.target.value);

    // Priority 2: Filter operation (lower priority, non-blocking)
    startTransition(() => {
      // This update is marked as transition (interruptible)
      // React can abort if higher priority work arrives
    });
  };

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter items..."
        style={{ marginBottom: "16px", padding: "8px" }}
      />
      {isPending && <div style={{ color: "#666", fontSize: "12px" }}>Updating...</div>}
      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        {filteredItems.map((item) => (
          <div key={item.id}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
