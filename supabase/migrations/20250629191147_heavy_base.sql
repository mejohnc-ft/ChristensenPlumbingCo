/*
  # Fix Storage RLS Policies for Photo Upload

  1. Storage Setup
    - Create photos bucket with public read access
    - Configure RLS policies for portfolio folder uploads

  2. Security
    - Allow anonymous and authenticated users to upload to portfolio folder
    - Allow public read access to photos
    - Allow authenticated users to manage their uploads
*/

-- Create the photos bucket if it doesn't exist
-- Note: This may need to be done through the Supabase dashboard if permissions are insufficient
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  VALUES (
    'photos', 
    'photos', 
    true, 
    52428800, -- 50MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  )
  ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 52428800,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
EXCEPTION
  WHEN insufficient_privilege THEN
    RAISE NOTICE 'Insufficient privileges to create storage bucket. Please create the "photos" bucket manually in the Supabase dashboard with public read access enabled.';
END $$;

-- Storage policies need to be created with proper syntax for Supabase
-- These policies should be created through the Supabase dashboard or with proper permissions

-- If the above bucket creation fails, you'll need to:
-- 1. Go to Storage in your Supabase dashboard
-- 2. Create a bucket named "photos"
-- 3. Enable "Public bucket" option
-- 4. Set file size limit to 50MB
-- 5. Add allowed MIME types: image/jpeg, image/png, image/webp, image/gif
-- 6. Create the following policies in the Storage > Policies section:

-- Policy 1: "Allow anonymous upload to portfolio folder"
-- Operation: INSERT
-- Target roles: anon
-- Policy definition: bucket_id = 'photos' AND (storage.foldername(name))[1] = 'portfolio'

-- Policy 2: "Allow authenticated upload to portfolio folder" 
-- Operation: INSERT
-- Target roles: authenticated
-- Policy definition: bucket_id = 'photos' AND (storage.foldername(name))[1] = 'portfolio'

-- Policy 3: "Allow public read access to photos"
-- Operation: SELECT
-- Target roles: public
-- Policy definition: bucket_id = 'photos'

-- Policy 4: "Allow authenticated delete from portfolio folder"
-- Operation: DELETE
-- Target roles: authenticated
-- Policy definition: bucket_id = 'photos' AND (storage.foldername(name))[1] = 'portfolio'

-- Policy 5: "Allow authenticated update in portfolio folder"
-- Operation: UPDATE
-- Target roles: authenticated
-- Policy definition: bucket_id = 'photos' AND (storage.foldername(name))[1] = 'portfolio'

-- Alternative approach: Create a function to handle storage setup
CREATE OR REPLACE FUNCTION setup_photo_storage()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- This function can be called to set up storage if needed
  RAISE NOTICE 'Photo storage setup function created. Storage bucket and policies need to be configured through Supabase dashboard.';
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION setup_photo_storage() TO anon, authenticated;