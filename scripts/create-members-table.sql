-- Create members table for storing registration details
CREATE TABLE IF NOT EXISTS members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  grade VARCHAR(50) NOT NULL,
  school_name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  payment_method VARCHAR(20),
  payment_status VARCHAR(20) DEFAULT 'pending',
  transaction_id VARCHAR(100),
  membership_status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);

-- Create index for payment status queries
CREATE INDEX IF NOT EXISTS idx_members_payment_status ON members(payment_status);

-- Add RLS (Row Level Security) policies
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Policy to allow reading own data (when we add authentication)
CREATE POLICY "Users can view own data" ON members
  FOR SELECT USING (auth.uid()::text = id::text);

-- Policy to allow inserting new members (public registration)
CREATE POLICY "Allow public registration" ON members
  FOR INSERT WITH CHECK (true);

-- Policy to allow updating own data
CREATE POLICY "Users can update own data" ON members
  FOR UPDATE USING (auth.uid()::text = id::text);
