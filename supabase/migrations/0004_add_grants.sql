-- =====================================================
-- Migration: 0004_add_grants
-- Description: Grant table-level privileges to anon and authenticated roles
-- Required because Supabase Postgres requires both RLS policies AND
-- table-level GRANTS for role access. RLS alone is not sufficient.
-- =====================================================

-- =====================================================
-- Grant SELECT to anon (public read)
-- Combined with RLS public read policies (migration 0002),
-- this allows anonymous users to read all 6 tables.
-- =====================================================
grant select on public.impact_areas to anon;
grant select on public.projects to anon;
grant select on public.project_tech to anon;
grant select on public.project_images to anon;
grant select on public.project_links to anon;
grant select on public.posters to anon;

-- =====================================================
-- Grant SELECT to authenticated (also need read)
-- Authenticated users include the admin (Firman) when logged in.
-- Admin needs read access in addition to write access.
-- =====================================================
grant select on public.impact_areas to authenticated;
grant select on public.projects to authenticated;
grant select on public.project_tech to authenticated;
grant select on public.project_images to authenticated;
grant select on public.project_links to authenticated;
grant select on public.posters to authenticated;

-- =====================================================
-- Grant INSERT, UPDATE, DELETE to authenticated (admin write)
-- Combined with RLS authenticated write policies (migration 0002),
-- this allows logged-in admin to perform CRUD operations.
-- =====================================================
grant insert, update, delete on public.impact_areas to authenticated;
grant insert, update, delete on public.projects to authenticated;
grant insert, update, delete on public.project_tech to authenticated;
grant insert, update, delete on public.project_images to authenticated;
grant insert, update, delete on public.project_links to authenticated;
grant insert, update, delete on public.posters to authenticated;

-- =====================================================
-- Grant USAGE on sequences (needed for INSERT with auto-generated IDs)
-- All tables use uuid PKs with default gen_random_uuid(), so this may
-- not be strictly necessary, but included for completeness in case
-- future schema changes use sequences.
-- =====================================================
-- grant usage on all sequences in schema public to authenticated;

-- =====================================================
-- Future tables: schema-level default privileges
-- Uncomment if you want all NEW tables in public schema to auto-grant.
-- Otherwise, remember to add grants when creating new tables.
-- =====================================================
-- alter default privileges in schema public grant select on tables to anon, authenticated;
-- alter default privileges in schema public grant insert, update, delete on tables to authenticated;
