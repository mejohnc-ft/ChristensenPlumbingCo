import { useState, useEffect, useCallback } from 'react';
import { useApiClient } from '@/lib/api';
import type { DashboardStats, PaginatedResponse, Project, Lead, PortfolioPhoto, ReviewAggregates } from '@/types/admin';

export function useDashboardStats() {
  const api = useApiClient();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [projects, photos, aggregates, leads] = await Promise.all([
        api.get<PaginatedResponse<Project>>('/projects?per_page=1'),
        api.get<{ data: PortfolioPhoto[]; total: number }>('/photos'),
        api.get<ReviewAggregates[]>('/reviews?aggregates=true'),
        api.get<PaginatedResponse<Lead>>('/leads?per_page=1'),
      ]);

      const totalReviews = aggregates.reduce((sum, a) => sum + a.total_count, 0);
      const avgRating = aggregates.length
        ? aggregates.reduce((sum, a) => sum + a.average_rating * a.total_count, 0) / (totalReviews || 1)
        : 0;

      // Count new leads
      const newLeadsRes = await api.get<PaginatedResponse<Lead>>('/leads?status=new&per_page=1');

      setStats({
        total_projects: projects.total,
        total_photos: photos.total,
        average_rating: Math.round(avgRating * 10) / 10,
        total_reviews: totalReviews,
        new_leads: newLeadsRes.total,
        total_leads: leads.total,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { stats, loading, error, refresh };
}
