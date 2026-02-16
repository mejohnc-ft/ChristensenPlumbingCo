/*
  # Enhance Projects Table for Portfolio CMS

  This migration adds new columns to the existing `projects` table to support:
  - SEO-friendly slugs
  - Case study content (problem, approach, result)
  - Project metrics (before/after stats, cost savings, etc.)
  - Publishing workflow
  - View tracking
  - Manual ordering

  Created: 2026-01-06
*/

-- ============================================================================
-- ADD NEW COLUMNS TO projects TABLE
-- ============================================================================

-- Add slug for SEO-friendly URLs
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'slug'
  ) THEN
    ALTER TABLE projects ADD COLUMN slug text;
  END IF;
END $$;

-- Add case study content columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'problem_text'
  ) THEN
    ALTER TABLE projects ADD COLUMN problem_text text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'approach_text'
  ) THEN
    ALTER TABLE projects ADD COLUMN approach_text text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'result_text'
  ) THEN
    ALTER TABLE projects ADD COLUMN result_text text;
  END IF;
END $$;

-- Add metrics as JSONB for flexible data storage
-- Example: {"cost_savings": "$2,500", "time_saved": "3 days", "water_saved": "1,000 gallons/month"}
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'metrics'
  ) THEN
    ALTER TABLE projects ADD COLUMN metrics jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- Add publishing workflow
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'is_published'
  ) THEN
    ALTER TABLE projects ADD COLUMN is_published boolean DEFAULT false;
  END IF;
END $$;

-- Add view count for analytics
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'view_count'
  ) THEN
    ALTER TABLE projects ADD COLUMN view_count integer DEFAULT 0;
  END IF;
END $$;

-- Add display order for manual sorting
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE projects ADD COLUMN display_order integer;
  END IF;
END $$;

-- ============================================================================
-- ADD CONSTRAINTS AND INDEXES
-- ============================================================================

-- Create unique constraint on slug (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'projects_slug_key'
  ) THEN
    ALTER TABLE projects ADD CONSTRAINT projects_slug_key UNIQUE (slug);
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_is_published ON projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_completion_date ON projects(completion_date DESC);
CREATE INDEX IF NOT EXISTS idx_projects_view_count ON projects(view_count DESC);

-- ============================================================================
-- GENERATE SLUGS FOR EXISTING PROJECTS
-- ============================================================================

-- Function to generate URL-friendly slugs
CREATE OR REPLACE FUNCTION generate_slug(title text)
RETURNS text AS $$
DECLARE
  slug text;
  base_slug text;
  counter integer := 1;
BEGIN
  -- Convert to lowercase, replace spaces with hyphens, remove non-alphanumeric
  base_slug := lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
  -- Remove leading/trailing hyphens and collapse multiple hyphens
  base_slug := regexp_replace(regexp_replace(base_slug, '^-+|-+$', '', 'g'), '-+', '-', 'g');

  slug := base_slug;

  -- Check for uniqueness and append counter if needed
  WHILE EXISTS (SELECT 1 FROM projects WHERE projects.slug = slug) LOOP
    counter := counter + 1;
    slug := base_slug || '-' || counter;
  END LOOP;

  RETURN slug;
END;
$$ LANGUAGE plpgsql;

-- Generate slugs for any projects that don't have one
UPDATE projects
SET slug = generate_slug(title)
WHERE slug IS NULL OR slug = '';

-- Set display_order based on creation date for existing projects
WITH ordered_projects AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as rn
  FROM projects
  WHERE display_order IS NULL
)
UPDATE projects
SET display_order = ordered_projects.rn
FROM ordered_projects
WHERE projects.id = ordered_projects.id;

-- Set existing projects as published (they were already visible)
UPDATE projects
SET is_published = true
WHERE is_published IS NULL OR is_published = false;

-- ============================================================================
-- TRIGGER: Auto-generate slug on insert if not provided
-- ============================================================================

CREATE OR REPLACE FUNCTION projects_auto_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.title);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS projects_auto_slug_trigger ON projects;
CREATE TRIGGER projects_auto_slug_trigger
  BEFORE INSERT ON projects
  FOR EACH ROW
  EXECUTE FUNCTION projects_auto_slug();

-- ============================================================================
-- FUNCTION: Increment project view count
-- ============================================================================

CREATE OR REPLACE FUNCTION increment_project_view(project_slug text)
RETURNS void AS $$
BEGIN
  UPDATE projects
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE slug = project_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to anonymous users (for tracking page views)
GRANT EXECUTE ON FUNCTION increment_project_view TO anon;
GRANT EXECUTE ON FUNCTION increment_project_view TO authenticated;

-- ============================================================================
-- ADD display_order TO portfolio_photos TABLE
-- ============================================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'portfolio_photos' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE portfolio_photos ADD COLUMN display_order integer DEFAULT 0;
  END IF;
END $$;

-- Create index for photo ordering
CREATE INDEX IF NOT EXISTS idx_portfolio_photos_display_order ON portfolio_photos(display_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_photos_project_id ON portfolio_photos(project_id);

-- Set display_order for existing photos based on creation date
WITH ordered_photos AS (
  SELECT id, project_id, ROW_NUMBER() OVER (PARTITION BY project_id ORDER BY created_at) as rn
  FROM portfolio_photos
  WHERE display_order = 0 OR display_order IS NULL
)
UPDATE portfolio_photos
SET display_order = ordered_photos.rn
FROM ordered_photos
WHERE portfolio_photos.id = ordered_photos.id;

-- ============================================================================
-- UPDATE COMMENTS
-- ============================================================================

COMMENT ON COLUMN projects.slug IS 'SEO-friendly URL slug, auto-generated from title if not provided';
COMMENT ON COLUMN projects.problem_text IS 'Case study: description of the problem/challenge';
COMMENT ON COLUMN projects.approach_text IS 'Case study: description of the solution approach';
COMMENT ON COLUMN projects.result_text IS 'Case study: description of the outcome/results';
COMMENT ON COLUMN projects.metrics IS 'JSON object with key metrics (cost_savings, time_saved, etc.)';
COMMENT ON COLUMN projects.is_published IS 'Whether the project is visible to public visitors';
COMMENT ON COLUMN projects.view_count IS 'Number of times the project detail page has been viewed';
COMMENT ON COLUMN projects.display_order IS 'Manual ordering for portfolio display';
COMMENT ON COLUMN portfolio_photos.display_order IS 'Order of photos within a project gallery';
