import { useApiData } from './useApiData';
import type { Lead, PaginatedResponse } from '@/types/admin';

export function useLeads(status?: string) {
  const path = status ? `/leads?status=${status}` : '/leads';
  const { data, loading, error, refresh, api } = useApiData<PaginatedResponse<Lead>>(path);

  const update = async (id: string, lead: Partial<Lead>) => {
    await api.put(`/leads/${id}`, lead);
    await refresh();
  };

  const remove = async (id: string) => {
    await api.del(`/leads/${id}`);
    await refresh();
  };

  return { leads: data?.data ?? [], total: data?.total ?? 0, loading, error, refresh, update, remove };
}
