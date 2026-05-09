-- =====================================================
-- Migration: 0002_rls_policies
-- Description: Row Level Security policies
-- Strategy: public read, authenticated write
-- =====================================================

-- Enable RLS on all tables
alter table public.impact_areas enable row level security;
alter table public.projects enable row level security;
alter table public.project_tech enable row level security;
alter table public.project_images enable row level security;
alter table public.project_links enable row level security;
alter table public.posters enable row level security;

-- =====================================================
-- impact_areas policies
-- =====================================================
create policy "impact_areas: public read"
  on public.impact_areas
  for select
  to anon, authenticated
  using (true);

create policy "impact_areas: authenticated write"
  on public.impact_areas
  for all
  to authenticated
  using (true)
  with check (true);

-- =====================================================
-- projects policies
-- =====================================================
create policy "projects: public read"
  on public.projects
  for select
  to anon, authenticated
  using (true);

create policy "projects: authenticated write"
  on public.projects
  for all
  to authenticated
  using (true)
  with check (true);

-- =====================================================
-- project_tech policies
-- =====================================================
create policy "project_tech: public read"
  on public.project_tech
  for select
  to anon, authenticated
  using (true);

create policy "project_tech: authenticated write"
  on public.project_tech
  for all
  to authenticated
  using (true)
  with check (true);

-- =====================================================
-- project_images policies
-- =====================================================
create policy "project_images: public read"
  on public.project_images
  for select
  to anon, authenticated
  using (true);

create policy "project_images: authenticated write"
  on public.project_images
  for all
  to authenticated
  using (true)
  with check (true);

-- =====================================================
-- project_links policies
-- =====================================================
create policy "project_links: public read"
  on public.project_links
  for select
  to anon, authenticated
  using (true);

create policy "project_links: authenticated write"
  on public.project_links
  for all
  to authenticated
  using (true)
  with check (true);

-- =====================================================
-- posters policies
-- =====================================================
create policy "posters: public read"
  on public.posters
  for select
  to anon, authenticated
  using (true);

create policy "posters: authenticated write"
  on public.posters
  for all
  to authenticated
  using (true)
  with check (true);
