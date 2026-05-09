-- =====================================================
-- Seed: initial_data
-- Description: Populates database with initial content matching static files
--
-- Mirrors:
--   content/karya.ts (impact_areas)
--   content/projects/software-engineering.ts
--   content/projects/ai-exploration.ts
--   content/projects/infographic-design.ts
--
-- WARNING: This seed assumes empty tables. Re-running will create duplicates
-- unless tables are truncated first.
-- =====================================================

-- Optional: clear existing data (uncomment if re-seeding)
-- truncate table public.posters cascade;
-- truncate table public.impact_areas cascade;

-- =====================================================
-- impact_areas (3 rows)
-- Source: content/karya.ts
-- =====================================================
insert into public.impact_areas (slug, number_label, title, description, icon_name, display_order)
values
  ('software-engineering', '01 / Engineering', 'Software Engineering',
   'Membangun produk web end-to-end dengan stack modern. Dari database design sampai pixel-perfect UI.',
   'Code2', 1),
  ('ai-exploration', '02 / Exploration', 'AI Exploration',
   'Mengeksplorasi machine learning, deep learning, dan integrasi AI ke dalam aplikasi nyata.',
   'Target', 2),
  ('infographic-design', '03 / Visual', 'Infographic Design',
   'Menerjemahkan konsep teknis kompleks menjadi visual yang mudah dipahami melalui poster dan infografis.',
   'LayoutGrid', 3);

-- =====================================================
-- projects + tech (software-engineering area)
-- Source: content/projects/software-engineering.ts
-- CTE pattern: insert projects first, return ids, then insert tech atomically
-- =====================================================
with se_area as (
  select id from public.impact_areas where slug = 'software-engineering'
),
project_kelola_sdm as (
  insert into public.projects (area_id, number, title, role_timeline, description, display_order)
  select id, '01', 'Kelola SDM PT Gapura Angkasa',
    'Fullstack Developer · Jul-Des 2025 · OJT',
    'Sistem Kelola SDM yang dibangun selama 5 bulan OJT untuk PT Gapura Angkasa. Modul absensi, cuti, evaluasi, dan reporting untuk ratusan karyawan. Belajar bekerja di tim enterprise, code review, dan deliver fitur ke production.',
    1
  from se_area
  returning id
),
project_pengaduan as (
  insert into public.projects (area_id, number, title, role_timeline, description, display_order)
  select id, '02', 'Layanan Pengaduan Akademisi',
    'Fullstack Developer · 2025 · Internship PT Citra Konsultama',
    'Sistem ticketing dan pengaduan untuk kebutuhan akademik, dibangun selama internship paralel di PT Citra Konsultama. Belajar arsitektur sistem ticketing dan handling user feedback.',
    2
  from se_area
  returning id
)
insert into public.project_tech (project_id, label, display_order)
select id, label, ord
from project_kelola_sdm,
     unnest(array['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind', 'Drizzle ORM']) with ordinality as t(label, ord)
union all
select id, label, ord
from project_pengaduan,
     unnest(array['Web App', 'Ticketing', 'Backend']) with ordinality as t(label, ord);

-- Insert images for SE projects (storage_path is null until upload)
insert into public.project_images (project_id, label, aspect, display_order)
select p.id, 'Dashboard view', 'video', 1
from public.projects p where p.title = 'Kelola SDM PT Gapura Angkasa'
union all
select p.id, 'Module list', 'video', 2
from public.projects p where p.title = 'Kelola SDM PT Gapura Angkasa'
union all
select p.id, 'Reporting view', 'video', 3
from public.projects p where p.title = 'Kelola SDM PT Gapura Angkasa'
union all
select p.id, 'Ticket list', 'video', 1
from public.projects p where p.title = 'Layanan Pengaduan Akademisi'
union all
select p.id, 'Submission form', 'video', 2
from public.projects p where p.title = 'Layanan Pengaduan Akademisi';

-- Insert links for SE projects
insert into public.project_links (project_id, label, href, is_external, display_order)
select p.id, 'View Code', 'https://github.com/manrandomside/kelola-sdm-gapura-angkasa', true, 1
from public.projects p where p.title = 'Kelola SDM PT Gapura Angkasa'
union all
select p.id, 'View Code', 'https://github.com/manrandomside/layanan-pengaduan-kebutuhan-akademisi-ticketing', true, 1
from public.projects p where p.title = 'Layanan Pengaduan Akademisi';

-- =====================================================
-- projects + tech (ai-exploration area)
-- Source: content/projects/ai-exploration.ts
-- =====================================================
with ai_area as (
  select id from public.impact_areas where slug = 'ai-exploration'
),
project_kobun as (
  insert into public.projects (area_id, number, title, role_timeline, description, display_order)
  select id, '01', 'Kobun',
    'Personal Project · Deep Learning · 2026',
    'Personal Deep Learning project. Eksplorasi neural networks dan model training. Tempat saya mencoba konsep ML baru tanpa pressure produksi — dari arsitektur model sampai optimisasi training pipeline.',
    1
  from ai_area
  returning id
),
project_kioku as (
  insert into public.projects (area_id, number, title, role_timeline, description, display_order)
  select id, '02', 'Kioku',
    'Personal Project · Terdaftar HKI · 2026',
    'Personal AI project, terdaftar HKI. Aplikasi yang mengeksplorasi konsep memory dan pembelajaran personal melalui pendekatan AI. Project ini dijadikan basis untuk keperluan akademik dan pendaftaran HKI.',
    2
  from ai_area
  returning id
)
insert into public.project_tech (project_id, label, display_order)
select id, label, ord
from project_kobun,
     unnest(array['Python', 'Deep Learning', 'Neural Networks', 'PyTorch']) with ordinality as t(label, ord)
union all
select id, label, ord
from project_kioku,
     unnest(array['AI', 'Next.js', 'Personal', 'HKI']) with ordinality as t(label, ord);

-- Insert images for AI projects (3 for Kobun, 2 for Kioku)
insert into public.project_images (project_id, label, aspect, display_order)
select p.id, 'Model Architecture', 'video', 1
from public.projects p where p.title = 'Kobun'
union all
select p.id, 'Training Pipeline', 'video', 2
from public.projects p where p.title = 'Kobun'
union all
select p.id, 'Evaluation Results', 'video', 3
from public.projects p where p.title = 'Kobun'
union all
select p.id, 'Memory Interface', 'video', 1
from public.projects p where p.title = 'Kioku'
union all
select p.id, 'AI Interaction', 'video', 2
from public.projects p where p.title = 'Kioku';

-- Insert links for AI projects
insert into public.project_links (project_id, label, href, is_external, display_order)
select p.id, 'View Code', 'https://github.com/manrandomside/kobun', true, 1
from public.projects p where p.title = 'Kobun'
union all
select p.id, 'View Code', 'https://github.com/manrandomside/kioku', true, 1
from public.projects p where p.title = 'Kioku';

-- =====================================================
-- posters (6 rows)
-- Source: content/projects/infographic-design.ts
-- Standalone table, no foreign key to impact_areas
-- =====================================================
insert into public.posters (title, topic, year, tools, image_label, display_order)
values
  ('Poster 01', 'Sample design topic', '2025', '["Figma"]'::jsonb, 'Poster 01 placeholder', 1),
  ('Poster 02', 'Sample design topic', '2025', '["Figma", "Photoshop"]'::jsonb, 'Poster 02 placeholder', 2),
  ('Poster 03', 'Sample design topic', '2025', '["Figma"]'::jsonb, 'Poster 03 placeholder', 3),
  ('Poster 04', 'Sample design topic', '2024', '["Figma"]'::jsonb, 'Poster 04 placeholder', 4),
  ('Poster 05', 'Sample design topic', '2024', '["Photoshop"]'::jsonb, 'Poster 05 placeholder', 5),
  ('Poster 06', 'Sample design topic', '2024', '["Figma", "Illustrator"]'::jsonb, 'Poster 06 placeholder', 6);

-- =====================================================
-- Verification queries (run separately to verify seed)
-- =====================================================
-- select count(*) from public.impact_areas;       -- expect 3
-- select count(*) from public.projects;            -- expect 4
-- select count(*) from public.project_tech;        -- expect 16 (5+3+4+4)
-- select count(*) from public.project_images;      -- expect 10 (3+2+3+2)
-- select count(*) from public.project_links;       -- expect 4 (1 per project)
-- select count(*) from public.posters;             -- expect 6
