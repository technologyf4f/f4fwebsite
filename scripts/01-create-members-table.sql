-- Create members table for Framework 4 Future
CREATE TABLE IF NOT EXISTS members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(10),
  emergency_contact_name VARCHAR(200),
  emergency_contact_phone VARCHAR(20),
  programs_interested TEXT[], -- Array of program names
  leadership_experience TEXT,
  why_join TEXT,
  how_heard_about_us VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  member_since TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_active ON members(is_active);
CREATE INDEX IF NOT EXISTS idx_members_member_since ON members(member_since);

-- Add RLS (Row Level Security) policies
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to read all members
CREATE POLICY "Allow authenticated users to read members" ON members
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy to allow authenticated users to insert new members
CREATE POLICY "Allow authenticated users to insert members" ON members
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy to allow users to update their own member record
CREATE POLICY "Allow users to update own member record" ON members
  FOR UPDATE USING (auth.uid()::text = id::text);
