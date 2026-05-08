# Portfolio Firman — Project Guide

This document is the source of truth for AI assistants and contributors working on this codebase. Read this file before making any changes.

## Project Overview

Personal portfolio website for Firman Fadilah. The site showcases career journey, project work, and serves as a hub for collaboration inquiries.

**Owner**: Firman Fadilah (firmanfdlh1@gmail.com, github.com/manrandomside)
**Live URL**: https://portfolio-firman.vercel.app (planned)
**Repository**: https://github.com/manrandomside/portfolio-firman

## Visual North Star

This project mirrors the visual quality and technical polish of Mareta Ayu's portfolio.

**Primary visual reference**: https://portfolio-maretacodes.vercel.app/
**Loading screen reference**: https://ifalf.com
**Local layout reference**: `claude-design-reference.html` at project root
**Local visual references** (in `references/` folder):

- `mareta-01-light.png` — full page light mode reference (primary benchmark)
- `mareta-02-dark.png` — full page dark mode reference
- `mareta-03-light-karya-frontend.png` — karya section detail reference

The light mode reference is the primary visual benchmark for the entire site. The dark mode reference shows how the design adapts. The karya detail reference shows project card layout and typography in context.

When implementation decisions arise that are not covered by the local references, defer to Mareta's actual production website. The aesthetic and feel must match that benchmark.

The content is original to Firman (career chapters, projects, copy) but the design language, animation quality, and technical execution should match the reference.

## Tech Stack

| Layer           | Technology                   |
| --------------- | ---------------------------- |
| Framework       | Next.js 15 (App Router)      |
| Language        | TypeScript (strict mode)     |
| Styling         | Tailwind CSS v4              |
| Animation       | Framer Motion                |
| Icons           | Lucide React                 |
| Theme           | next-themes                  |
| i18n            | Custom React Context (EN/ID) |
| Deployment      | Vercel                       |
| Version Control | Git + GitHub                 |

## Visual Design Principles

The design follows a strict editorial monochrome aesthetic. The reference design is preserved in `claude-design-reference.html` at the project root.

### Color System

Important: This palette intentionally avoids pure white (`#FFFFFF`) and pure black (`#000000`). Pure tones create harsh contrast that strains the eyes, especially during extended reading. The portfolio uses warm off-white and warm near-black for an editorial, literary feel that matches the visual benchmark.

Light mode:

- Background: `#FAFAF7` (warm off-white, subtle cream tone)
- Foreground: `#0F0F0F` (warm near-black, slight depth)
- Muted: `#6B6B68` (warm medium gray for secondary text)
- Border: `#E8E6E1` (warm light gray divider)

Dark mode:

- Background: `#111111` (warm near-black, slightly lifted from pure)
- Foreground: `#F5F5F2` (warm off-white for readable contrast)
- Muted: `#A1A19E` (warm light gray for secondary text)
- Border: `#2A2A28` (subtle warm dark divider)

The palette is intentionally minimal: no accent colors, no gradients, no decorative shadows. The design relies entirely on typography hierarchy and whitespace. The warm undertone is consistent across both modes, creating a cohesive editorial feel. If a future feature requires a hint of color (such as a status indicator), it should be discussed and added to this section first.

### Typography

- Display and body: Inter or Geist Sans
- Mono accents (numbers, eyebrow labels, code): JetBrains Mono or Geist Mono
- Hero name size: `clamp(80px, 12vw, 180px)` with `line-height: 0.9`
- Section heading: `64px`, weight `500`
- Body: `16-18px`, line-height `1.6-1.7`

### Spacing

- Container max-width: `1200px`
- Section vertical padding: `120px` desktop, `80px` mobile
- Whitespace is intentional. Never crowd elements.

## Project Structure

```
portfolio-firman/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/
│   ├── sections/             # Page sections (Hero, Journey, etc.)
│   ├── ui/                   # Reusable UI primitives
│   └── shared/               # Shared components (Nav, Footer, Loader)
├── contexts/                 # React contexts (i18n, theme)
├── lib/                      # Utilities and helpers
│   └── utils.ts              # Helper functions
├── content/                  # Static content (translations, chapters)
│   ├── en.ts
│   └── id.ts
├── public/
│   ├── videos/               # Hero animation MP4
│   └── images/               # Static images
├── styles/                   # Global CSS
├── types/                    # TypeScript type definitions
├── CLAUDE.md                 # This file
├── claude-design-reference.html  # Visual reference from Claude Design
└── references/               # Visual references from Mareta's portfolio
    └── mareta-*.png          # Screenshots for design quality benchmark
```

## Code Conventions

### Strict Rules

1. **No emojis anywhere in source code, comments, commit messages, or documentation.** This includes README, code comments, console outputs, and Git history. UI text may use Unicode typography characters like `·`, `→`, `—` which are not emojis.

2. **Use TypeScript strictly.** No `any` types unless absolutely necessary and documented with a comment explaining why.

3. **No inline styles.** Use Tailwind classes only. If a one-off style is needed, use CSS modules or extend the Tailwind config.

4. **Server Components by default.** Use `'use client'` directive only when interactivity (state, effects, event handlers) is required.

5. **Naming conventions:**
   - Components: PascalCase (`HeroSection.tsx`)
   - Utilities and hooks: camelCase (`useScrollPosition.ts`)
   - Constants: UPPER_SNAKE_CASE
   - File names match component names

6. **Imports order:**
   - React/Next imports first
   - Third-party libraries
   - Internal absolute imports (`@/components/...`)
   - Relative imports
   - Type imports last (with `import type`)

### Component Patterns

Each section is a self-contained component in `components/sections/`. Sections compose smaller UI primitives from `components/ui/`. Pages in `app/` only orchestrate sections, never contain layout logic directly.

Pattern example:

```tsx
// app/page.tsx
export default function HomePage() {
  return <></>;
}
```

### Animation Guidelines

- Use Framer Motion for component animations.
- Loading screen counter uses `useMotionValue` and `animate` for the 0 to 100 sequence.
- Scroll-triggered reveals use `whileInView` with `viewport={{ once: true }}`.
- Animations must respect `prefers-reduced-motion`.

## Internationalization (i18n)

The site supports English (EN) and Indonesian (ID). Indonesian is the default language.

Content lives in `content/en.ts` and `content/id.ts` with matching key structures. The `LanguageContext` provides current locale and a translation function `t(key)`. Persistence is handled via `localStorage`.

When adding new copy, always add both EN and ID versions in their respective files. Never hardcode user-facing strings in components.

## Theme System

Dark and light modes are toggled via `next-themes`. The default is system preference. Theme preference persists across sessions. All components must work in both modes without breaking.

## Git Workflow

### Branch Strategy

Single `main` branch. Direct commits to main with disciplined commit messages. No feature branches for this project.

### Commit Message Format

Follow Conventional Commits strictly:

```
<type>: <subject in lowercase>

<optional body explaining what and why>
```

Allowed types:

- `feat`: new feature
- `fix`: bug fix
- `chore`: tooling, config, dependencies
- `style`: formatting, no logic change
- `perf`: performance improvement
- `docs`: documentation only
- `refactor`: code restructure without behavior change

Subject line under 72 characters. No period at the end. No emojis. Lowercase after the colon.

Good examples:

```
feat: implement loading screen with counter animation
chore: configure tailwind theme tokens for monochrome palette
fix: prevent layout shift in hero section on mobile
```

Bad examples:

```
Updated stuff
WIP
feat: Added new feature.
```

### Commit Granularity

Each commit represents one logical unit of work. Tests pass and build succeeds before every commit.

## Build and Test Commands

```bash
npm run dev          # Start development server on port 3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

Before any commit, both `npm run lint` and `npm run type-check` must pass without errors.

## Deployment

Production deploys automatically from `main` branch via Vercel integration. Preview deployments are generated for any push.

Environment variables are managed via Vercel dashboard. Never commit `.env.local` to the repository.

## v2 Roadmap

The following features are planned for v2 and intentionally not implemented in v1:

- Stories blog system at `/cerita` with full CRUD
- Admin panel at `/admin` for content management
- Database integration via Supabase (PostgreSQL)
- Authentication via Supabase Auth
- Markdown content rendering for blog posts
- Tag filtering and post categorization

When v2 work begins, this document will be updated to include the database schema, RLS policies, and admin auth flow. New folders will appear under `app/cerita/`, `app/admin/`, and `lib/supabase/`.

## Out of Scope (Do Not Modify)

- `claude-design-reference.html` is read-only reference. Do not edit.
- `references/` folder contains visual benchmarks. Do not edit or remove.
- `CLAUDE.md` (this file) should only be updated when project conventions genuinely change. Discuss before modifying.

## Working Style for AI Assistants

When implementing features:

1. Read this file first.
2. Reference `claude-design-reference.html` for layout structure.
3. Reference `references/mareta-*.png` for visual quality benchmark and design details.
4. When in doubt, prioritize matching the visual feel of the Mareta references over the Claude Design output.
5. Implement one section or feature per session.
6. Run `npm run lint` and `npm run type-check` before declaring work complete.
7. Stage commits as atomic, meaningful units.
8. Commit messages follow the format defined above.
9. Never introduce dependencies without justification.
