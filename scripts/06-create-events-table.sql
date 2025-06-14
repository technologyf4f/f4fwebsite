-- Create events table for Framework 4 Future
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  date VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);
CREATE INDEX IF NOT EXISTS idx_events_name ON events(name);

-- Add RLS (Row Level Security) policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy to allow everyone to read events
CREATE POLICY "Allow everyone to read events" ON events
  FOR SELECT USING (true);

-- Policy to allow authenticated users to insert events
CREATE POLICY "Allow authenticated users to insert events" ON events
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy to allow authenticated users to update events
CREATE POLICY "Allow authenticated users to update events" ON events
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy to allow authenticated users to delete events
CREATE POLICY "Allow authenticated users to delete events" ON events
  FOR DELETE USING (auth.role() = 'authenticated');

-- Trigger to automatically update updated_at when events are modified
CREATE TRIGGER update_events_updated_at 
  BEFORE UPDATE ON events 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
