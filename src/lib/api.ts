import { useAuth } from '@clerk/clerk-react';
import { useCallback, useMemo } from 'react';

class ApiClient {
  constructor(private getToken: () => Promise<string | null>) {}

  private async headers(): Promise<Record<string, string>> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const token = await this.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  async get<T>(path: string): Promise<T> {
    const res = await fetch(`/api${path}`, { headers: await this.headers() });
    if (!res.ok) throw new Error((await res.json()).error || res.statusText);
    return res.json();
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`/api${path}`, {
      method: 'POST',
      headers: await this.headers(),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error((await res.json()).error || res.statusText);
    return res.json();
  }

  async put<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`/api${path}`, {
      method: 'PUT',
      headers: await this.headers(),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error((await res.json()).error || res.statusText);
    return res.json();
  }

  async del<T>(path: string): Promise<T> {
    const res = await fetch(`/api${path}`, {
      method: 'DELETE',
      headers: await this.headers(),
    });
    if (!res.ok) throw new Error((await res.json()).error || res.statusText);
    return res.json();
  }

  async upload(file: File, bucket?: string): Promise<{ url: string; path: string }> {
    const token = await this.getToken();
    const formData = new FormData();
    formData.append('file', file);
    if (bucket) formData.append('bucket', bucket);

    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch('/api/upload', { method: 'POST', headers, body: formData });
    if (!res.ok) throw new Error((await res.json()).error || res.statusText);
    return res.json();
  }
}

export function useApiClient(): ApiClient {
  const { getToken } = useAuth();
  const tokenFn = useCallback(() => getToken(), [getToken]);
  return useMemo(() => new ApiClient(tokenFn), [tokenFn]);
}
