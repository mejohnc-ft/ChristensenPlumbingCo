import { useApiData } from './useApiData';
import type { Review, PaginatedResponse } from '@/types/admin';

export function useReviews() {
  const { data, loading, error, refresh, api } = useApiData<PaginatedResponse<Review>>('/reviews');

  const create = async (review: Partial<Review>) => {
    await api.post('/reviews', review);
    await refresh();
  };

  const update = async (id: string, review: Partial<Review>) => {
    await api.put(`/reviews/${id}`, review);
    await refresh();
  };

  const remove = async (id: string) => {
    await api.del(`/reviews/${id}`);
    await refresh();
  };

  return { reviews: data?.data ?? [], total: data?.total ?? 0, loading, error, refresh, create, update, remove };
}
