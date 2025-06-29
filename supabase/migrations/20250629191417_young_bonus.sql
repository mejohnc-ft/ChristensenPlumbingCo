/*
  # Portfolio Photos Storage Setup

  This migration handles the database table policies only.
  Storage bucket and policies must be configured through the Supabase Dashboard.

  ## Manual Storage Setup Required:

  1. Go to Supabase Dashboard > Storage
  2. Create bucket named "photos" with:
     - Public bucket: enabled
     - File size limit: 50MB
     - Allowed MIME types: image/jpeg, image/png, image/webp, image/gif

  3. Go to Storage > Policies and create these policies:

     Policy: "Allow anonymous upload to portfolio folder"
     - Operation: INSERT
     - Target roles: anon
     - Policy: bucket_id = 'photos' AND (storage.foldername(name))[1] = 'portfolio'

     Policy: "Allow authenticated upload to portfolio folder"
     - Operation: INSERT
     - Target roles: authenticated
     - Policy: bucket_id = 'photos' AND (storage.foldername(name))[1] = 'portfolio'

     Policy: "Allow public read access to photos"
     - Operation: SELECT
     - Target roles: public
     - Policy: bucket_id = 'photos'

     Policy: "Allow authenticated delete from portfolio folder"
     - Operation: DELETE
     - Target roles: authenticated
     - Policy: bucket_id = 'photos' AND (storage.foldername(name))[1] = 'portfolio'

     Policy: "Allow authenticated update in portfolio folder"
     - Operation: UPDATE
     - Target roles: authenticated
     - Policy: bucket_id = 'photos' AND (storage.foldername(name))[1] = 'portfolio'
*/

-- This migration only contains database operations we have permissions for
-- Storage bucket and policies must be created manually through Supabase Dashboard

-- Ensure our portfolio_photos table has the correct policies
-- (These should already exist from previous migrations, but we'll ensure they're correct)

-- Drop existing policies if they exist to recreate them
DROP POLICY IF EXISTS "Allow public read access to portfolio photos" ON portfolio_photos;
DROP POLICY IF EXISTS "Allow anonymous users to insert portfolio photos" ON portfolio_photos;
DROP POLICY IF EXISTS "Allow authenticated users to insert portfolio photos" ON portfolio_photos;
DROP POLICY IF EXISTS "Allow authenticated users to update portfolio photos" ON portfolio_photos;
DROP POLICY IF EXISTS "Allow authenticated users to delete portfolio photos" ON portfolio_photos;

-- Recreate policies with correct permissions
CREATE POLICY "Allow public read access to portfolio photos"
  ON portfolio_photos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow anonymous users to insert portfolio photos"
  ON portfolio_photos
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to insert portfolio photos"
  ON portfolio_photos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update portfolio photos"
  ON portfolio_photos
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete portfolio photos"
  ON portfolio_photos
  FOR DELETE
  TO authenticated
  USING (true);

-- Create a function to check storage setup status
CREATE OR REPLACE FUNCTION check_storage_setup()
RETURNS TABLE(
  bucket_exists boolean,
  setup_instructions text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    EXISTS(SELECT 1 FROM storage.buckets WHERE id = 'photos') as bucket_exists,
    CASE 
      WHEN EXISTS(SELECT 1 FROM storage.buckets WHERE id = 'photos') 
      THEN 'Storage bucket "photos" exists. Check that storage policies are configured in Supabase Dashboard.'
      ELSE 'Storage bucket "photos" does not exist. Please create it manually in Supabase Dashboard with public access enabled.'
    END as setup_instructions;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION check_storage_setup() TO anon, authenticated;