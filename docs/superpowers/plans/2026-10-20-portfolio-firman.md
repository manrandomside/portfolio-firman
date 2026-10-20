# Portofolio Firman Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A bilingual (ID/EN) static portfolio for Firman Fadilah that pitches demo-first websites to UMKM owners and shows recruiters his proof, with no admin or backend.

**Architecture:** Pure Astro site. Every piece of content (profile, projects, experience, certificates, copy in both languages) lives in `src/data/site.js`; two small pure modules in `src/lib/` handle language lookups, alternate URLs, WhatsApp links and project filtering, and are unit-tested with `node:test`. Each page section is one `.astro` component; four thin route files render two views (`HomePage`, `WorkPage`) with a `lang` prop.

**Tech Stack:** Astro ^7.4, Lenis ^1.3.27, `astro:assets`, Astro Fonts API, `node:test`. No React, Tailwind, Supabase or backend.

**Spec:** `astro/portfolio-firman/docs/superpowers/specs/2026-10-20-portfolio-firman-design.md`

## Global Constraints

- Project folder: `C:\Users\Manrandomside\ProjectWebDev\astro\portfolio-firman`. Do not touch `next/portfolio-firman`.
- **No `git commit` and no `git push`** until Firman allows it. Each task lists its future commit message; run `git init` only, never commit. Commit style later: Conventional Commits, English, subject only, no Co-Authored-By line.
- Node 22.22+ (`.node-version` = `22.23.2`, same as Early Beauty).
- `site`: `https://firmanfadilah.pages.dev`.
- Routes: `/` (ID home), `/karya/` (ID work), `/en/` (EN home), `/en/work/` (EN work).
- WhatsApp: `6282144715831`, shown as `0821-4471-5831`. ID text: `Halo Firman, saya punya usaha ___ dan tertarik dibuatkan website.` EN text: `Hi Firman, I have a business called ___ and I'd like a website.`
- Email `firmanfdlh1@gmail.com`, GitHub `https://github.com/manrandomside`, LinkedIn `https://www.linkedin.com/in/firmanfadilah`, Instagram `https://www.instagram.com/manfdlh/`.
- `ME.cv` and `ME.photo` start as `null`; any element that needs them renders nothing (CV button) or a dashed placeholder slot (photo). Same for the Gapura Angkasa certificate (`cert: null`).
- Never show: Alter Ego, client-bday-surprise, Gapura Angkasa Laravel, Kobun. Never show prices. Never show certificate scans or certificate numbers.
- Fonts: Unbounded 500/700 (display, sparingly), Onest 400/500/600 (body), IBM Plex Mono 400/500 (labels, proof numbers).
- Colors: bg `#e8edf2`, ink `#0f1720`, muted `#4a5663`, line `#c3ccd5`, accent `#ff5a1f` (WhatsApp button, key marks only), one dark band `#0f1720` allowed (featured work).
- Motion: one easing `cubic-bezier(.22,1,.36,1)`, every reveal plays once, only big animation is the hero morph, all motion off under `prefers-reduced-motion`. Content is visible without JS (hidden states only under `html.js`).
- Copy: short sentences, everyday language, no "terbaik"/"best", no emoji, no em dashes.

## Review Focus

1. **Language switch on the work page** — tapping EN on `/karya/` must land on `/en/work/`, not `/en/`. Pinned by `altPath` tests (Task 1).
2. **Missing assets** (`photo`, `cv`, Gapura cert, Miaw/Tangkis screenshots) — page must still look intentional, no broken image, no dead button. Pinned by the data test that `cv === null` and by the build check in Task 4/5.
3. **Reduced motion** — hero shows the finished website phone and a static Instagram phone, no pinned scroll, counters show final numbers. Checked in Task 6.
4. **Phone width 360px** — no horizontal scroll anywhere, hero phones fit. Checked in Task 6.
5. **Project sheet** — Escape and the close button close it, focus returns to the card, page behind does not scroll (`data-lenis-prevent`). Checked in Task 4.

---

## File structure

```
astro/portfolio-firman/
├── package.json, astro.config.mjs, .node-version, .gitignore, README.md
├── public/        favicon.png, apple-touch-icon.png, og.jpg, robots.txt, sitemap.xml
└── src/
    ├── data/site.js          all content, both languages
    ├── data/images.js        import.meta.glob of src/assets/**, img(key)
    ├── lib/i18n.js           t, altPath, waLink
    ├── lib/projects.js       byFilter, featured
    ├── lib/*.test.js         unit + data-integrity tests
    ├── assets/               posters/, shots/, ig/ (Early Beauty photos for the hero grid)
    ├── layouts/Base.astro    head, SEO, hreflang, JSON-LD Person, motion init
    ├── scripts/motion.js     copied from Early Beauty + countUp
    ├── styles/global.css     tokens, shared type, reveal styles
    ├── components/           Nav, Intro, Hero, Proof, WorkGrid, ProjectSheet, About, Experience, Process, Faq, Contact
    ├── views/HomePage.astro, views/WorkPage.astro
    └── pages/index.astro, karya/index.astro, en/index.astro, en/work/index.astro
```

---

### Task 1: Project setup, content data and pure helpers

**Files:**
- Create: `package.json`, `astro.config.mjs`, `.node-version`, `.gitignore`
- Create: `src/data/site.js`, `src/lib/i18n.js`, `src/lib/projects.js`
- Test: `src/lib/i18n.test.js`, `src/lib/data.test.js`

**Interfaces:**
- Produces:
  - `site.js` exports `ME`, `PROJECTS`, `FEATURED`, `FILTERS`, `ARCHIVE`, `EXPERIENCE`, `CERTS`, `PROOF`, `STEPS`, `FAQ`, `UI`.
  - Bilingual strings are objects `{ id: string, en: string }`; plain strings are the same in both languages.
  - `ME = { name: "Firman Fadilah", short: "Firman", role: {id,en}, place: "Bali", wa: "6282144715831", waDisplay: "0821-4471-5831", email, github, linkedin, instagram, cv: null, photo: null }`
  - `PROJECTS[i] = { slug, name, cat: "klien"|"sistem"|"desain", year, line: {id,en}, story: {id,en}, role: {id,en}, stack: string[], live: string|null, repo: string|null, award: {title: {id,en}, by: string, proof: string}|null, image: string|null }`
  - `FEATURED = ["early-beauty", "kioku", "kelola-sdm"]`
  - `FILTERS = [{ key: "all", label: {id:"Semua",en:"All"} }, { key: "klien", label: {id:"Website klien",en:"Client websites"} }, { key: "sistem", label: {id:"Sistem & produk",en:"Systems & products"} }, { key: "desain", label: {id:"Desain",en:"Design"} }]`
  - `i18n.js`: `t(value, lang) -> string` (returns `value[lang]` for bilingual objects, `value` otherwise); `altPath(path) -> string`; `waLink(lang) -> string`
  - `projects.js`: `byFilter(projects, key) -> Project[]`; `featured(projects, slugs) -> Project[]` (in `slugs` order)

- [ ] **Step 1: Set up the project**

`package.json` like Early Beauty (`astro ^7.4.0`, `lenis ^1.3.27`, scripts `dev`, `build`, `preview`, `test: node --test "src/lib/*.test.js"`), then `npm install` and `git init` (no commit). `astro.config.mjs` uses the same `google()` helper as Early Beauty with the three fonts from Global Constraints and `site: "https://firmanfadilah.pages.dev"`. `.gitignore`: `node_modules`, `dist`, `.astro`.

- [ ] **Step 2: Write the failing tests**

```js
// src/lib/i18n.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { t, altPath, waLink } from "./i18n.js";

test("t picks the language and passes plain strings through", () => {
  assert.equal(t({ id: "Karya", en: "Work" }, "en"), "Work");
  assert.equal(t("Astro", "id"), "Astro");
});
test("altPath maps each page to its other-language twin", () => {
  assert.equal(altPath("/"), "/en/");
  assert.equal(altPath("/en/"), "/");
  assert.equal(altPath("/karya/"), "/en/work/");
  assert.equal(altPath("/en/work/"), "/karya/");
});
test("waLink opens Firman's WhatsApp with the prefilled message", () => {
  assert.equal(waLink("id"), "https://wa.me/6282144715831?text=" + encodeURIComponent("Halo Firman, saya punya usaha ___ dan tertarik dibuatkan website."));
  assert.ok(waLink("en").includes(encodeURIComponent("Hi Firman")));
});
```

```js
// src/lib/data.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { PROJECTS, FEATURED, ME, FILTERS } from "../data/site.js";
import { byFilter, featured } from "./projects.js";

const bilingual = v => typeof v === "object" && v && typeof v.id === "string" && typeof v.en === "string" && v.id && v.en;

test("every project has both languages and a known category", () => {
  for (const p of PROJECTS) {
    for (const k of ["line", "story", "role"]) assert.ok(bilingual(p[k]), `${p.slug}.${k}`);
    assert.ok(["klien", "sistem", "desain"].includes(p.cat), p.slug);
  }
});
test("excluded works never appear", () => {
  const text = JSON.stringify(PROJECTS).toLowerCase();
  for (const word of ["alter ego", "alterego", "bday", "ulang tahun", "kobun", "laravel/gapura"]) assert.ok(!text.includes(word), word);
});
test("home shows the three agreed works, in order", () => {
  assert.deepEqual(featured(PROJECTS, FEATURED).map(p => p.slug), ["early-beauty", "kioku", "kelola-sdm"]);
});
test("filters split the nine works 1 / 5 / 3", () => {
  assert.equal(byFilter(PROJECTS, "all").length, 9);
  assert.equal(byFilter(PROJECTS, "klien").length, 1);
  assert.equal(byFilter(PROJECTS, "sistem").length, 5);
  assert.equal(byFilter(PROJECTS, "desain").length, 3);
  assert.equal(FILTERS[0].key, "all");
});
test("the three posters carry their awards", () => {
  const by = Object.fromEntries(byFilter(PROJECTS, "desain").map(p => [p.slug, p.award?.by]));
  assert.deepEqual(by, { "teen-digital-toxicity": "Kreasi Publik FIA Universitas Brawijaya", "health-care-revolution": "UPCOFEST", "soilsense": "FNWMU Universitas Udayana" });
});
test("missing files stay null until Firman sends them", () => {
  assert.equal(ME.cv, null);
  assert.equal(ME.photo, null);
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test` — Expected: FAIL, modules not found.

- [ ] **Step 4: Write `src/lib/i18n.js`, `src/lib/projects.js` and `src/data/site.js`**

Project facts, links, awards, experience and certificate rows come verbatim from spec §4. Award titles: `{id:"Juara 1 Internasional",en:"1st place, international"}`, `{id:"Juara 1 Nasional",en:"1st place, national"}`, `{id:"Juara 3 Nasional",en:"3rd place, national"}`. `PROOF` holds the four proof items from spec §5.3 (`{ value: "3", label: {id,en} }` style; HKI and BNSP use a short word instead of a number). `EXPERIENCE` items link to a project slug (`kelola-sdm`, `cast`) and carry `cert: null` for Gapura Angkasa. `ARCHIVE`: read `git remote get-url origin` in `IL - Penugasan/PanganPintar-ML-Ops`, `data-science/*`, `IoT/iot-first-study` and the NLP folder; keep only entries that have a remote. `STEPS`, `FAQ` and `UI` (nav labels, button labels, section titles) follow spec §5 in both languages.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test` — Expected: 9 tests pass.

- [ ] **Step 6: Future commit message (do not commit)** — `feat(data): add portfolio content and language helpers`

---

### Task 2: Layout, navigation and the four routes

**Files:**
- Create: `src/layouts/Base.astro`, `src/styles/global.css`, `src/scripts/motion.js`, `src/components/Nav.astro`, `src/views/HomePage.astro`, `src/views/WorkPage.astro`, `src/pages/index.astro`, `src/pages/karya/index.astro`, `src/pages/en/index.astro`, `src/pages/en/work/index.astro`

**Interfaces:**
- Consumes: `t`, `altPath`, `ME`, `UI` (Task 1).
- Produces: `<Base lang path title description>`; `<HomePage lang>`; `<WorkPage lang>`; CSS classes `.in` (gutter wrapper), `.s` (section padding), `.rv` (reveal), `.mlw` (heading line reveal), `.btn`, `.btn.wa` (accent); `motion.js` exports `REDUCE`, `initReveal()`, `initSmoothScroll()`, `scrollToEl(el)`, `countUp(el)`.

- [ ] **Step 1: Build `Base.astro`**: `<html lang>`, title, description, canonical, `<link rel="alternate" hreflang="id|en|x-default">` built from `path` and `altPath(path)`, Open Graph + Twitter card (`/og.jpg`, 1200×630), theme-color `#0f1720`, favicon, JSON-LD `Person` (name, jobTitle, url, sameAs github/linkedin/instagram, alumniOf Universitas Udayana), the `<Font>` tags, inline `js` class script, then `initReveal()` + `initSmoothScroll()`.
- [ ] **Step 2: Copy `motion.js` from Early Beauty** and add `countUp(el)` that animates `el.dataset.to` from 0 once visible (shows final value when `REDUCE`).
- [ ] **Step 3: `Nav.astro`**: sticky (`top: env(safe-area-inset-top, 0px)`), name left; links Karya/Work, Tentang/About, Kontak/Contact; language switch `ID / EN` as a link to `altPath(path)` with the current language bold and `hreflang` set.
- [ ] **Step 4: Route files** render `<HomePage lang="id" />` etc.; views start with Nav + placeholder `<main>` that later tasks fill.
- [ ] **Step 5: Verify**

Run: `npm run build` — Expected: `dist/index.html`, `dist/karya/index.html`, `dist/en/index.html`, `dist/en/work/index.html` exist; `grep -c 'hreflang' dist/karya/index.html` ≥ 3 and it links `/en/work/`.

- [ ] **Step 6: Future commit message** — `feat(layout): add bilingual layout, navigation and routes`

---

### Task 3: Intro and the "Instagram to website" hero

**Files:**
- Create: `src/components/Intro.astro`, `src/components/Hero.astro`, `src/data/images.js`, `src/assets/ig/*.jpg`, `src/assets/shots/early-beauty-phone.png`
- Modify: `src/views/HomePage.astro`

**Interfaces:**
- Consumes: `waLink`, `t`, `UI`, `REDUCE`.
- Produces: `img(key)` in `images.js` (glob over `src/assets/**/*.{jpg,png}`, key = path without extension, e.g. `"ig/n1"`).

- [ ] **Step 1: Assets**: copy 9 Early Beauty photos (`n1 n3 n4 n6 e1 e6 b2 b4 s1`) from `astro/early-beauty-studio/src/assets/photos/` to `src/assets/ig/`; capture a 390×844 phone screenshot of `https://earlybeauty.pages.dev` hero into `src/assets/shots/early-beauty-phone.png`.
- [ ] **Step 2: `Intro.astro`**: name mark draws in, total ≤ 1.2 s, runs once per session (`sessionStorage` in try/catch), skipped under reduced motion or without JS.
- [ ] **Step 3: `Hero.astro`**: headline ID "Usahamu sudah ramai di Instagram. Saatnya punya website." with an EN line written naturally (e.g. "Your business is busy on Instagram. Time it had a website."); one lead sentence that Firman builds a sample first; buttons `.btn.wa` "Chat WhatsApp" (`waLink(lang)`) and "Lihat karya" (`#karya`). Right side: phone A = Instagram-style profile (`@earlybeauty`, 3×3 grid of `ig/*`), phone B = the Early Beauty screenshot.
- [ ] **Step 4: Morph**: on desktop the hero section is ~200vh with a sticky inner; scroll progress 0→1 moves each grid tile from phone A into phone B's layout while phone B fades/clips in. Use transforms only, one rAF scroll handler reading Lenis' scroll, no library. On phones (<768px) the two phones stack and the same progress drives the morph inside ~160vh. Under `REDUCE`: no sticky height, both phones static, phone B fully shown.
- [ ] **Step 5: Verify** in the Browser pane at 1280 and 375 widths: morph runs both directions, no horizontal scroll (`document.documentElement.scrollWidth === innerWidth`), WhatsApp link opens `wa.me/6282144715831`.
- [ ] **Step 6: Future commit message** — `feat(hero): add instagram to website hero and intro`

---

### Task 4: Proof strip, work cards, project sheet and the work page

**Files:**
- Create: `src/components/Proof.astro`, `src/components/WorkGrid.astro`, `src/components/ProjectSheet.astro`, `src/assets/posters/*.jpg`, `src/assets/shots/*.png`
- Modify: `src/views/HomePage.astro`, `src/views/WorkPage.astro`

**Interfaces:**
- Consumes: `PROOF`, `PROJECTS`, `FEATURED`, `FILTERS`, `ARCHIVE`, `byFilter`, `featured`, `img`, `countUp`.
- Produces: `<WorkGrid lang projects showFilters showArchive>`; cards carry `data-slug`; `ProjectSheet` opens for any `[data-slug]` click.

- [ ] **Step 1: Assets**: copy posters from `C:\Users\Manrandomside\AppData\Local\Temp\claude\C--Users-Manrandomside-ProjectWebDev\92198a70-3713-47b0-ae0e-b4ceecd618f6\images\` — `51.jpg → posters/health-care-revolution.jpg`, `52.jpg → posters/soilsense.jpg`, `53.jpg → posters/teen-digital-toxicity.jpg`. Screenshots: Kioku from `https://kioku-learn.vercel.app` (capture), Early Beauty desktop (capture), Kelola SDM `next/sdm-gapura-angkasa/public/images/screenshots/landing-gapura.png`, CAST from its repo `public/` if present. Miaw and Tangkis keep `image: null`.
- [ ] **Step 2: `Proof.astro`**: four items in IBM Plex Mono, numbers use `countUp`.
- [ ] **Step 3: `WorkGrid.astro`**: card = image (or typographic card with name + category when `image` is null), name, one line, category, award badge text when present. Filter chips (`aria-pressed`) show/hide cards client-side; without JS all cards show. Archive list under the grid on the work page only.
- [ ] **Step 4: `ProjectSheet.astro`**: native `<dialog data-lenis-prevent>` filled from a JSON island of the current language's projects; shows story, role, stack, live and GitHub links (only when non-null), award with proof link. Escape/close returns focus to the card.
- [ ] **Step 5: Home**: Proof below Hero, then a dark band `#karya` with the three featured cards and a link to `/karya/` or `/en/work/`. Work page: small header, filters, all nine cards, archive, contact.
- [ ] **Step 6: Verify**: `npm test` still passes; Browser pane: each filter shows 9/1/5/3 cards, sheet opens/closes with keyboard, Miaw/Tangkis cards look intentional.
- [ ] **Step 7: Future commit message** — `feat(work): add proof strip, work grid and project sheet`

---

### Task 5: About, experience, process, FAQ and contact

**Files:**
- Create: `src/components/About.astro`, `src/components/Experience.astro`, `src/components/Process.astro`, `src/components/Faq.astro`, `src/components/Contact.astro`
- Modify: `src/views/HomePage.astro`, `src/views/WorkPage.astro`

**Interfaces:**
- Consumes: `ME`, `EXPERIENCE`, `CERTS`, `STEPS`, `FAQ`, `UI`, `waLink`, `img`.

- [ ] **Step 1: `About.astro`**: photo from `img(ME.photo)` or a dashed slot labelled "Foto menyusul"/"Photo coming soon"; short bio from spec §4 (no semester, no Kobun); facts Bali · Universitas Udayana · focus.
- [ ] **Step 2: `Experience.astro`**: dated rows OJT Gapura Angkasa (Jul–Des 2025 → Kelola SDM), PPIDK Citra Konsultama (6 Nov 2025 – 7 Jan 2026, nilai 95 (A) → CAST), certificate cards BNSP Junior Web Developer (12 Jan 2026, berlaku sampai Jan 2029) and Junior Coder (2023, riwayat); award rows link to their Instagram posts. Gapura cert slot renders nothing while `cert` is null.
- [ ] **Step 3: `Process.astro`**: four real steps from spec §5.7 (numbered, since order matters). `Faq.astro`: 4–5 `<details>` from `FAQ`, no prices.
- [ ] **Step 4: `Contact.astro`**: big WhatsApp button, number as selectable text, email, GitHub, LinkedIn, Instagram; CV button only when `ME.cv`; faint "Firman Fadilah" watermark; © year.
- [ ] **Step 5: Verify**: `npm run build` passes; `grep -c "cv" dist/index.html` shows no CV link; Browser pane at 375px shows no overflow.
- [ ] **Step 6: Future commit message** — `feat(sections): add about, experience, process, faq and contact`

---

### Task 6: Share assets, README and final checks

**Files:**
- Create: `public/favicon.png`, `public/apple-touch-icon.png`, `public/og.jpg`, `public/robots.txt`, `public/sitemap.xml`, `README.md`

- [ ] **Step 1**: favicon "F." mark (Unbounded, accent on ink), 1200×630 `og.jpg` captured from the hero, `robots.txt` and `sitemap.xml` with the four URLs on `https://firmanfadilah.pages.dev`.
- [ ] **Step 2**: `README.md` in Indonesian, same shape as Early Beauty's README (what it is, features, how to add a project = one entry in `site.js` + one image, tech, run commands).
- [ ] **Step 3: Final checks** in the Browser pane: 1280 and 375 widths, both languages, reduced-motion emulation (hero static, counters final), JS disabled view still readable, no console errors, `npm test` and `npm run build` pass.
- [ ] **Step 4: Future commit message** — `docs(readme): add project readme and share assets`

Deploy to Cloudflare Pages and the first commit/push wait for Firman's go-ahead.
