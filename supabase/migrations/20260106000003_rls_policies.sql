/*
  # Row Level Security (RLS) Policies

  This migration configures RLS policies for all tables to prepare for Clerk integration.

  Policy Strategy:
  1. PUBLIC READ: Published content is readable by everyone (anon + authenticated)
  2. ADMIN WRITE: Only users with admin role can create/update/delete
  3. LEADS: Public can insert (contact forms), only admin can read/update
  4. AUDIT LOG: Admin read-only, no public access

  The is_admin() function is a placeholder that will be updated when Clerk is integrated.
  It checks for 'role' = 'admin' in the JWT claims.

  Created: 2026-01-06
*/

-- ============================================================================
-- ENSURE is_admin() FUNCTION EXISTS
-- ============================================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  -- Check for admin role in JWT claims
  -- This will be populated by Clerk's JWT template
  RETURN (current_setting('request.jwt.claims', true)::jsonb->>'role') = 'admin';
EXCEPTION
  WHEN OTHERS THEN RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- SITE_SETTINGS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "site_settings_public_read" ON site_settings;
DROP POLICY IF EXISTS "site_settings_admin_insert" ON site_settings;
DROP POLICY IF EXISTS "site_settings_admin_update" ON site_settings;
DROP POLICY IF EXISTS "site_settings_admin_delete" ON site_settings;

-- Public can read all settings
CREATE POLICY "site_settings_public_read"
  ON site_settings
  FOR SELECT
  TO public
  USING (true);

-- Only admin can insert
CREATE POLICY "site_settings_admin_insert"
  ON site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Only admin can update
CREATE POLICY "site_settings_admin_update"
  ON site_settings
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Only admin can delete
CREATE POLICY "site_settings_admin_delete"
  ON site_settings
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- PAGES POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "pages_public_read" ON pages;
DROP POLICY IF EXISTS "pages_admin_read_all" ON pages;
DROP POLICY IF EXISTS "pages_admin_insert" ON pages;
DROP POLICY IF EXISTS "pages_admin_update" ON pages;
DROP POLICY IF EXISTS "pages_admin_delete" ON pages;

-- Public can read published pages only
CREATE POLICY "pages_public_read"
  ON pages
  FOR SELECT
  TO anon
  USING (is_published = true);

-- Admin can read all pages (including unpublished)
CREATE POLICY "pages_admin_read_all"
  ON pages
  FOR SELECT
  TO authenticated
  USING (is_admin() OR is_published = true);

-- Only admin can insert
CREATE POLICY "pages_admin_insert"
  ON pages
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Only admin can update
CREATE POLICY "pages_admin_update"
  ON pages
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Only admin can delete
CREATE POLICY "pages_admin_delete"
  ON pages
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- PAGE_SECTIONS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "page_sections_public_read" ON page_sections;
DROP POLICY IF EXISTS "page_sections_admin_read_all" ON page_sections;
DROP POLICY IF EXISTS "page_sections_admin_insert" ON page_sections;
DROP POLICY IF EXISTS "page_sections_admin_update" ON page_sections;
DROP POLICY IF EXISTS "page_sections_admin_delete" ON page_sections;

-- Public can read visible sections of published pages
CREATE POLICY "page_sections_public_read"
  ON page_sections
  FOR SELECT
  TO anon
  USING (
    is_visible = true AND
    EXISTS (
      SELECT 1 FROM pages
      WHERE pages.id = page_sections.page_id
      AND pages.is_published = true
    )
  );

-- Admin can read all sections
CREATE POLICY "page_sections_admin_read_all"
  ON page_sections
  FOR SELECT
  TO authenticated
  USING (
    is_admin() OR (
      is_visible = true AND
      EXISTS (
        SELECT 1 FROM pages
        WHERE pages.id = page_sections.page_id
        AND pages.is_published = true
      )
    )
  );

-- Only admin can insert
CREATE POLICY "page_sections_admin_insert"
  ON page_sections
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Only admin can update
CREATE POLICY "page_sections_admin_update"
  ON page_sections
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Only admin can delete
CREATE POLICY "page_sections_admin_delete"
  ON page_sections
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- PROJECTS POLICIES (Update existing policies)
-- ============================================================================

DROP POLICY IF EXISTS "Allow public read access to projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated users to insert projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated users to update projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated users to delete projects" ON projects;
DROP POLICY IF EXISTS "projects_public_read" ON projects;
DROP POLICY IF EXISTS "projects_admin_read_all" ON projects;
DROP POLICY IF EXISTS "projects_admin_insert" ON projects;
DROP POLICY IF EXISTS "projects_admin_update" ON projects;
DROP POLICY IF EXISTS "projects_admin_delete" ON projects;

-- Public can read published projects only
CREATE POLICY "projects_public_read"
  ON projects
  FOR SELECT
  TO anon
  USING (is_published = true);

-- Admin can read all projects (including unpublished)
CREATE POLICY "projects_admin_read_all"
  ON projects
  FOR SELECT
  TO authenticated
  USING (is_admin() OR is_published = true);

-- Only admin can insert
CREATE POLICY "projects_admin_insert"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Only admin can update
CREATE POLICY "projects_admin_update"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Only admin can delete
CREATE POLICY "projects_admin_delete"
  ON projects
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- PORTFOLIO_PHOTOS POLICIES (Update existing policies)
-- ============================================================================

DROP POLICY IF EXISTS "Allow public read access to portfolio photos" ON portfolio_photos;
DROP POLICY IF EXISTS "Allow anonymous users to insert portfolio photos" ON portfolio_photos;
DROP POLICY IF EXISTS "Allow authenticated users to insert portfolio photos" ON portfolio_photos;
DROP POLICY IF EXISTS "Allow authenticated users to update portfolio photos" ON portfolio_photos;
DROP POLICY IF EXISTS "Allow authenticated users to delete portfolio photos" ON portfolio_photos;
DROP POLICY IF EXISTS "portfolio_photos_public_read" ON portfolio_photos;
DROP POLICY IF EXISTS "portfolio_photos_admin_insert" ON portfolio_photos;
DROP POLICY IF EXISTS "portfolio_photos_admin_update" ON portfolio_photos;
DROP POLICY IF EXISTS "portfolio_photos_admin_delete" ON portfolio_photos;

-- Public can read photos for published projects (or photos without a project)
CREATE POLICY "portfolio_photos_public_read"
  ON portfolio_photos
  FOR SELECT
  TO public
  USING (
    project_id IS NULL OR
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = portfolio_photos.project_id
      AND projects.is_published = true
    )
  );

-- Only admin can insert
CREATE POLICY "portfolio_photos_admin_insert"
  ON portfolio_photos
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Only admin can update
CREATE POLICY "portfolio_photos_admin_update"
  ON portfolio_photos
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Only admin can delete
CREATE POLICY "portfolio_photos_admin_delete"
  ON portfolio_photos
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- REVIEWS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "reviews_public_read" ON reviews;
DROP POLICY IF EXISTS "reviews_admin_read_all" ON reviews;
DROP POLICY IF EXISTS "reviews_admin_insert" ON reviews;
DROP POLICY IF EXISTS "reviews_admin_update" ON reviews;
DROP POLICY IF EXISTS "reviews_admin_delete" ON reviews;

-- Public can read published reviews only
CREATE POLICY "reviews_public_read"
  ON reviews
  FOR SELECT
  TO anon
  USING (is_published = true);

-- Admin can read all reviews (including unpublished)
CREATE POLICY "reviews_admin_read_all"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (is_admin() OR is_published = true);

-- Only admin can insert
CREATE POLICY "reviews_admin_insert"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Only admin can update
CREATE POLICY "reviews_admin_update"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Only admin can delete
CREATE POLICY "reviews_admin_delete"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- REVIEW_AGGREGATES POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "review_aggregates_public_read" ON review_aggregates;
DROP POLICY IF EXISTS "review_aggregates_admin_update" ON review_aggregates;

-- Public can read aggregates (for displaying ratings)
CREATE POLICY "review_aggregates_public_read"
  ON review_aggregates
  FOR SELECT
  TO public
  USING (true);

-- Only admin can update (triggered by refresh function)
CREATE POLICY "review_aggregates_admin_update"
  ON review_aggregates
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================================
-- TEAM_MEMBERS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "team_members_public_read" ON team_members;
DROP POLICY IF EXISTS "team_members_admin_read_all" ON team_members;
DROP POLICY IF EXISTS "team_members_admin_insert" ON team_members;
DROP POLICY IF EXISTS "team_members_admin_update" ON team_members;
DROP POLICY IF EXISTS "team_members_admin_delete" ON team_members;

-- Public can read visible team members only
CREATE POLICY "team_members_public_read"
  ON team_members
  FOR SELECT
  TO anon
  USING (is_visible = true);

-- Admin can read all team members
CREATE POLICY "team_members_admin_read_all"
  ON team_members
  FOR SELECT
  TO authenticated
  USING (is_admin() OR is_visible = true);

-- Only admin can insert
CREATE POLICY "team_members_admin_insert"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Only admin can update
CREATE POLICY "team_members_admin_update"
  ON team_members
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Only admin can delete
CREATE POLICY "team_members_admin_delete"
  ON team_members
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- FAQS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "faqs_public_read" ON faqs;
DROP POLICY IF EXISTS "faqs_admin_read_all" ON faqs;
DROP POLICY IF EXISTS "faqs_admin_insert" ON faqs;
DROP POLICY IF EXISTS "faqs_admin_update" ON faqs;
DROP POLICY IF EXISTS "faqs_admin_delete" ON faqs;

-- Public can read published FAQs only
CREATE POLICY "faqs_public_read"
  ON faqs
  FOR SELECT
  TO anon
  USING (is_published = true);

-- Admin can read all FAQs
CREATE POLICY "faqs_admin_read_all"
  ON faqs
  FOR SELECT
  TO authenticated
  USING (is_admin() OR is_published = true);

-- Only admin can insert
CREATE POLICY "faqs_admin_insert"
  ON faqs
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Only admin can update
CREATE POLICY "faqs_admin_update"
  ON faqs
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Only admin can delete
CREATE POLICY "faqs_admin_delete"
  ON faqs
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- SERVICES POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "services_public_read" ON services;
DROP POLICY IF EXISTS "services_admin_read_all" ON services;
DROP POLICY IF EXISTS "services_admin_insert" ON services;
DROP POLICY IF EXISTS "services_admin_update" ON services;
DROP POLICY IF EXISTS "services_admin_delete" ON services;

-- Public can read visible services only
CREATE POLICY "services_public_read"
  ON services
  FOR SELECT
  TO anon
  USING (is_visible = true);

-- Admin can read all services
CREATE POLICY "services_admin_read_all"
  ON services
  FOR SELECT
  TO authenticated
  USING (is_admin() OR is_visible = true);

-- Only admin can insert
CREATE POLICY "services_admin_insert"
  ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Only admin can update
CREATE POLICY "services_admin_update"
  ON services
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Only admin can delete
CREATE POLICY "services_admin_delete"
  ON services
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- SERVICE_AREAS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "service_areas_public_read" ON service_areas;
DROP POLICY IF EXISTS "service_areas_admin_insert" ON service_areas;
DROP POLICY IF EXISTS "service_areas_admin_update" ON service_areas;
DROP POLICY IF EXISTS "service_areas_admin_delete" ON service_areas;

-- Public can read all service areas (no visibility flag)
CREATE POLICY "service_areas_public_read"
  ON service_areas
  FOR SELECT
  TO public
  USING (true);

-- Only admin can insert
CREATE POLICY "service_areas_admin_insert"
  ON service_areas
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Only admin can update
CREATE POLICY "service_areas_admin_update"
  ON service_areas
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Only admin can delete
CREATE POLICY "service_areas_admin_delete"
  ON service_areas
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- LEADS POLICIES (Special: Public can INSERT, Admin can READ/UPDATE)
-- ============================================================================

DROP POLICY IF EXISTS "leads_public_insert" ON leads;
DROP POLICY IF EXISTS "leads_admin_read" ON leads;
DROP POLICY IF EXISTS "leads_admin_update" ON leads;
DROP POLICY IF EXISTS "leads_admin_delete" ON leads;

-- Public can submit contact forms (INSERT only)
-- Note: Rate limiting should be implemented at the application level or via Supabase Edge Functions
CREATE POLICY "leads_public_insert"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only admin can read leads
CREATE POLICY "leads_admin_read"
  ON leads
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Only admin can update leads (change status, add notes)
CREATE POLICY "leads_admin_update"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Only admin can delete leads
CREATE POLICY "leads_admin_delete"
  ON leads
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- AUDIT_LOG POLICIES (Admin read-only, no inserts via RLS)
-- ============================================================================

DROP POLICY IF EXISTS "audit_log_admin_read" ON audit_log;

-- Only admin can read audit logs
CREATE POLICY "audit_log_admin_read"
  ON audit_log
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Note: Inserts to audit_log are done via the log_audit_event() function
-- which runs with SECURITY DEFINER, bypassing RLS

-- ============================================================================
-- HELPER: Function to check if current user can manage content
-- ============================================================================

CREATE OR REPLACE FUNCTION can_manage_content()
RETURNS boolean AS $$
BEGIN
  -- Currently just checks admin, but could be extended for editor roles
  RETURN is_admin();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Ensure anon role has SELECT on public-facing tables
GRANT SELECT ON site_settings TO anon;
GRANT SELECT ON pages TO anon;
GRANT SELECT ON page_sections TO anon;
GRANT SELECT ON projects TO anon;
GRANT SELECT ON portfolio_photos TO anon;
GRANT SELECT ON reviews TO anon;
GRANT SELECT ON review_aggregates TO anon;
GRANT SELECT ON team_members TO anon;
GRANT SELECT ON faqs TO anon;
GRANT SELECT ON services TO anon;
GRANT SELECT ON service_areas TO anon;

-- Anon can insert leads (contact forms)
GRANT INSERT ON leads TO anon;

-- Authenticated users get broader permissions (RLS will restrict)
GRANT ALL ON site_settings TO authenticated;
GRANT ALL ON pages TO authenticated;
GRANT ALL ON page_sections TO authenticated;
GRANT ALL ON projects TO authenticated;
GRANT ALL ON portfolio_photos TO authenticated;
GRANT ALL ON reviews TO authenticated;
GRANT ALL ON review_aggregates TO authenticated;
GRANT ALL ON team_members TO authenticated;
GRANT ALL ON faqs TO authenticated;
GRANT ALL ON services TO authenticated;
GRANT ALL ON service_areas TO authenticated;
GRANT ALL ON leads TO authenticated;
GRANT SELECT ON audit_log TO authenticated;

-- Grant function permissions
GRANT EXECUTE ON FUNCTION is_admin TO anon;
GRANT EXECUTE ON FUNCTION is_admin TO authenticated;
GRANT EXECUTE ON FUNCTION can_manage_content TO authenticated;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON FUNCTION is_admin() IS 'Checks if the current user has admin role via JWT claims. Placeholder for Clerk integration.';
COMMENT ON FUNCTION can_manage_content() IS 'Checks if current user can manage CMS content. Currently requires admin role.';
COMMENT ON POLICY "leads_public_insert" ON leads IS 'Allows public contact form submissions. Rate limiting should be implemented at application level.';
COMMENT ON POLICY "audit_log_admin_read" ON audit_log IS 'Audit logs are read-only for admin users. Inserts happen via SECURITY DEFINER function.';
