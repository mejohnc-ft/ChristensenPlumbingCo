/*
  # Create Projects System for Portfolio

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text, project name)
      - `description` (text, project description)
      - `category` (text, project category)
      - `location` (text, project location)
      - `completion_date` (date, when project was completed)
      - `featured` (boolean, whether to feature prominently)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Modified Tables
    - `portfolio_photos` - Add `project_id` foreign key

  3. Security
    - Enable RLS on `projects` table
    - Add policies for public read access
    - Add policies for authenticated users to manage projects
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  category text DEFAULT 'general',
  location text DEFAULT '',
  completion_date date,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add project_id to portfolio_photos table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'portfolio_photos' AND column_name = 'project_id'
  ) THEN
    ALTER TABLE portfolio_photos ADD COLUMN project_id uuid REFERENCES projects(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Enable RLS on projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for projects table
CREATE POLICY "Allow public read access to projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Create trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample projects
INSERT INTO projects (title, description, category, location, completion_date, featured) VALUES
('Modern Kitchen Renovation', 'Complete kitchen plumbing overhaul with new fixtures and appliances', 'kitchen', 'La Jolla', '2024-01-15', true),
('Emergency Pipe Burst Repair', 'Emergency response to major pipe burst in residential home', 'emergency', 'Mission Valley', '2024-02-20', false),
('Luxury Bathroom Remodel', 'High-end bathroom renovation with custom fixtures and heated floors', 'bathroom', 'Carlsbad', '2024-03-10', true),
('Commercial Water Heater Installation', 'Industrial water heater system for office building', 'water-heater', 'Downtown San Diego', '2024-04-05', false),
('Whole House Repiping', 'Complete copper to PEX repiping for 3-bedroom home', 'pipes', 'Chula Vista', '2024-05-12', true);