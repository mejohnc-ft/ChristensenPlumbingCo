import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client for development when env vars are missing
const createMockClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: () => Promise.resolve({ error: null }),
    signInWithPassword: () => Promise.resolve({ data: { session: null }, error: { message: 'Supabase not configured' } }),
  },
  from: () => ({
    select: () => ({ data: [], error: null, order: () => ({ data: [], error: null }) }),
    insert: () => ({ data: null, error: { message: 'Supabase not configured' } }),
    update: () => ({ data: null, error: { message: 'Supabase not configured' } }),
    delete: () => ({ data: null, error: { message: 'Supabase not configured' } }),
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

export interface PortfolioPhoto {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  project_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug?: string;
  description: string;
  category: string;
  location: string;
  completion_date: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  photos?: PortfolioPhoto[];
}