-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  title VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('youth_leader', 'executive_member', 'board_director')),
  headshot_url TEXT,
  bio TEXT,
  email VARCHAR(255),
  linkedin_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_team_members_category ON team_members(category);
CREATE INDEX IF NOT EXISTS idx_team_members_active ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_team_members_order ON team_members(display_order);

-- Insert sample data
INSERT INTO team_members (first_name, last_name, title, category, headshot_url, bio, display_order) VALUES
-- Youth Leaders
('Sarah', 'Johnson', 'Youth Program Coordinator', 'youth_leader', '/placeholder-user.jpg', 'Passionate about empowering young people through education and community engagement.', 1),
('Michael', 'Chen', 'Student Outreach Lead', 'youth_leader', '/placeholder-user.jpg', 'Dedicated to connecting with students and building meaningful relationships.', 2),
('Emma', 'Rodriguez', 'Event Planning Coordinator', 'youth_leader', '/placeholder-user.jpg', 'Creative organizer who brings communities together through impactful events.', 3),
('David', 'Thompson', 'Volunteer Coordinator', 'youth_leader', '/placeholder-user.jpg', 'Committed to mobilizing volunteers for maximum community impact.', 4),

-- Executive Members
('Jennifer', 'Williams', 'Executive Director', 'executive_member', '/placeholder-user.jpg', 'Visionary leader with 10+ years of experience in nonprofit management.', 1),
('Robert', 'Davis', 'Program Manager', 'executive_member', '/placeholder-user.jpg', 'Strategic thinker focused on program development and implementation.', 2),
('Lisa', 'Anderson', 'Operations Manager', 'executive_member', '/placeholder-user.jpg', 'Detail-oriented professional ensuring smooth organizational operations.', 3),
('James', 'Wilson', 'Community Relations Manager', 'executive_member', '/placeholder-user.jpg', 'Bridge-builder connecting our organization with community partners.', 4),

-- Board of Directors
('Dr. Patricia', 'Brown', 'Board Chair', 'board_director', '/placeholder-user.jpg', 'Retired educator with 30 years of experience in youth development.', 1),
('Mark', 'Taylor', 'Vice Chair', 'board_director', '/placeholder-user.jpg', 'Business executive passionate about social impact and governance.', 2),
('Susan', 'Miller', 'Treasurer', 'board_director', '/placeholder-user.jpg', 'CPA with expertise in nonprofit financial management and compliance.', 3),
('Thomas', 'Garcia', 'Secretary', 'board_director', '/placeholder-user.jpg', 'Legal professional specializing in nonprofit law and governance.', 4),
('Dr. Maria', 'Martinez', 'Board Member', 'board_director', '/placeholder-user.jpg', 'Healthcare professional committed to community wellness initiatives.', 5);
