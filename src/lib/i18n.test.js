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
