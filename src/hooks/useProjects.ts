import { useApiData } from './useApiData';
import type { Project, PaginatedResponse } from '@/types/admin';

export function useProjects() {
  const { data, loading, error, refresh, api } = useApiData<PaginatedResponse<Project>>('/projects');

  const create = async (project: Partial<Project>) => {
    await api.post('/projects', project);
    await refresh();
  };

  const update = async (id: string, project: Partial<Project>) => {
    await api.put(`/projects/${id}`, project);
    await refresh();
  };

  const remove = async (id: string) => {
    await api.del(`/projects/${id}`);
    await refresh();
  };

  return { projects: data?.data ?? [], total: data?.total ?? 0, loading, error, refresh, create, update, remove };
}
