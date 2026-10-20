# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** owners of small businesses in Bali (salons, cafés, shops, studios) whose business already lives on Instagram and WhatsApp but has no website. They open the portfolio on a phone, often from a link Firman sends after preparing a sample site for them. Their job: decide whether to trust this person with their business's first website, and message him.
- **Secondary:** recruiters and companies assessing Firman as a developer. They look for real shipped work, workplace experience and verifiable credentials.

## Product Purpose

The personal portfolio of Firman Fadilah, Informatics student at Universitas Udayana, Bali. It wins website work from small businesses using a demo-first offer (Firman builds a sample site first; the owner continues only if they like it) and gives recruiters fast, checkable proof. Success: owners message on WhatsApp; recruiters reach the experience and contact details.

## Positioning

Firman makes complicated things clear. He has won three infographic poster competitions (one international) and builds websites that answer a customer's questions before they ask. His proof is real and checkable: a live client site, products in use and dated certificates.

## Operating Context

- Contact happens on WhatsApp (6282144715831, prefilled message) and email; recruiters also use LinkedIn and GitHub.
- No prices are shown; cost is discussed on WhatsApp after the sample.
- Indonesian is the default language at `/`; English at `/en/`.
- Work index at `/karya/` (`/en/work/`) with a detail panel per project.

## Capabilities and Constraints

- Static Astro site on Cloudflare Pages (firmanfadilah.pages.dev). No backend, no admin, no CMS; content lives in `src/data/site.js`, and new work is added by editing that file.
- Two languages for every piece of copy.
- Not yet available, never to be invented: Firman's photo, a CV PDF, the Gapura Angkasa internship certificate. Their slots stay hidden or empty until supplied.
- Excluded on purpose: Alter Ego, client-bday-surprise, Gapura Angkasa (Laravel version), Kobun. No certificate scans or certificate numbers.

## Brand Commitments

- Name shown as Firman Fadilah; short mark "firman." already in use.
- Voice: plain, short sentences, everyday Indonesian; no "terbaik"-style superlatives, no emoji.

## Evidence on Hand

- Early Beauty Studio: live client site (earlybeauty.pages.dev), 5 pages, 2 languages, announcement admin, Lighthouse 96–100; screenshots in `src/assets/shots/`, Instagram photos (with permission) in `src/assets/ig/`.
- Kioku: live (kioku-learn.vercel.app), registered copyright (HKI), FSRS, AI tutor.
- Kelola SDM Gapura Angkasa: staff system for 1,273+ employees, on-the-job training Jul–Dec 2025.
- CAST: academic ticketing built during industry placement at PT Citra Konsultama Indonesia (6 Nov 2025 – 7 Jan 2026, final score 95/A).
- Miaw: digital pet + ESP32 (live miaw-ai.vercel.app). Tangkis: offline Android scam detector.
- Posters: Teen Digital Toxicity (1st, international, Kreasi Publik FIA Universitas Brawijaya), Health Care Revolution (1st, national, UPCOFEST), SoilSense (3rd, national, FNWMU Universitas Udayana), with Instagram proof links; images in `src/assets/posters/`.
- BNSP Junior Web Developer (Jan 2026 – Jan 2029); BNSP Junior Coder (2023).
- No testimonials or client quotes exist yet; do not fabricate any.

## Product Principles

1. Lead with the small-business owner; give recruiters their own clear path rather than splitting the first screen.
2. Show, then tell: real work and checkable proof before claims.
3. Clarity is the product: every section should make one thing obvious, the way an infographic does.
4. Nothing invented: missing assets stay absent, numbers are real.

## Accessibility & Inclusion

WCAG AA contrast and full keyboard use; reduced-motion preference respected; must work well on low-end phones and slow connections in Bali.
