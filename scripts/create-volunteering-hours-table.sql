-- Create volunteering_hours table
CREATE TABLE IF NOT EXISTS volunteering_hours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  activity_name VARCHAR(255) NOT NULL,
  description TEXT,
  hours_completed DECIMAL(5,2) NOT NULL CHECK (hours_completed > 0),
  activity_date DATE NOT NULL,
  organization_name VARCHAR(255) NOT NULL,
  supervisor_name VARCHAR(255),
  supervisor_email VARCHAR(255),
  supervisor_phone VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  reviewed_by VARCHAR(255),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE volunteering_hours ENABLE ROW LEVEL SECURITY;

-- Members can view their own volunteering hours
CREATE POLICY "Members can view own volunteering hours" ON volunteering_hours
  FOR SELECT USING (auth.uid()::text = member_id::text);

-- Members can insert their own volunteering hours
CREATE POLICY "Members can insert own volunteering hours" ON volunteering_hours
  FOR INSERT WITH CHECK (auth.uid()::text = member_id::text);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_volunteering_hours_member_id ON volunteering_hours(member_id);
CREATE INDEX IF NOT EXISTS idx_volunteering_hours_status ON volunteering_hours(status);
CREATE INDEX IF NOT EXISTS idx_volunteering_hours_activity_date ON volunteering_hours(activity_date);

-- Add is_admin column to members table if it doesn't exist
ALTER TABLE members ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Create a trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_volunteering_hours_updated_at 
    BEFORE UPDATE ON volunteering_hours 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
