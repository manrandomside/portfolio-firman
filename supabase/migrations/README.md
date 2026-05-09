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

## Verification

After running migrations, in Supabase Dashboard:

- **Table Editor**: should see 6 tables (impact_areas, projects, project_tech, project_images, project_links, posters)
- **Storage**: should see `karya-images` bucket
- **Authentication > Policies**: should see policies on all 6 tables and storage.objects

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
