import { useState, useEffect, useCallback, useRef } from 'react';
import { useApiClient } from '@/lib/api';
import type { AuditLogEntry, PaginatedResponse } from '@/types/admin';

interface AuditLogOptions {
  limit?: number;
  action?: string;
  table_name?: string;
}

export function useAuditLog(options: AuditLogOptions = {}) {
  const api = useApiClient();
  const [data, setData] = useState<PaginatedResponse<AuditLogEntry> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastFetch = useRef(0);

  const buildPath = useCallback(() => {
    const params = new URLSearchParams();
    if (options.limit) params.set('per_page', options.limit.toString());
    if (options.action) params.set('action', options.action);
    if (options.table_name) params.set('table_name', options.table_name);
    const qs = params.toString();
    return `/audit${qs ? `?${qs}` : ''}`;
  }, [options.limit, options.action, options.table_name]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.get<PaginatedResponse<AuditLogEntry>>(buildPath());
      setData(result);
      lastFetch.current = Date.now();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [api, buildPath]);

  useEffect(() => {
    if (Date.now() - lastFetch.current > 30_000) {
      refresh();
    }
  }, [refresh]);

  return { entries: data?.data ?? [], total: data?.total ?? 0, loading, error, refresh };
}
