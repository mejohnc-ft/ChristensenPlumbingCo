import { useState, useEffect, useCallback, useRef } from 'react';
import { useApiClient } from '@/lib/api';
import type { BlogPost, PaginatedResponse } from '@/types/admin';

interface BlogPostsOptions {
  page?: number;
  perPage?: number;
  category?: string;
  tag?: string;
  search?: string;
  status?: string;
}

export function useBlogPosts(options: BlogPostsOptions = {}) {
  const api = useApiClient();
  const [data, setData] = useState<PaginatedResponse<BlogPost> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastFetch = useRef(0);

  const buildPath = useCallback(() => {
    const params = new URLSearchParams();
    if (options.page) params.set('page', options.page.toString());
    if (options.perPage) params.set('per_page', options.perPage.toString());
    if (options.category) params.set('category', options.category);
    if (options.tag) params.set('tag', options.tag);
    if (options.search) params.set('search', options.search);
    if (options.status) params.set('status', options.status);
    const qs = params.toString();
    return `/blog-posts${qs ? `?${qs}` : ''}`;
  }, [options.page, options.perPage, options.category, options.tag, options.search, options.status]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.get<PaginatedResponse<BlogPost>>(buildPath());
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

  const create = async (post: Partial<BlogPost>) => {
    const result = await api.post<BlogPost>('/blog-posts', post);
    await refresh();
    return result;
  };

  const update = async (id: string, post: Partial<BlogPost>) => {
    const result = await api.put<BlogPost>(`/blog-posts/${id}`, post);
    await refresh();
    return result;
  };

  const remove = async (id: string) => {
    await api.del(`/blog-posts/${id}`);
    await refresh();
  };

  return { posts: data?.data ?? [], total: data?.total ?? 0, hasMore: data?.has_more ?? false, loading, error, refresh, create, update, remove };
}
