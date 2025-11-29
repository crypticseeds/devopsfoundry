-- Supabase Table Schema for Contact Form Leads
-- Run this SQL in your Supabase SQL Editor to create the leads table

CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Create an index on created_at for sorting/filtering by date
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Optional: Add a unique constraint on email if you want to prevent duplicates
-- Uncomment the line below if you want to ensure each email only appears once
-- ALTER TABLE leads ADD CONSTRAINT unique_email UNIQUE (email);

-- Optional: Enable Row Level Security (RLS) for better security
-- This ensures only authenticated users can read the data
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows service role to insert (for your API)
-- Note: This uses the service_role key, not the anon key
-- You may need to adjust this based on your security requirements
CREATE POLICY "Allow service role to insert leads"
  ON leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create a policy that allows service role to read leads
CREATE POLICY "Allow service role to read leads"
  ON leads
  FOR SELECT
  TO service_role
  USING (true);

-- If you want to allow reading via anon key (for admin dashboard), uncomment:
-- CREATE POLICY "Allow authenticated users to read leads"
--   ON leads
--   FOR SELECT
--   TO authenticated
--   USING (true);

