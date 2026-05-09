-- =====================================================
-- Migration: 0001_initial_schema
-- Description: Initial database schema for portfolio CMS
-- Tables: impact_areas, projects, project_tech, project_images, project_links, posters
-- =====================================================

-- Enable UUID generation if not already enabled
create extension if not exists "uuid-ossp";

-- =====================================================
-- impact_areas
-- Maps to homepage Karya section cards
-- =====================================================
create table public.impact_areas (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  number_label text not null,
  title text not null,
  description text not null,
  icon_name text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_impact_areas_display_order on public.impact_areas(display_order);
create index idx_impact_areas_slug on public.impact_areas(slug);

-- =====================================================
-- projects
-- Belongs to impact_areas, used in /karya/[slug] detail pages
-- =====================================================
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  area_id uuid not null references public.impact_areas(id) on delete cascade,
  number text not null,
  title text not null,
  role_timeline text not null,
  description text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_projects_area_id on public.projects(area_id);
create index idx_projects_display_order on public.projects(area_id, display_order);

-- =====================================================
-- project_tech
-- Tech stack pills per project (one-to-many)
-- =====================================================
create table public.project_tech (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  label text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index idx_project_tech_project_id on public.project_tech(project_id);

-- =====================================================
-- project_images
-- Image gallery items per project (one-to-many)
-- =====================================================
create table public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  storage_path text,
  label text not null,
  aspect text not null default 'video' check (aspect in ('video', 'square', 'portrait')),
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index idx_project_images_project_id on public.project_images(project_id);

-- =====================================================
-- project_links
-- Action links per project (View Code, Live Demo, etc.)
-- =====================================================
create table public.project_links (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  label text not null,
  href text not null,
  is_external boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index idx_project_links_project_id on public.project_links(project_id);

-- =====================================================
-- posters
-- For /karya/infographic-design page
-- Standalone table since posters have different structure than projects
-- =====================================================
create table public.posters (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  topic text not null,
  year text not null,
  tools jsonb not null default '[]'::jsonb,
  storage_path text,
  image_label text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_posters_display_order on public.posters(display_order);

-- =====================================================
-- updated_at trigger function
-- Auto-updates updated_at timestamp on row UPDATE
-- =====================================================
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply trigger to tables with updated_at column
create trigger update_impact_areas_updated_at
  before update on public.impact_areas
  for each row execute function public.update_updated_at_column();

create trigger update_projects_updated_at
  before update on public.projects
  for each row execute function public.update_updated_at_column();

create trigger update_posters_updated_at
  before update on public.posters
  for each row execute function public.update_updated_at_column();

-- =====================================================
-- Comments for documentation
-- =====================================================
comment on table public.impact_areas is 'Top-level Karya categories shown on homepage';
comment on table public.projects is 'Projects belonging to impact_areas, shown on detail pages';
comment on table public.project_tech is 'Tech stack tags per project';
comment on table public.project_images is 'Image gallery per project';
comment on table public.project_links is 'Action links per project (GitHub, Live Demo)';
comment on table public.posters is 'Standalone posters for infographic-design detail page';
