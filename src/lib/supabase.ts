import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  description: string;
  category: string;
  location: string;
  completion_date: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  photos?: PortfolioPhoto[];
}