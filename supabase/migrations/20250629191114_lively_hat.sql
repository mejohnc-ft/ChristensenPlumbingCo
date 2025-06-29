/*
  # Configure Storage Policies for Portfolio Photos

  1. Storage Bucket Setup
    - Ensure the 'photos' bucket exists and is configured properly
    - Enable RLS on the storage.objects table for the photos bucket
    
  2. Storage Policies
    - Allow anonymous users to upload photos to the portfolio folder
    - Allow public read access to photos
    - Allow authenticated users to delete photos
*/

-- Create the photos bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy to allow anonymous users to upload photos to the portfolio folder
CREATE POLICY "Allow anonymous upload to portfolio folder"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (
  bucket_id = 'photos' AND 
  (storage.foldername(name))[1] = 'portfolio'
);

-- Policy to allow authenticated users to upload photos to the portfolio folder
CREATE POLICY "Allow authenticated upload to portfolio folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'photos' AND 
  (storage.foldername(name))[1] = 'portfolio'
);

-- Policy to allow public read access to photos
CREATE POLICY "Allow public read access to photos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'photos');

-- Policy to allow authenticated users to delete photos
CREATE POLICY "Allow authenticated delete from portfolio folder"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'photos' AND 
  (storage.foldername(name))[1] = 'portfolio'
);

-- Policy to allow authenticated users to update photos
CREATE POLICY "Allow authenticated update in portfolio folder"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'photos' AND 
  (storage.foldername(name))[1] = 'portfolio'
);