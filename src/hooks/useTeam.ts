import { useApiData } from './useApiData';
import type { TeamMember } from '@/types/admin';

export function useTeam() {
  const { data, loading, error, refresh, api } = useApiData<TeamMember[]>('/team');

  const create = async (member: Partial<TeamMember>) => {
    await api.post('/team', member);
    await refresh();
  };

  const update = async (id: string, member: Partial<TeamMember>) => {
    await api.put(`/team/${id}`, member);
    await refresh();
  };

  const remove = async (id: string) => {
    await api.del(`/team/${id}`);
    await refresh();
  };

  return { members: data ?? [], loading, error, refresh, create, update, remove };
}
