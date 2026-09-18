import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"

// Static output: every piece is finished HTML at build. React runs only in islands (charts, gallery).
export default defineConfig({
  output: "static",
  trailingSlash: "ignore",
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
})
