-- Create junction table for member program registrations
CREATE TABLE IF NOT EXISTS member_programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'registered', -- 'registered', 'completed', 'cancelled'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure a member can only register once per program
  UNIQUE(member_id, program_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_member_programs_member_id ON member_programs(member_id);
CREATE INDEX IF NOT EXISTS idx_member_programs_program_id ON member_programs(program_id);
CREATE INDEX IF NOT EXISTS idx_member_programs_status ON member_programs(status);

-- Add RLS policies
ALTER TABLE member_programs ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own registrations
CREATE POLICY "Allow users to read own registrations" ON member_programs
  FOR SELECT USING (auth.uid()::text = member_id::text);

-- Allow authenticated users to insert registrations
CREATE POLICY "Allow authenticated users to insert registrations" ON member_programs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow users to update their own registrations
CREATE POLICY "Allow users to update own registrations" ON member_programs
  FOR UPDATE USING (auth.uid()::text = member_id::text);
