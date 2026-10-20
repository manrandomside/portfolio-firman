import { defineConfig, fontProviders } from "astro/config";

const google = (name, cssVariable, weights, fallbacks) => ({ provider: fontProviders.google(), name, cssVariable, weights, styles: ["normal"], fallbacks, subsets: ["latin"] });

export default defineConfig({
  // public address; link previews and hreflang need absolute URLs
  site: "https://firmanfadilah.pages.dev",
  trailingSlash: "always",
  // the work page loads in the background when its link is hovered or tapped
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  // fonts are downloaded at build time and served from the site itself
  fonts: [
    // condensed poster headlines, semi-condensed callout labels, a plain text face
    google("Barlow Condensed", "--font-cond", [600, 700, 800], ["Arial Narrow", "sans-serif"]),
    google("Barlow Semi Condensed", "--font-label", [500, 600], ["Arial Narrow", "sans-serif"]),
    google("Onest", "--font-onest", [400, 500, 600], ["sans-serif"])
  ]
});
