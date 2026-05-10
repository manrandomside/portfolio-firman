# Portfolio Firman — Project Guide

This document is the source of truth for AI assistants and contributors working on this codebase. Read this file before making any changes.

## Project Overview

Personal portfolio website for Firman Fadilah. Showcases an editorial monochrome design with premium motion choreography. Built to feel both minimal and intentional, communicating technical craft through both content and interaction quality.

**Owner**: Firman Fadilah (firmanfdlh1@gmail.com, github.com/manrandomside)
**Live URL**: https://portfolio-firman.vercel.app (planned)
**Repository**: https://github.com/manrandomside/portfolio-firman

## Design Direction History

This project went through a design pivot during early development:

- **v1 direction (commits 1-7)**: Mareta-inspired with 4 nav links (Beranda, Perjalanan, Karya, Kolaborasi), Journey timeline section, single-page layout
- **v2 direction (current)**: Refined to 3 nav links (Beranda, Tentang, Karya), narrative About section replacing timeline, dedicated detail pages for Karya, motion-first interaction philosophy

The v1 implementation will be progressively refactored into v2 in subsequent commits. Both directions remain in git history as evidence of iteration journey.

## Visual North Star

This project draws inspiration from multiple sources but explores its own voice. References are guides, not strict blueprints. Implementation has freedom to refine, elaborate, and elevate beyond reference constraints — particularly in motion and interaction design.

**Inspiration sources**:

- Mareta Ayu's portfolio (https://portfolio-maretacodes.vercel.app/) — for editorial monochrome quality
- Ifal Fahri's portfolio (https://ifalf.com) — for loading screen and motion sophistication

**Local references** (in `references/` folder):

- `mareta-01-light.png` — Mareta homepage light mode (visual quality benchmark)
- `mareta-02-dark.png` — Mareta homepage dark mode
- `mareta-03-light-karya-frontend.png` — Mareta karya detail reference

**Local layout reference**: `claude-design-reference.html` at project root (homepage v2 from Claude Design iteration)

References are inspiration. Implementation explores freely with motion as primary differentiator.

## Tech Stack

| Layer           | Technology                   |
| --------------- | ---------------------------- |
| Framework       | Next.js 15+ (App Router)     |
| Language        | TypeScript (strict mode)     |
| Styling         | Tailwind CSS v4              |
| Animation       | Framer Motion + Lenis        |
| Icons           | Lucide React                 |
| Theme           | next-themes                  |
| i18n            | Custom React Context (EN/ID) |
| Database        | Supabase (PostgreSQL)        |
| Auth            | Supabase Auth                |
| Storage         | Supabase Storage             |
| SSR             | @supabase/ssr                |
| Deployment      | Vercel                       |
| Version Control | Git + GitHub                 |

## Visual Design Principles

The design follows a strict editorial monochrome aesthetic with warm undertones. The aesthetic communicates technical seriousness without sterility.

### Color System

Important: This palette intentionally avoids pure white (`#FFFFFF`) and pure black (`#000000`). Pure tones create harsh contrast. The portfolio uses warm off-white and warm near-black for an editorial, literary feel.

Light mode:

- Background: `#FAFAF7` (warm off-white)
- Foreground: `#111111` (warm near-black)
- Muted: `#6B6B6B` (warm medium gray)
- Border: `#E6E4DD` (warm light gray)
- Soft: `#F2F0E9` (warm panel background, optional)

Dark mode:

- Background: `#111111` (warm near-black)
- Foreground: `#FAFAF7` (warm off-white)
- Muted: `#8A8A85` (warm light gray)
- Border: `#222220` (subtle warm dark divider)
- Soft: `#1A1A18` (warm panel background, optional)

The palette is intentionally minimal: no accent colors, no gradients, no decorative shadows. Design relies on typography hierarchy, whitespace, and motion.

### Typography

- Display and body: Inter (or Geist Sans fallback)
- Mono accents (numbers, eyebrow labels, code, terminal): JetBrains Mono (or Geist Mono fallback)
- Hero name size: `clamp(80px, 12vw, 180px)` with `line-height: 0.9` and tight letter-spacing
- Section heading h2: `clamp(40px, 5vw, 64px)`, weight 500
- Body: 16-18px, line-height 1.6-1.7
- Eyebrow labels: 11px mono, uppercase, letter-spacing 0.28em

### Spacing

- Container max-width: 1200px (narrow variant: 960px)
- Section vertical padding: 120px desktop, 80px mobile
- Whitespace is intentional. Never crowd elements.

## Site Architecture

### Routes

```
/                              Homepage
/karya/software-engineering    Detail page: SE projects (Kelola SDM, Layanan Pengaduan)
/karya/ai-exploration          Detail page: AI projects (Kobun, Kioku) — placeholder content
/karya/infographic-design      Detail page: poster grid showcase
```

### Homepage Sections (in order)

1. **Loading screen overlay** — counter 0-100 with corner brackets, meta labels, slide-up reveal exit
2. **Sticky navigation** — brand mark "F" + name "Firman", 3 links (Beranda, Tentang, Karya), language pill (ID/EN), theme toggle
3. **Hero** — eyebrow, display name "Firman", subtitle, role tags (Software Engineer · AI Explorer · Infographic Designer), terminal block with typewriter
4. **Tentang** — narrative paragraphs with sticky aside (pills + meta-list)
5. **Karya** — section number indicator, 3 cards (Software Engineering, AI Exploration, Infographic Design) with Explore links to detail pages
6. **Footer** — copyright, social links, scroll-to-top arrow, build credit caption

### Detail Page Layout (consistent across 3 routes)

1. **Same Nav** with current "Karya" link highlighted
2. **Detail hero** — eyebrow with breadcrumb (e.g., "KARYA / SOFTWARE ENGINEERING"), back link, area title, intro
3. **Project list** — vertical list of project rows with number, title, tech pills, role/timeline, description, image gallery, action links
4. **Same Footer**

### Detail Page Content

**/karya/software-engineering**: Kelola SDM Gapura Angkasa (OJT, Jul-Des 2025), Layanan Pengaduan Akademisi (Internship Citra Konsultama, 2025)

**/karya/ai-exploration**: Kobun (Personal Deep Learning project), Kioku (Personal AI project, terdaftar HKI). Both with placeholder "case study coming soon" status.

**/karya/infographic-design**: Poster grid showcase, masonry or 2-column layout, files loaded from `/public/posters/`.

## Project Structure

```
portfolio-firman/
├── app/
│   ├── layout.tsx                    Root layout (Nav, Footer global)
│   ├── page.tsx                      Homepage composition
│   ├── globals.css                   Design tokens via Tailwind v4 @theme
│   └── karya/
│       ├── software-engineering/
│       │   └── page.tsx
│       ├── ai-exploration/
│       │   └── page.tsx
│       └── infographic-design/
│           └── page.tsx
├── components/
│   ├── sections/                     Page-level sections (Hero, About, Karya)
│   ├── ui/                           Reusable primitives (Card, Pill, etc.)
│   └── shared/                       Cross-cutting (Loader, Nav, Footer, ThemeProvider, Cursor)
├── contexts/                         React contexts (i18n)
├── lib/                              Utilities and helpers
│   └── utils.ts                      cn() helper
├── content/                          Static content
│   ├── projects/                     Project data per category
│   │   ├── software-engineering.ts
│   │   ├── ai-exploration.ts
│   │   └── infographic-design.ts
│   └── translations/                 i18n strings (en.ts, id.ts) — added in i18n commit
├── public/
│   ├── posters/                      Infographic poster files
│   ├── projects/                     Project screenshots
│   └── videos/                       Hero animation MP4 (when ready)
├── styles/                           Additional CSS if needed
├── types/                            TypeScript types
├── CLAUDE.md                         This file
├── claude-design-reference.html      Visual reference (homepage v2)
└── references/                       Visual benchmark images
```

## Code Conventions

### Strict Rules

1. **No emojis anywhere in source code, comments, commit messages, or documentation.** UI text may use Unicode typography characters like `·`, `→`, `—`, `§` which are not emojis.
2. **TypeScript strict mode.** No `any` types unless documented with reason.
3. **No inline styles.** Tailwind classes only. Extend Tailwind config if needed.
4. **Server Components by default.** Use `'use client'` only for interactivity.
5. **Naming**: Components PascalCase, hooks/utils camelCase, constants UPPER_SNAKE_CASE.
6. **Imports order**: React/Next, third-party, internal absolute (`@/*`), relative, type imports last.

### Component Patterns

Pages compose sections. Sections compose UI primitives. Pages never contain layout logic directly.

```tsx
// app/page.tsx
export default function HomePage() {
  return <></>;
}
```

## Animation Philosophy

Motion is a primary differentiator. Every animation must serve a purpose: emphasize hierarchy, reveal content meaningfully, or showcase craft. Never decorative for its own sake.

### Animation Tier A (foundational)

- **Loading screen**: counter 0-100 with cubic ease-out, slide-up reveal mask exit
- **Hero name reveal**: letter-by-letter stagger after loader exits (80ms per letter)
- **Hero terminal**: typewriter effect with cursor blink, looped 4s cycle
- **Section reveals**: stagger eyebrow → heading → body, 120ms each, triggered by scroll into view
- **Theme toggle**: smooth color transition with cubic bezier, icon morph

### Animation Tier B (premium)

- **Smooth scroll**: integrate Lenis library for buttery scroll feel
- **Custom cursor**: dot + outline circle, lag follow effect, expand on hoverable elements
- **Magnetic hover**: cards subtly track cursor when nearby (transform translate)

### Constraints

- All animations respect `prefers-reduced-motion` — disable or shorten when preference is set
- No animation should impede scroll performance
- Avoid animations longer than 800ms (feels sluggish)
- Use Framer Motion `whileInView` with `viewport={{ once: true }}` for scroll reveals
- Hardware-accelerated transforms only (`transform`, `opacity`)

## Internationalization (i18n)

The site supports English (EN) and Indonesian (ID). Indonesian is the default.

Content lives in `content/translations/en.ts` and `content/translations/id.ts` with matching key structure. The `LanguageContext` provides current locale and a `t(key)` function. Persistence via `localStorage`.

Add both EN and ID versions when introducing new copy. Never hardcode user-facing strings.

## Theme System

Light and dark modes via `next-themes` with class-based strategy. Default is system preference. All components must work in both modes. Theme toggle has smooth color transition.

## Database & Auth

The portfolio uses Supabase for content management (admin panel) and dynamic data loading (public site).

### Architecture

- **Public site**: server components fetch data via `lib/supabase/server.ts`
- **Admin panel**: client components for forms, server actions for mutations
- **Session**: managed via cookies, refreshed by `proxy.ts` on every request
- **RLS**: Row Level Security enabled on all tables, public read for published content, authenticated write for admin

### Folder Structure

```
lib/supabase/
├── client.ts          Browser client for client components
├── server.ts          Server client for server components and actions
└── middleware.ts      Helper for session refresh
```

### Schema Overview

The database has 6 tables organized in two domains:

**Project domain** (for software-engineering and ai-exploration pages):
- `impact_areas` — top-level categories (3 cards on homepage)
- `projects` — projects within each area
- `project_tech` — tech stack pills per project
- `project_images` — image gallery per project
- `project_links` — action links per project (GitHub, Live Demo)

**Poster domain** (for infographic-design page):
- `posters` — standalone poster records with tools as jsonb

All tables have RLS enabled with public read and authenticated write policies. Single-admin model — `authenticated` role check is sufficient.

Migrations live in `supabase/migrations/` and are executed manually via Supabase Dashboard SQL Editor. See `supabase/migrations/README.md` for execution instructions.

### Initial Data

Initial data was seeded via `supabase/seeds/initial_data.sql` (commit 21).

**As of commit 22, public pages fetch from Supabase via `lib/supabase/queries.ts`.** Static content files in `content/` are deprecated reference material — they are NOT imported by app code anymore. Future content changes happen via admin panel (commits 23+).

The `content/projects/types.ts` file is still active — it defines the shared Project type used by both query helpers and components.

### Caching Strategy

Public pages use SSG + ISR with 60-second revalidate. After admin actions (commits 23+), specific paths can be invalidated immediately via `revalidatePath()`.

```ts
export const revalidate = 60; // applied to /karya/[slug] and homepage
```

### Storage

The `karya-images` bucket holds all project screenshots and poster files. Public read access. Upload restricted to authenticated users (admin only).

Folder convention within bucket:
- `karya-images/projects/{project-id}/{image-id}.{ext}` for project images
- `karya-images/posters/{poster-id}.{ext}` for posters

### Authentication Flow

The portfolio uses Supabase Auth with email + password for single-admin access (Firman only).

- Login page: `/admin/login`
- Auth helpers: `lib/supabase/auth.ts` exports `getCurrentUser()`, `requireAuth()`, `signOut()`
- Protected routes: `proxy.ts` redirects unauthenticated users to login when accessing `/admin/*` (except `/admin/login`)
- Session management: handled by `@supabase/ssr` cookie helpers, refreshed on every request via proxy

To enforce auth in server components:

```ts
import { requireAuth } from "@/lib/supabase/auth";

export default async function AdminPage() {
  const user = await requireAuth(); // redirects to /admin/login if not authenticated
  return <div>Welcome {user.email}</div>;
}
```

The admin user must be created manually via Supabase Dashboard (Authentication > Users > Add user with auto-confirm). No public signup is exposed.

The global `Nav`, `Footer`, and `Fab` components are skipped on `/admin/*` routes — `components/shared/AppShell.tsx` reads the pathname and conditionally renders the public shell so admin pages get a clean takeover surface.

### Environment Variables

Required in `.env.local` (gitignored) and Vercel dashboard:

- `NEXT_PUBLIC_SUPABASE_URL` — public, safe to expose
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public, safe to expose, RLS enforces security
- `SUPABASE_SERVICE_ROLE_KEY` — secret, server-side only, bypasses RLS

Template available in `.env.example` (committed).

## Git Workflow

### Branch Strategy

Single `main` branch. Direct commits with disciplined messages. No feature branches for this project.

### Commit Message Format

Conventional Commits strict:

```
<type>(<scope>): <subject in lowercase>

<optional body with bullet points>
```

Types: `feat`, `fix`, `chore`, `style`, `perf`, `docs`, `refactor`
Scopes (project-specific): `setup`, `theme`, `nav`, `hero`, `about`, `karya`, `footer`, `loader`, `motion`, `i18n`, `responsive`, `reference`

Subject under 72 characters. No period. No emoji. Lowercase after colon.

### Commit Granularity

Each commit is one logical unit. Lint, type-check, and build pass before commit.

## Build and Test Commands

```bash
npm run dev          # Dev server on localhost:3000
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run type-check   # TypeScript compiler check
```

Both `npm run lint` and `npm run type-check` must pass before any commit.

## Deployment

Auto-deploy from `main` via Vercel. Preview deployments per push. Environment variables managed via Vercel dashboard. Never commit `.env.local`.

## Out of Scope (Do Not Modify)

- `claude-design-reference.html` is read-only inspiration. Do not edit.
- `references/` folder contains visual benchmarks. Do not edit or remove.
- `CLAUDE.md` (this file) updated only when conventions genuinely change.

## Working Style for AI Assistants

When implementing:

1. Read this file first.
2. Reference `claude-design-reference.html` for layout intent (not strict copy).
3. Reference `references/*.png` for visual quality benchmark.
4. **Implementation explores freely beyond reference constraints — especially in motion and interaction quality.**
5. One section or feature per session.
6. Run `npm run lint` and `npm run type-check` before declaring done.
7. Commit messages follow the format above.
8. Never introduce dependencies without justification.
9. Animation is primary differentiator. Bake motion into section commits where natural.
   Save (Ctrl+S).
   Step 2.3: Commit & Push Pivot
   powershellgit add . ; git commit -m "docs(reference): pivot to design v2 with motion-first direction

- Replace homepage HTML reference with v2 from Claude Design iteration
- Update CLAUDE.md to reflect design v2 direction and decisions
- Document design direction history v1 to v2 for iteration transparency
- Simplify nav plan to 3 links: Beranda, Tentang, Karya
- Plan to refactor Journey timeline into Tentang narrative section
- Add detail page architecture for /karya/[slug] routes
- Define color system v2 with warm tones and soft panel token
- Document animation philosophy with Tier A foundational and Tier B premium
- Add Lenis to tech stack for smooth scroll integration
- Mark references as inspiration only, implementation explores freely
- Note: animation is primary differentiator, baked into section commits" ; git push
