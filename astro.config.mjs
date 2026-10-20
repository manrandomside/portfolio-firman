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
    // Poppins for headlines and labels (chosen by Firman), Onest for running text
    google("Poppins", "--font-poppins", [500, 600, 700], ["sans-serif"]),
    google("Onest", "--font-onest", [400, 500, 600], ["sans-serif"])
  ]
});
