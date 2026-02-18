import { useApiData } from './useApiData';
import type { PortfolioPhoto } from '@/types/admin';

export function usePhotos(projectId?: string) {
  const path = projectId ? `/photos?project_id=${projectId}` : '/photos';
  const { data, loading, error, refresh, api } = useApiData<{ data: PortfolioPhoto[]; total: number }>(path);

  const create = async (photo: Partial<PortfolioPhoto>) => {
    await api.post('/photos', photo);
    await refresh();
  };

  const update = async (id: string, photo: Partial<PortfolioPhoto>) => {
    await api.put(`/photos/${id}`, photo);
    await refresh();
  };

  const remove = async (id: string) => {
    await api.del(`/photos/${id}`);
    await refresh();
  };

  const upload = async (file: File) => {
    return api.upload(file, 'photos');
  };

  return { photos: data?.data ?? [], total: data?.total ?? 0, loading, error, refresh, create, update, remove, upload };
}
