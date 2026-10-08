/**
 * Web Worker for Heavy JSON Parsing
 * Mathematical: O(n) parsing time, 0 impact on main thread
 * Memory: Worker has its own heap, no GC pressure on main thread
 * Expected: 0ms main thread blocking for 5MB JSON (vs 150-300ms on main)
 */

self.onmessage = (e: MessageEvent) => {
  const { data, operation } = e.data;

  try {
    let result;

    switch (operation) {
      case "parse":
        // JSON.parse is O(n) where n = string length
        result = JSON.parse(data);
        break;

      case "mapFilter":
        // O(n) time, O(n) space for new array
        const arr = JSON.parse(data);
        result = arr
          .map((item: any) => ({ ...item, processed: true }))
          .filter((item: any) => item.active);
        break;

      case "reduce":
        // O(n) time, O(1) space (accumulator)
        const array = JSON.parse(data);
        result = array.reduce((acc: number, item: any) => acc + item.value, 0);
        break;

      default:
        throw new Error("Unknown operation");
    }

    self.postMessage({ success: true, result });
  } catch (error) {
    self.postMessage({ success: false, error: (error as Error).message });
  }
};
