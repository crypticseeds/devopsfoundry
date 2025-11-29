-- Neon DB Table Schema for Contact Form Leads
-- Run this SQL in your Neon DB SQL Editor to create the leads table
-- This schema works with Neon DB's branching feature for dev/staging/prod environments

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

-- Note: Neon DB uses connection string authentication, so RLS policies are not needed
-- Access control is managed through the database connection credentials

