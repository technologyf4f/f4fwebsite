-- Insert sample programs
INSERT INTO programs (name, description, image_url, start_date, end_date, location, max_participants, program_type, age_range, is_active, is_featured) VALUES
('Youth Leadership Summit', 'Annual summit bringing together young leaders from across the Carolinas to share ideas and build networks.', '/placeholder.svg?height=300&width=400&text=Leadership+Summit', '2024-03-15', '2024-03-17', 'Charlotte, NC', 100, 'summit', '16-25', true, true),
('Community Service Initiative', 'Monthly community service projects focusing on local environmental and social issues.', '/placeholder.svg?height=300&width=400&text=Community+Service', '2024-01-01', '2024-12-31', 'Various Locations', 50, 'ongoing', '13-18', true, false),
('Civic Engagement Workshop', 'Interactive workshops teaching young people about local government and how to make their voices heard.', '/placeholder.svg?height=300&width=400&text=Civic+Workshop', '2024-04-22', '2024-04-22', 'Raleigh, NC', 30, 'workshop', '16-21', true, false);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, image_url, author_name, author_email, reading_time_minutes, categories, tags, is_featured, is_published, published_at) VALUES
('Youth Leadership in the Digital Age', 'youth-leadership-digital-age', 'In today''s rapidly evolving digital landscape, young leaders are finding innovative ways to create positive change in their communities. From social media campaigns to digital organizing platforms, technology has become an essential tool for modern youth leadership.

The Framework 4 Future program has witnessed firsthand how digital literacy empowers young people to amplify their voices and extend their reach. Our participants have launched successful online campaigns, created digital resources for their peers, and used technology to coordinate community service projects.

One of our recent graduates, Maria Rodriguez, used social media to organize a community cleanup that attracted over 200 volunteers. Her strategic use of Instagram stories, Facebook events, and TikTok videos demonstrated how digital platforms can mobilize people for real-world action.

However, with great power comes great responsibility. We also focus on teaching digital citizenship, helping young leaders understand the importance of ethical online behavior, fact-checking, and creating inclusive digital spaces.

The future of leadership is digital, and we''re committed to ensuring our youth are prepared to lead in this new era.', 'Exploring how young leaders are leveraging technology to create positive change in their communities.', '/placeholder.svg?height=300&width=400&text=Digital+Leadership', 'Maria Rodriguez', 'maria@framework4future.org', 5, ARRAY['Leadership', 'Technology'], ARRAY['digital', 'youth', 'social media'], true, true, '2024-06-02 10:00:00+00'),

('Building Inclusive Communities Through Service', 'building-inclusive-communities-service', 'Community service has always been at the heart of the Framework 4 Future mission, but we''ve learned that true impact comes from creating inclusive spaces where all young people can contribute their unique perspectives and talents.

Our approach to community service goes beyond traditional volunteering. We focus on projects that bring together youth from diverse backgrounds, fostering understanding and collaboration across different communities in the Carolinas.

Last month, our "Bridges Not Walls" initiative brought together students from urban and rural schools to work on a joint environmental project. The collaboration not only resulted in the restoration of a local watershed but also created lasting friendships and mutual understanding between participants.

We''ve found that when young people work together on meaningful projects, they naturally break down barriers and build bridges. These experiences teach empathy, cultural competence, and the value of diverse perspectives in problem-solving.

The key to inclusive community service is ensuring that all voices are heard and valued. We train our program facilitators to create environments where every participant feels empowered to contribute their ideas and take leadership roles.', 'How community service projects are bringing diverse groups together to solve local challenges.', '/placeholder.svg?height=300&width=400&text=Inclusive+Communities', 'James Washington', 'james@framework4future.org', 7, ARRAY['Community', 'Inclusion'], ARRAY['service', 'diversity', 'collaboration'], false, true, '2024-05-15 14:30:00+00'),

('The Future of Civic Engagement', 'future-civic-engagement', 'As we look toward the future, civic engagement among young people is evolving in exciting and innovative ways. Traditional forms of political participation are being supplemented and sometimes replaced by new models of community involvement and democratic participation.

At Framework 4 Future, we''re seeing young leaders who are not content to wait until they''re older to make their voices heard. They''re finding creative ways to engage with local government, advocate for policy changes, and create positive change in their communities right now.

Our Civic Engagement Workshop series has introduced hundreds of young people to the mechanics of local government, but more importantly, it has shown them that their voices matter and that they can make a difference today.

One powerful example is our "Youth Voice Initiative," where participants research local issues, develop policy proposals, and present them to city councils and county commissioners. Several of these proposals have been adopted, demonstrating the real impact young people can have on their communities.

We''re also exploring new forms of civic engagement, including participatory budgeting projects where young people help decide how public funds are spent, and digital democracy initiatives that use technology to increase youth participation in local decision-making.

The future of democracy depends on engaging young people as active participants, not just future voters.', 'New approaches to engaging young people in democratic processes and community decision-making.', '/placeholder.svg?height=300&width=400&text=Civic+Engagement', 'Sophia Chen', 'sophia@framework4future.org', 6, ARRAY['Civic Engagement', 'Democracy'], ARRAY['politics', 'government', 'advocacy'], false, true, '2024-04-28 09:15:00+00');

-- Insert sample members
INSERT INTO members (email, first_name, last_name, phone, date_of_birth, city, state, programs_interested, leadership_experience, why_join, how_heard_about_us) VALUES
('alex.johnson@email.com', 'Alex', 'Johnson', '704-555-0123', '2005-03-15', 'Charlotte', 'NC', ARRAY['Youth Leadership Summit', 'Community Service Initiative'], 'Student council president, volunteer at local food bank', 'I want to develop my leadership skills and make a positive impact in my community', 'School counselor'),
('taylor.smith@email.com', 'Taylor', 'Smith', '919-555-0456', '2006-07-22', 'Raleigh', 'NC', ARRAY['Civic Engagement Workshop'], 'Organized climate action group at school', 'Interested in learning more about local government and policy advocacy', 'Social media'),
('jordan.williams@email.com', 'Jordan', 'Williams', '828-555-0789', '2004-11-08', 'Asheville', 'NC', ARRAY['Youth Leadership Summit', 'Civic Engagement Workshop'], 'Captain of debate team, volunteer tutor', 'Want to connect with other young leaders and learn new skills', 'Friend recommendation');
