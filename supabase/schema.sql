create table if not exists blog_posts (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  category text not null,
  summary text not null,
  published_at date not null default current_date,
  read_time text not null,
  cover text not null,
  content text[] not null default '{}',
  created_at timestamp with time zone default now()
);

alter table blog_posts enable row level security;

create policy "Allow public read access" on blog_posts
  for select using (true);

insert into blog_posts (slug, title, category, summary, published_at, read_time, cover, content) values
(
  'animation-system-for-delightful-ux',
  'Building delightful UX with animation systems',
  'Frontend',
  'How to design animation language that feels alive without hurting performance.',
  '2026-02-20',
  '6 min read',
  '/preschool.webp',
  ARRAY[
    'A strong animation system starts with consistency. Instead of random motions, define a small set of movement patterns for entrances, hover interactions, and feedback states.',
    'For production apps, favor transform and opacity because they are GPU-friendly and smooth on low-end devices. Keep durations short, and apply easing with intention.',
    'The best motion is subtle: enough to communicate hierarchy and state changes, but not so much that users feel delayed or distracted.'
  ]
),
(
  'clean-architecture-in-nextjs',
  'Practical clean architecture in Next.js apps',
  'Architecture',
  'A lightweight approach for organizing domains, shared UI, and API layers.',
  '2026-02-18',
  '8 min read',
  '/fastool.webp',
  ARRAY[
    'Start by separating domain logic from presentation. Keep business rules in plain modules and make UI components consume data via clear interfaces.',
    'Use feature boundaries to keep complexity localized. Each feature can own its components, hooks, and API calls without leaking implementation details.',
    'This approach keeps refactoring cheap and allows teams to scale both codebase and collaboration quality over time.'
  ]
),
(
  'shipping-with-reusable-design-primitives',
  'Shipping faster with reusable design primitives',
  'Design System',
  'Turning one-off UI into robust reusable components with shadcn and Tailwind.',
  '2026-02-12',
  '5 min read',
  '/todo-list-react.png',
  ARRAY[
    'Reusable primitives reduce decision fatigue and increase velocity. Start with core building blocks like buttons, cards, and form controls.',
    'Define clear variants and spacing rules. Team members can ship faster when components expose predictable APIs and sensible defaults.',
    'A minimal design system should optimize for readability and consistency first, then gradually add expressive variants when product needs grow.'
  ]
);
