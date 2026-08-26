import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://gokakudo.com",
  output: "server",
  adapter: cloudflare(),
  trailingSlash: "always",
  compressHTML: true,
});
