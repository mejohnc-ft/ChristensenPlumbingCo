/*
  # Create portfolio photos table and storage

  1. New Tables
    - `portfolio_photos`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `description` (text, optional)
      - `image_url` (text, not null)
      - `category` (text, not null)
      - `created_at` (timestamp with time zone, default now())
      - `updated_at` (timestamp with time zone, default now())

  2. Storage
    - Create `photos` bucket for storing portfolio images
    - Enable public read access for portfolio images
    - Enable authenticated upload access

  3. Security
    - Enable RLS on `portfolio_photos` table
    - Add policies for public read access
    - Add policies for authenticated write access
*/

-- Create the portfolio_photos table
CREATE TABLE IF NOT EXISTS portfolio_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE portfolio_photos ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (portfolio should be viewable by everyone)
CREATE POLICY "Allow public read access to portfolio photos"
  ON portfolio_photos
  FOR SELECT
  TO public
  USING (true);

-- Create policies for authenticated users to insert/update/delete
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

-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for the photos bucket
CREATE POLICY "Allow public read access to photos bucket"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'photos');

CREATE POLICY "Allow authenticated users to upload photos"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'photos');

CREATE POLICY "Allow authenticated users to update photos"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'photos')
  WITH CHECK (bucket_id = 'photos');

CREATE POLICY "Allow authenticated users to delete photos"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'photos');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_portfolio_photos_updated_at
  BEFORE UPDATE ON portfolio_photos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();