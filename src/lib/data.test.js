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
test("home shows the agreed works, in order", () => {
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
