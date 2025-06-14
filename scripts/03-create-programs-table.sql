-- Create programs table for Framework 4 Future
CREATE TABLE IF NOT EXISTS programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  start_date DATE,
  end_date DATE,
  location VARCHAR(255),
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  registration_deadline DATE,
  program_type VARCHAR(50), -- 'workshop', 'summit', 'service', 'ongoing'
  age_range VARCHAR(50), -- e.g., '13-18', '16-25'
  requirements TEXT,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_programs_active ON programs(is_active);
CREATE INDEX IF NOT EXISTS idx_programs_featured ON programs(is_featured);
CREATE INDEX IF NOT EXISTS idx_programs_start_date ON programs(start_date);
CREATE INDEX IF NOT EXISTS idx_programs_type ON programs(program_type);

-- Add RLS policies
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read active programs
CREATE POLICY "Allow everyone to read active programs" ON programs
  FOR SELECT USING (is_active = true);

-- Allow authenticated users to manage programs
CREATE POLICY "Allow authenticated users to manage programs" ON programs
  FOR ALL USING (auth.role() = 'authenticated');

-- Trigger for updated_at
CREATE TRIGGER update_programs_updated_at 
  BEFORE UPDATE ON programs 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
