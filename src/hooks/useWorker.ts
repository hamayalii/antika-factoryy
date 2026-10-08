import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Web Worker Hook
 * Mathematical: O(1) main thread time complexity for worker task
 * Memory: Worker allocated once, reused (no thrashing)
 */
export function useWorker<T, R>(
  workerFn: () => Worker,
  initialData?: T
) {
  const [result, setResult] = useState<R | null>(initialData || null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = workerFn();

    workerRef.current.onmessage = (e) => {
      const { success, result: workerResult, error: workerError } = e.data;
      if (success) {
        setResult(workerResult);
        setError(null);
      } else {
        setError(workerError);
      }
      setLoading(false);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [workerFn]);

  const execute = useCallback((data: T, operation?: string) => {
    if (!workerRef.current) return;
    setLoading(true);
    setError(null);
    workerRef.current.postMessage({ data, operation });
  }, []);

  return { result, error, loading, execute };
}
