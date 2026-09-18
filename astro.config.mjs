import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"

// Static output: every piece is finished HTML at build. React runs only in islands (charts, gallery).
export default defineConfig({
  output: "static",
  site: process.env.SITE_URL ?? "https://gc-home.onrender.com",
  base: process.env.SITE_BASE ?? "/",
  trailingSlash: "ignore",
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
})
