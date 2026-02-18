import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client for development when env vars are missing
const chainable = () => {
  const obj: Record<string, unknown> = { data: [], error: null };
  const proxy = new Proxy(obj, {
    get(target, prop) {
      if (prop in target) return target[prop as string];
      return () => proxy;
    },
  });
  return proxy;
};

const createMockClient = () => ({
  from: () => chainable(),
  channel: () => ({
    on: function() { return this; },
    subscribe: () => ({ unsubscribe: () => {} }),
  }),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
});

export const supabase: SupabaseClient | ReturnType<typeof createMockClient> =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createMockClient() as unknown as SupabaseClient;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Re-export types from central types file for backward compatibility
export type { Project, PortfolioPhoto } from '@/types/admin';
