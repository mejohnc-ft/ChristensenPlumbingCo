import { useApiData } from './useApiData';
import type { SiteSetting } from '@/types/admin';

export function useSettings() {
  const { data, loading, error, refresh, api } = useApiData<SiteSetting[]>('/settings');

  const update = async (key: string, value: unknown, category = 'general') => {
    await api.put(`/settings/${key}`, { value, category });
    await refresh();
  };

  const bulkUpdate = async (settings: { key: string; value: unknown; category?: string }[]) => {
    await api.put('/settings', settings);
    await refresh();
  };

  // Helper to get a setting value by key
  const getSetting = (key: string): unknown => {
    const setting = (data ?? []).find(s => s.key === key);
    return setting?.value;
  };

  return { settings: data ?? [], loading, error, refresh, update, bulkUpdate, getSetting };
}
