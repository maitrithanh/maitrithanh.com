export interface Project {
  id: string;
  name: string;
  date: string;
  description: string;
  image: string;
  preview: string;
  link_source: string;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

export interface Tag {
  icon: string;
  color_code: string;
  tag_name: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  published_at: string;
  read_time: string;
  cover: string;
  content: string[];
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  link: string;
  image: string;
  created_at: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}
