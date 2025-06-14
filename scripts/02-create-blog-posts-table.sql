-- Create blog_posts table for Framework 4 Future
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255),
  reading_time_minutes INTEGER DEFAULT 5,
  categories TEXT[] DEFAULT '{}', -- Array of category names
  tags TEXT[] DEFAULT '{}', -- Array of tags
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_categories ON blog_posts USING GIN(categories);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Add RLS (Row Level Security) policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy to allow everyone to read published blog posts
CREATE POLICY "Allow everyone to read published blog posts" ON blog_posts
  FOR SELECT USING (is_published = true);

-- Policy to allow authenticated users to read all blog posts (including drafts)
CREATE POLICY "Allow authenticated users to read all blog posts" ON blog_posts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy to allow authenticated users to insert new blog posts
CREATE POLICY "Allow authenticated users to insert blog posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy to allow authenticated users to update blog posts
CREATE POLICY "Allow authenticated users to update blog posts" ON blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at when blog_posts are modified
CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
