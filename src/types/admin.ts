// Centralized TypeScript interfaces matching the database schema

export interface Project {
  id: string;
  title: string;
  slug?: string;
  description: string;
  category: string;
  location: string;
  completion_date: string;
  featured: boolean;
  problem_text?: string;
  approach_text?: string;
  result_text?: string;
  metrics?: Record<string, unknown>;
  is_published?: boolean;
  view_count?: number;
  display_order?: number;
  created_at: string;
  updated_at: string;
  photos?: PortfolioPhoto[];
}

export interface PortfolioPhoto {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  project_id?: string;
  display_order?: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  source: 'google' | 'yelp' | 'manual' | 'angi' | 'facebook' | 'nextdoor';
  external_id?: string;
  author_name: string;
  author_avatar_url?: string;
  rating: number;
  content: string;
  service_type?: string;
  review_date: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
}

export interface ReviewAggregates {
  id: string;
  source: string;
  total_count: number;
  average_rating: number;
  rating_5_count: number;
  rating_4_count: number;
  rating_3_count: number;
  rating_2_count: number;
  rating_1_count: number;
  last_synced_at?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service_type?: string;
  message: string;
  source_page?: string;
  is_emergency: boolean;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'archived';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo_url?: string;
  credentials?: string[];
  display_order: number;
  is_visible: boolean;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: unknown;
  category: string;
  updated_at: string;
  updated_by?: string;
}

export interface AuditLogEntry {
  id: string;
  user_id?: string;
  user_email?: string;
  action: 'create' | 'update' | 'delete';
  table_name: string;
  record_id?: string;
  old_values?: Record<string, unknown>;
  new_values?: Record<string, unknown>;
  ip_address?: string;
  created_at: string;
}

export interface PageItem {
  id: string;
  slug: string;
  title: string;
  meta_title?: string;
  meta_description?: string;
  og_image_url?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  sections?: PageSection[];
}

export interface PageSection {
  id: string;
  page_id: string;
  section_type: string;
  title?: string;
  content: Record<string, unknown>;
  position: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image_url?: string;
  author_name: string;
  category?: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  reading_time_minutes?: number;
  meta_title?: string;
  meta_description?: string;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  has_more: boolean;
}

export interface DashboardStats {
  total_projects: number;
  total_photos: number;
  average_rating: number;
  total_reviews: number;
  new_leads: number;
  total_leads: number;
}
