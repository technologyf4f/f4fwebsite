-- Create blogs table for Framework 4 Future
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image TEXT,
  date VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  reading_time VARCHAR(50) NOT NULL,
  categories TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at);
CREATE INDEX IF NOT EXISTS idx_blogs_title ON blogs(title);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON blogs(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_categories ON blogs USING GIN(categories);

-- Add RLS (Row Level Security) policies
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Policy to allow everyone to read blogs
CREATE POLICY "Allow everyone to read blogs" ON blogs
  FOR SELECT USING (true);

-- Policy to allow authenticated users to insert blogs
CREATE POLICY "Allow authenticated users to insert blogs" ON blogs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy to allow authenticated users to update blogs
CREATE POLICY "Allow authenticated users to update blogs" ON blogs
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy to allow authenticated users to delete blogs
CREATE POLICY "Allow authenticated users to delete blogs" ON blogs
  FOR DELETE USING (auth.role() = 'authenticated');

-- Trigger to automatically update updated_at when blogs are modified
CREATE TRIGGER update_blogs_updated_at 
  BEFORE UPDATE ON blogs 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
