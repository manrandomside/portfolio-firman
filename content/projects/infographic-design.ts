/**
 * @deprecated As of commit 22, the static `infographicDesignPosters` array is no longer
 * imported by app code. Poster content is sourced from Supabase database via
 * lib/supabase/queries.ts. This file is preserved as reference for the original seed data.
 * Future content changes happen via admin panel (commits 23+).
 *
 * Note: the `Poster` type below is still actively imported by query helpers and
 * components — only the data array is deprecated.
 */
// Note: Currently using placeholder posters with imageLabel only.
// When admin panel is built (commits 19+), posters will migrate to Supabase Storage
// with imagePath set to actual /public/posters/{filename} paths or Supabase URLs.

export type Poster = {
  id: string;
  title: string;
  topic: string;       // 1-line description
  year: string;        // e.g., "2025"
  tools: string[];     // e.g., ["Figma", "Photoshop"]
  imageLabel: string;  // placeholder label until real image uploaded
  imagePath?: string;  // optional, set when real image exists in /public/posters/
};

export const infographicDesignPosters: Poster[] = [
  {
    id: "01",
    title: "Poster 01",
    topic: "Sample design topic",
    year: "2025",
    tools: ["Figma"],
    imageLabel: "Poster 01 placeholder",
  },
  {
    id: "02",
    title: "Poster 02",
    topic: "Sample design topic",
    year: "2025",
    tools: ["Figma", "Photoshop"],
    imageLabel: "Poster 02 placeholder",
  },
  {
    id: "03",
    title: "Poster 03",
    topic: "Sample design topic",
    year: "2025",
    tools: ["Figma"],
    imageLabel: "Poster 03 placeholder",
  },
  {
    id: "04",
    title: "Poster 04",
    topic: "Sample design topic",
    year: "2024",
    tools: ["Figma"],
    imageLabel: "Poster 04 placeholder",
  },
  {
    id: "05",
    title: "Poster 05",
    topic: "Sample design topic",
    year: "2024",
    tools: ["Photoshop"],
    imageLabel: "Poster 05 placeholder",
  },
  {
    id: "06",
    title: "Poster 06",
    topic: "Sample design topic",
    year: "2024",
    tools: ["Figma", "Illustrator"],
    imageLabel: "Poster 06 placeholder",
  },
];
