-- Run this in Supabase SQL Editor to create the tables

-- Projects
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT DEFAULT '',
  image TEXT NOT NULL,
  preview TEXT NOT NULL,
  link_source TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  published_at DATE NOT NULL,
  read_time TEXT NOT NULL,
  cover TEXT NOT NULL,
  content JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Skills
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  link TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Experiences (career timeline)
CREATE TABLE experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT NOT NULL,
  highlights JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Site Settings (key-value store)
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
  ('hero_subtitle', 'Fullstack Developer crafting modern, fast and delightful products.'),
  ('hero_badge', 'Building clean web experiences'),
  ('about_me', 'I''m Mai Tri Thanh, a Fullstack Developer who enjoys blending solid engineering with thoughtful UI.'),
  ('about_focus', 'My focus is building fast web products with clean architecture, smooth interactions, and details users can feel.'),
  ('cta_title', 'Let''s build something memorable.'),
  ('cta_subtitle', 'Open for freelance, product, and startup collaborations.'),
  ('email', 'maitrithanh06@gmail.com'),
  ('phone', '+84 325575029'),
  ('location', 'Ho Chi Minh City')
ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read access" ON site_settings FOR SELECT USING (true);

-- Authenticated users can do everything
CREATE POLICY "Full access for authenticated" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Full access for authenticated" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Full access for authenticated" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Full access for authenticated" ON experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Full access for authenticated" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
