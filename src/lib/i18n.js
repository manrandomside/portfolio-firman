import { ME, UI } from "../data/site.js";

// bilingual values are { id, en }; anything else reads the same in both languages
export const t = (value, lang) => (value && typeof value === "object" && "id" in value ? value[lang] : value);

// each page and its twin in the other language
const TWINS = { "/": "/en/", "/karya/": "/en/work/" };
export const altPath = path => TWINS[path] ?? Object.keys(TWINS).find(k => TWINS[k] === path) ?? "/";

export const waLink = lang => `https://wa.me/${ME.wa}?text=${encodeURIComponent(t(UI.waText, lang))}`;
