import { useApiData } from './useApiData';
import type { FAQ } from '@/types/admin';

export function useFaqs() {
  const { data, loading, error, refresh, api } = useApiData<FAQ[]>('/faqs');

  const create = async (faq: Partial<FAQ>) => {
    await api.post('/faqs', faq);
    await refresh();
  };

  const update = async (id: string, faq: Partial<FAQ>) => {
    await api.put(`/faqs/${id}`, faq);
    await refresh();
  };

  const remove = async (id: string) => {
    await api.del(`/faqs/${id}`);
    await refresh();
  };

  return { faqs: data ?? [], loading, error, refresh, create, update, remove };
}
