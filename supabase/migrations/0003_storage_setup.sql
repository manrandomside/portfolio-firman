-- =====================================================
-- Migration: 0003_storage_setup
-- Description: Storage bucket configuration for project and poster images
-- Bucket: karya-images (public read, authenticated write)
-- =====================================================

-- Create public bucket for karya images
-- Note: Run this manually if bucket creation via SQL fails
-- Alternative: create via Supabase Dashboard > Storage > New Bucket
insert into storage.buckets (id, name, public)
values ('karya-images', 'karya-images', true)
on conflict (id) do nothing;

-- =====================================================
-- Storage policies
-- =====================================================

-- Public read access to all files in karya-images
create policy "karya-images: public read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'karya-images');

-- Authenticated users can upload
create policy "karya-images: authenticated upload"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'karya-images');

-- Authenticated users can update files (replace)
create policy "karya-images: authenticated update"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'karya-images')
  with check (bucket_id = 'karya-images');

-- Authenticated users can delete files
create policy "karya-images: authenticated delete"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'karya-images');
