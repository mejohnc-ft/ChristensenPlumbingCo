-- Blog Posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL DEFAULT '',
  featured_image_url text,
  author_name text NOT NULL DEFAULT 'Christensen Plumbing',
  category text,
  tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at timestamptz,
  reading_time_minutes integer DEFAULT 1,
  meta_title text,
  meta_description text,
  view_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX idx_blog_posts_status ON blog_posts (status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts (published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts (category);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING gin (tags);

-- Auto-generate slug from title (reuses generate_slug pattern from enhance_projects.sql)
CREATE OR REPLACE FUNCTION blog_posts_auto_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 0;
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    base_slug := lower(trim(NEW.title));
    base_slug := regexp_replace(base_slug, '[^a-z0-9\s-]', '', 'g');
    base_slug := regexp_replace(base_slug, '[\s]+', '-', 'g');
    base_slug := regexp_replace(base_slug, '-+', '-', 'g');
    base_slug := trim(both '-' from base_slug);

    final_slug := base_slug;
    WHILE EXISTS (SELECT 1 FROM blog_posts WHERE slug = final_slug AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)) LOOP
      counter := counter + 1;
      final_slug := base_slug || '-' || counter;
    END LOOP;

    NEW.slug := final_slug;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_auto_slug_trigger
  BEFORE INSERT ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION blog_posts_auto_slug();

-- Auto-compute reading time (~200 words per minute)
CREATE OR REPLACE FUNCTION blog_posts_compute_reading_time()
RETURNS TRIGGER AS $$
BEGIN
  NEW.reading_time_minutes := GREATEST(1, CEIL(array_length(string_to_array(NEW.content, ' '), 1)::numeric / 200));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_reading_time_trigger
  BEFORE INSERT OR UPDATE OF content ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION blog_posts_compute_reading_time();

-- Auto-update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Increment view count function
CREATE OR REPLACE FUNCTION increment_blog_post_view(post_slug text)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts SET view_count = view_count + 1 WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION increment_blog_post_view(text) TO anon, authenticated;

-- RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admin can read all blog posts"
  ON blog_posts FOR SELECT
  USING (is_admin());

CREATE POLICY "Admin can insert blog posts"
  ON blog_posts FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admin can update blog posts"
  ON blog_posts FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admin can delete blog posts"
  ON blog_posts FOR DELETE
  USING (is_admin());

-- Grants
GRANT SELECT ON blog_posts TO anon;
GRANT ALL ON blog_posts TO authenticated;
