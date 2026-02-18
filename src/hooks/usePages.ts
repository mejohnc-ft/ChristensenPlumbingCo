import { useApiData } from './useApiData';
import type { PageItem } from '@/types/admin';

export function usePages() {
  const { data, loading, error, refresh, api } = useApiData<PageItem[]>('/pages');

  const create = async (page: Partial<PageItem>) => {
    await api.post('/pages', page);
    await refresh();
  };

  const update = async (id: string, page: Partial<PageItem>) => {
    await api.put(`/pages/${id}`, page);
    await refresh();
  };

  const remove = async (id: string) => {
    await api.del(`/pages/${id}`);
    await refresh();
  };

  return { pages: data ?? [], loading, error, refresh, create, update, remove };
}
