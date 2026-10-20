// Images by key, the path under src/assets without extension (e.g. "shots/kioku", "ig/n1").
const files = import.meta.glob("../assets/**/*.{jpg,png}", { eager: true, import: "default" });
const byKey = Object.fromEntries(Object.entries(files).map(([path, src]) => [path.replace("../assets/", "").replace(/\.(jpg|png)$/, ""), src]));
export const img = key => (key ? byKey[key] ?? null : null);
