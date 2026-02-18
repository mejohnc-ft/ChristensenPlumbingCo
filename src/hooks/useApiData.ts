import { useState, useEffect, useCallback, useRef } from 'react';
import { useApiClient } from '@/lib/api';

const STALE_MS = 30_000;

export function useApiData<T>(path: string) {
  const api = useApiClient();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastFetch = useRef(0);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.get<T>(path);
      setData(result);
      lastFetch.current = Date.now();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [api, path]);

  useEffect(() => {
    if (Date.now() - lastFetch.current > STALE_MS) {
      refresh();
    }
  }, [refresh]);

  return { data, loading, error, refresh, api };
}
