/*
  # Core Schema for Christensen Plumbing Co. CMS

  This migration creates all new tables required for the CMS:
  1. site_settings - Global configuration storage
  2. pages - CMS-managed pages
  3. page_sections - Modular content blocks for pages
  4. reviews - Customer reviews from multiple sources
  5. review_aggregates - Cached review statistics per source
  6. team_members - Staff directory
  7. faqs - Frequently asked questions
  8. services - Service offerings
  9. service_areas - Geographic service coverage
  10. leads - Contact form submissions
  11. audit_log - Change tracking for admin actions

  Created: 2026-01-06
*/

-- ============================================================================
-- HELPER FUNCTION: is_admin() placeholder for Clerk JWT integration
-- ============================================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  -- Placeholder: will be replaced with Clerk JWT claim check
  -- Example: RETURN (current_setting('request.jwt.claims', true)::jsonb->>'role') = 'admin';
  RETURN (current_setting('request.jwt.claims', true)::jsonb->>'role') = 'admin';
EXCEPTION
  WHEN OTHERS THEN RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- TABLE: site_settings
-- Purpose: Key-value store for global configuration
-- ============================================================================

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  category text DEFAULT 'general',
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create index for fast lookups by key and category
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_site_settings_category ON site_settings(category);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Pre-populate with default settings
INSERT INTO site_settings (key, value, category) VALUES
  ('business_name', '"Christensen Plumbing Co."'::jsonb, 'general'),
  ('phone', '{"primary": "(619) 555-0123", "emergency": "(619) 555-0911"}'::jsonb, 'contact'),
  ('email', '{"general": "info@christensenplumbing.com", "support": "support@christensenplumbing.com"}'::jsonb, 'contact'),
  ('address', '{"street": "123 Main Street", "city": "San Diego", "state": "CA", "zip": "92101", "formatted": "123 Main Street, San Diego, CA 92101"}'::jsonb, 'contact'),
  ('hours', '{"monday": {"open": "07:00", "close": "18:00"}, "tuesday": {"open": "07:00", "close": "18:00"}, "wednesday": {"open": "07:00", "close": "18:00"}, "thursday": {"open": "07:00", "close": "18:00"}, "friday": {"open": "07:00", "close": "18:00"}, "saturday": {"open": "08:00", "close": "14:00"}, "sunday": {"closed": true}, "note": "24/7 Emergency Service Available"}'::jsonb, 'hours'),
  ('service_area_description', '"Proudly serving San Diego County and surrounding areas including La Jolla, Carlsbad, Chula Vista, and more."'::jsonb, 'service'),
  ('seo_defaults', '{"title_suffix": " | Christensen Plumbing Co.", "meta_description": "Professional plumbing services in San Diego. Licensed, insured, and available 24/7 for emergencies.", "og_image": "/images/og-default.jpg"}'::jsonb, 'seo'),
  ('social_links', '{"facebook": "https://facebook.com/christensenplumbing", "instagram": "https://instagram.com/christensenplumbing", "yelp": "https://yelp.com/biz/christensen-plumbing", "google_business": "https://g.page/christensenplumbing", "nextdoor": "https://nextdoor.com/pages/christensen-plumbing"}'::jsonb, 'social')
ON CONFLICT (key) DO NOTHING;

-- ============================================================================
-- TABLE: pages
-- Purpose: CMS-managed page definitions
-- ============================================================================

CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  meta_title text,
  meta_description text,
  og_image_url text,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for fast slug lookups
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_is_published ON pages(is_published);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Create trigger for updated_at
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Pre-populate with core pages
INSERT INTO pages (slug, title, meta_title, meta_description, is_published) VALUES
  ('home', 'Home', 'San Diego Plumbing Services', 'Professional plumbing services in San Diego. Licensed, insured, and available 24/7.', true),
  ('about', 'About Us', 'About Christensen Plumbing Co.', 'Learn about our team of licensed plumbers serving San Diego since 1985.', true),
  ('services', 'Our Services', 'Plumbing Services in San Diego', 'Full-service plumbing for residential and commercial properties.', true),
  ('portfolio', 'Portfolio', 'Our Work', 'Browse our portfolio of completed plumbing projects.', true),
  ('contact', 'Contact', 'Contact Us', 'Get in touch with Christensen Plumbing Co. for all your plumbing needs.', true),
  ('reviews', 'Reviews', 'Customer Reviews', 'Read what our customers say about Christensen Plumbing Co.', true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- TABLE: page_sections
-- Purpose: Modular content blocks for each page
-- ============================================================================

CREATE TABLE IF NOT EXISTS page_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  section_type text NOT NULL, -- hero, services, testimonials, cta, faq, content, gallery, team, etc.
  title text,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  position integer NOT NULL,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  -- Ensure unique ordering per page
  CONSTRAINT unique_page_section_position UNIQUE (page_id, position)
);

-- Create indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_page_sections_page_id ON page_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_page_sections_section_type ON page_sections(section_type);
CREATE INDEX IF NOT EXISTS idx_page_sections_position ON page_sections(position);
CREATE INDEX IF NOT EXISTS idx_page_sections_is_visible ON page_sections(is_visible);

-- Enable RLS
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;

-- Create trigger for updated_at
CREATE TRIGGER update_page_sections_updated_at
  BEFORE UPDATE ON page_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: reviews
-- Purpose: Customer reviews from multiple sources
-- ============================================================================

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL, -- google, yelp, manual, angi, facebook, nextdoor
  external_id text, -- ID from external source for deduplication
  author_name text NOT NULL,
  author_avatar_url text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content text NOT NULL,
  service_type text, -- plumbing, water_heater, drain, etc.
  review_date date NOT NULL,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),

  -- Prevent duplicate imports from same source
  CONSTRAINT unique_external_review UNIQUE (source, external_id)
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_reviews_source ON reviews(source);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_is_featured ON reviews(is_featured);
CREATE INDEX IF NOT EXISTS idx_reviews_is_published ON reviews(is_published);
CREATE INDEX IF NOT EXISTS idx_reviews_review_date ON reviews(review_date DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_service_type ON reviews(service_type);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- TABLE: review_aggregates
-- Purpose: Cached statistics per review source for fast loading
-- ============================================================================

CREATE TABLE IF NOT EXISTS review_aggregates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text UNIQUE NOT NULL,
  total_count integer DEFAULT 0,
  average_rating numeric(2,1) DEFAULT 0,
  rating_5_count integer DEFAULT 0,
  rating_4_count integer DEFAULT 0,
  rating_3_count integer DEFAULT 0,
  rating_2_count integer DEFAULT 0,
  rating_1_count integer DEFAULT 0,
  last_synced_at timestamptz
);

-- Create index for fast source lookups
CREATE INDEX IF NOT EXISTS idx_review_aggregates_source ON review_aggregates(source);

-- Enable RLS
ALTER TABLE review_aggregates ENABLE ROW LEVEL SECURITY;

-- Pre-populate with known sources
INSERT INTO review_aggregates (source) VALUES
  ('google'),
  ('yelp'),
  ('angi'),
  ('facebook'),
  ('nextdoor'),
  ('manual')
ON CONFLICT (source) DO NOTHING;

-- ============================================================================
-- TABLE: team_members
-- Purpose: Staff directory for About page
-- ============================================================================

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  photo_url text,
  credentials text[] DEFAULT '{}',
  display_order integer NOT NULL,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create index for ordered display
CREATE INDEX IF NOT EXISTS idx_team_members_display_order ON team_members(display_order);
CREATE INDEX IF NOT EXISTS idx_team_members_is_visible ON team_members(is_visible);

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- TABLE: faqs
-- Purpose: Frequently asked questions
-- ============================================================================

CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text DEFAULT 'general', -- general, pricing, emergency, services, etc.
  display_order integer NOT NULL,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_display_order ON faqs(display_order);
CREATE INDEX IF NOT EXISTS idx_faqs_is_published ON faqs(is_published);

-- Enable RLS
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Pre-populate with common FAQs
INSERT INTO faqs (question, answer, category, display_order) VALUES
  ('Do you offer 24/7 emergency services?', 'Yes! We offer round-the-clock emergency plumbing services. Call our emergency line anytime and a licensed plumber will be dispatched to your location promptly.', 'emergency', 1),
  ('Are you licensed and insured?', 'Absolutely. Christensen Plumbing Co. is fully licensed, bonded, and insured. Our license number is displayed on all our vehicles and documentation.', 'general', 2),
  ('How quickly can you arrive for a service call?', 'For standard service calls, we typically arrive within 2-4 hours. For emergencies, we prioritize rapid response and aim to be there within 1 hour.', 'general', 3),
  ('Do you provide free estimates?', 'Yes, we provide free estimates for most plumbing projects. Contact us to schedule an assessment.', 'pricing', 4),
  ('What payment methods do you accept?', 'We accept all major credit cards, checks, and cash. We also offer financing options for larger projects.', 'pricing', 5),
  ('Do you work on both residential and commercial properties?', 'Yes, we serve both residential homeowners and commercial businesses throughout San Diego County.', 'services', 6)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- TABLE: services
-- Purpose: Service offerings with details
-- ============================================================================

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  icon text, -- Lucide icon name (e.g., 'wrench', 'droplet', 'flame')
  features text[] DEFAULT '{}',
  display_order integer NOT NULL,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON services(display_order);
CREATE INDEX IF NOT EXISTS idx_services_is_visible ON services(is_visible);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Pre-populate with core services
INSERT INTO services (title, slug, description, icon, features, display_order) VALUES
  ('Emergency Plumbing', 'emergency-plumbing', 'Round-the-clock emergency plumbing services for urgent situations. We respond quickly to burst pipes, severe leaks, and other plumbing emergencies.', 'alert-circle', ARRAY['24/7 availability', 'Rapid response time', 'Burst pipe repair', 'Emergency shutoff', 'Flood mitigation'], 1),
  ('Drain Cleaning', 'drain-cleaning', 'Professional drain cleaning services to clear clogs and restore proper flow. We use advanced techniques for tough blockages.', 'droplet', ARRAY['Hydro jetting', 'Snake/auger service', 'Video inspection', 'Root removal', 'Preventive maintenance'], 2),
  ('Water Heater Services', 'water-heater', 'Installation, repair, and maintenance for all types of water heaters including tankless, traditional, and hybrid systems.', 'flame', ARRAY['Installation', 'Repair', 'Tankless systems', 'Energy-efficient upgrades', 'Maintenance plans'], 3),
  ('Pipe Repair & Replacement', 'pipe-repair', 'Expert pipe repair and replacement services. We handle everything from minor leaks to complete repiping projects.', 'wrench', ARRAY['Leak detection', 'Pipe patching', 'Full repiping', 'Copper to PEX conversion', 'Trenchless repair'], 4),
  ('Bathroom Plumbing', 'bathroom-plumbing', 'Complete bathroom plumbing services from fixture installation to full remodels. Quality work for lasting results.', 'bath', ARRAY['Fixture installation', 'Toilet repair/replacement', 'Shower/tub plumbing', 'Vanity installation', 'Accessibility upgrades'], 5),
  ('Kitchen Plumbing', 'kitchen-plumbing', 'Kitchen plumbing services including sink installation, garbage disposal, and dishwasher connections.', 'utensils', ARRAY['Sink installation', 'Garbage disposal', 'Dishwasher hookup', 'Faucet installation', 'Under-sink repairs'], 6),
  ('Sewer Line Services', 'sewer-line', 'Comprehensive sewer line inspection, repair, and replacement services using modern technology.', 'construction', ARRAY['Video inspection', 'Line cleaning', 'Trenchless repair', 'Line replacement', 'Root intrusion treatment'], 7),
  ('Commercial Plumbing', 'commercial-plumbing', 'Professional plumbing services for businesses, restaurants, and commercial properties of all sizes.', 'building', ARRAY['New construction', 'Tenant improvements', 'Maintenance contracts', 'Code compliance', 'Backflow testing'], 8)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- TABLE: service_areas
-- Purpose: Geographic service coverage
-- ============================================================================

CREATE TABLE IF NOT EXISTS service_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  zip_codes text[] DEFAULT '{}',
  polygon_coords jsonb, -- GeoJSON format for map display
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create index for primary area lookup
CREATE INDEX IF NOT EXISTS idx_service_areas_is_primary ON service_areas(is_primary);
CREATE INDEX IF NOT EXISTS idx_service_areas_name ON service_areas(name);

-- Enable RLS
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;

-- Pre-populate with San Diego County areas
INSERT INTO service_areas (name, zip_codes, is_primary) VALUES
  ('San Diego', ARRAY['92101', '92102', '92103', '92104', '92105', '92106', '92107', '92108', '92109', '92110', '92111', '92113', '92114', '92115', '92116', '92117', '92119', '92120', '92121', '92122', '92123', '92124', '92126', '92127', '92128', '92129', '92130', '92131', '92132', '92134', '92135', '92136', '92137', '92138', '92139', '92140', '92145', '92147', '92150', '92152', '92153', '92154', '92155', '92158', '92159', '92160', '92161', '92162', '92163', '92164', '92165', '92166', '92167', '92168', '92169', '92170', '92171', '92172', '92174', '92175', '92176', '92177', '92179', '92182', '92186', '92187', '92190', '92191', '92192', '92193', '92194', '92195', '92196', '92197', '92198', '92199'], true),
  ('La Jolla', ARRAY['92037', '92038', '92039', '92092', '92093'], true),
  ('Carlsbad', ARRAY['92008', '92009', '92010', '92011', '92013'], true),
  ('Chula Vista', ARRAY['91909', '91910', '91911', '91912', '91913', '91914', '91915', '91921'], true),
  ('Oceanside', ARRAY['92049', '92051', '92052', '92054', '92056', '92057', '92058'], true),
  ('Escondido', ARRAY['92025', '92026', '92027', '92029', '92030', '92033', '92046'], true),
  ('El Cajon', ARRAY['92019', '92020', '92021', '92022'], true),
  ('Encinitas', ARRAY['92023', '92024'], true),
  ('National City', ARRAY['91950', '91951'], false),
  ('Vista', ARRAY['92081', '92083', '92084', '92085'], false),
  ('San Marcos', ARRAY['92069', '92078', '92079', '92096'], false),
  ('Poway', ARRAY['92064', '92074'], false)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- TABLE: leads
-- Purpose: Contact form submissions and lead tracking
-- ============================================================================

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text NOT NULL,
  service_type text,
  message text,
  source_page text, -- which page the form was submitted from
  is_emergency boolean DEFAULT false,
  status text DEFAULT 'new', -- new, contacted, scheduled, completed, archived
  notes text, -- internal notes from staff
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  -- Validate status values
  CONSTRAINT valid_lead_status CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'archived'))
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_is_emergency ON leads(is_emergency);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_service_type ON leads(service_type);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create trigger for updated_at
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: audit_log
-- Purpose: Track all admin actions for accountability
-- ============================================================================

CREATE TABLE IF NOT EXISTS audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  user_email text,
  action text NOT NULL, -- create, update, delete
  table_name text NOT NULL,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address text,
  created_at timestamptz DEFAULT now(),

  -- Validate action values
  CONSTRAINT valid_audit_action CHECK (action IN ('create', 'update', 'delete'))
);

-- Create indexes for audit queries
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_table_name ON audit_log(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_record_id ON audit_log(record_id);

-- Enable RLS
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- FUNCTION: log_audit_event
-- Purpose: Helper function to create audit log entries
-- ============================================================================

CREATE OR REPLACE FUNCTION log_audit_event(
  p_action text,
  p_table_name text,
  p_record_id uuid,
  p_old_values jsonb DEFAULT NULL,
  p_new_values jsonb DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  v_user_id uuid;
  v_user_email text;
  v_audit_id uuid;
BEGIN
  -- Try to get user info from JWT claims
  BEGIN
    v_user_id := (current_setting('request.jwt.claims', true)::jsonb->>'sub')::uuid;
    v_user_email := current_setting('request.jwt.claims', true)::jsonb->>'email';
  EXCEPTION
    WHEN OTHERS THEN
      v_user_id := NULL;
      v_user_email := NULL;
  END;

  INSERT INTO audit_log (user_id, user_email, action, table_name, record_id, old_values, new_values, ip_address)
  VALUES (
    v_user_id,
    v_user_email,
    p_action,
    p_table_name,
    p_record_id,
    p_old_values,
    p_new_values,
    current_setting('request.headers', true)::jsonb->>'x-forwarded-for'
  )
  RETURNING id INTO v_audit_id;

  RETURN v_audit_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- FUNCTION: refresh_review_aggregates
-- Purpose: Recalculate review statistics for a given source
-- ============================================================================

CREATE OR REPLACE FUNCTION refresh_review_aggregates(p_source text DEFAULT NULL)
RETURNS void AS $$
BEGIN
  IF p_source IS NULL THEN
    -- Refresh all sources
    UPDATE review_aggregates ra
    SET
      total_count = COALESCE(stats.total_count, 0),
      average_rating = COALESCE(stats.average_rating, 0),
      rating_5_count = COALESCE(stats.rating_5_count, 0),
      rating_4_count = COALESCE(stats.rating_4_count, 0),
      rating_3_count = COALESCE(stats.rating_3_count, 0),
      rating_2_count = COALESCE(stats.rating_2_count, 0),
      rating_1_count = COALESCE(stats.rating_1_count, 0),
      last_synced_at = now()
    FROM (
      SELECT
        source,
        COUNT(*) as total_count,
        ROUND(AVG(rating)::numeric, 1) as average_rating,
        COUNT(*) FILTER (WHERE rating = 5) as rating_5_count,
        COUNT(*) FILTER (WHERE rating = 4) as rating_4_count,
        COUNT(*) FILTER (WHERE rating = 3) as rating_3_count,
        COUNT(*) FILTER (WHERE rating = 2) as rating_2_count,
        COUNT(*) FILTER (WHERE rating = 1) as rating_1_count
      FROM reviews
      WHERE is_published = true
      GROUP BY source
    ) stats
    WHERE ra.source = stats.source;
  ELSE
    -- Refresh specific source
    UPDATE review_aggregates
    SET
      total_count = COALESCE(stats.total_count, 0),
      average_rating = COALESCE(stats.average_rating, 0),
      rating_5_count = COALESCE(stats.rating_5_count, 0),
      rating_4_count = COALESCE(stats.rating_4_count, 0),
      rating_3_count = COALESCE(stats.rating_3_count, 0),
      rating_2_count = COALESCE(stats.rating_2_count, 0),
      rating_1_count = COALESCE(stats.rating_1_count, 0),
      last_synced_at = now()
    FROM (
      SELECT
        COUNT(*) as total_count,
        ROUND(AVG(rating)::numeric, 1) as average_rating,
        COUNT(*) FILTER (WHERE rating = 5) as rating_5_count,
        COUNT(*) FILTER (WHERE rating = 4) as rating_4_count,
        COUNT(*) FILTER (WHERE rating = 3) as rating_3_count,
        COUNT(*) FILTER (WHERE rating = 2) as rating_2_count,
        COUNT(*) FILTER (WHERE rating = 1) as rating_1_count
      FROM reviews
      WHERE source = p_source AND is_published = true
    ) stats
    WHERE source = p_source;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on helper functions
GRANT EXECUTE ON FUNCTION log_audit_event TO authenticated;
GRANT EXECUTE ON FUNCTION refresh_review_aggregates TO authenticated;

COMMENT ON TABLE site_settings IS 'Global configuration key-value store for business info, SEO defaults, and social links';
COMMENT ON TABLE pages IS 'CMS-managed pages with SEO metadata';
COMMENT ON TABLE page_sections IS 'Modular content blocks that compose each page';
COMMENT ON TABLE reviews IS 'Customer reviews from multiple sources (Google, Yelp, manual entry, etc.)';
COMMENT ON TABLE review_aggregates IS 'Cached review statistics per source for fast loading';
COMMENT ON TABLE team_members IS 'Staff directory for the About page';
COMMENT ON TABLE faqs IS 'Frequently asked questions organized by category';
COMMENT ON TABLE services IS 'Service offerings with icons, descriptions, and features';
COMMENT ON TABLE service_areas IS 'Geographic service coverage with zip codes and optional polygon coordinates';
COMMENT ON TABLE leads IS 'Contact form submissions and lead tracking';
COMMENT ON TABLE audit_log IS 'Immutable log of all admin actions for accountability';
