/*
  # Allow anonymous photo uploads

  1. Security Changes
    - Update INSERT policy to allow anonymous users to upload photos
    - This enables the PhotoUpload component to work without authentication
    
  Note: In a production environment, you should implement authentication
  and restrict this to authenticated users only for better security.
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Allow authenticated users to insert portfolio photos" ON portfolio_photos;

-- Create new INSERT policy that allows anonymous users
CREATE POLICY "Allow anonymous users to insert portfolio photos"
  ON portfolio_photos
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also ensure authenticated users can still insert (if authentication is added later)
CREATE POLICY "Allow authenticated users to insert portfolio photos"
  ON portfolio_photos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);