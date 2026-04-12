import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseAsyncResult<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  reload: () => void;
}

export interface UseAsyncOptions {
  immediate?: boolean;
}

export function useAsync<T>(
  fn: () => Promise<T>,
  options: UseAsyncOptions = {}
): UseAsyncResult<T> {
  const { immediate = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [trigger, setTrigger] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (!immediate && trigger === 0) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fn()
      .then((result) => {
        if (!cancelled && mountedRef.current) {
          setData(result);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled && mountedRef.current) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setData(null);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [trigger, immediate]);

  const reload = useCallback(() => {
    setTrigger((t) => t + 1);
  }, []);

  return { data, error, loading, reload };
}
