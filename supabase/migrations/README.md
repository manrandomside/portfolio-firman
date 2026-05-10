# Database Migrations

These migrations define the schema for the portfolio CMS.

## How to Run

1. Open Supabase Dashboard → SQL Editor
2. Copy contents of each migration file in order
3. Paste into SQL Editor and click "Run"
4. Verify success in Table Editor

## Migration Order

1. `0001_initial_schema.sql` — Creates all tables, indexes, triggers
2. `0002_rls_policies.sql` — Enables Row Level Security
3. `0003_storage_setup.sql` — Configures storage bucket and policies
4. `0004_add_grants.sql` — Grants table privileges to anon and authenticated roles

## Verification

After running migrations, in Supabase Dashboard:

- **Table Editor**: should see 6 tables (impact_areas, projects, project_tech, project_images, project_links, posters)
- **Storage**: should see `karya-images` bucket
- **Authentication > Policies**: should see policies on all 6 tables and storage.objects
- **Test query**: in SQL Editor, run `select count(*) from public.impact_areas;` — should NOT return permission denied error

## Troubleshooting

### Permission denied for table errors

If queries return "permission denied for table X" errors:
- This means the table has RLS policies but lacks table-level GRANTS
- Run migration 0004 (or its statements manually for the affected table)
- This is required for Supabase since RLS alone is not sufficient

## Re-running Migrations

These migrations are not idempotent in all cases. To re-run:

1. Drop all tables: `drop schema public cascade; create schema public;`
2. Re-run migrations in order

WARNING: Dropping schema deletes all data. Only do this in development.

## Schema Overview

```
impact_areas (3 cards on homepage)
└── projects (multiple per area)
    ├── project_tech (tech pills)
    ├── project_images (gallery)
    └── project_links (action links)

posters (standalone, for infographic-design page)
```

## Seed Data

After running migrations, populate initial data from `supabase/seeds/initial_data.sql`.

Run via SQL Editor (same as migrations) once after migrations complete. Re-running will create duplicate rows unless tables are truncated first.

To re-seed (development only):
1. Truncate tables: `truncate table public.posters cascade; truncate table public.impact_areas cascade;`
2. Re-run seed file

The seed mirrors the static content in `content/` directory exactly. Future content changes will be made via admin panel directly, not via re-seeding.
