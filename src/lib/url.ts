/** Internal link helper. Prefixes Astro's base path so the site works at the root (Render, Vercel)
 *  and under a subpath (GitHub Pages serves /gc-home-v1/). Always pass a root-relative path. */
const BASE = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "")
export const href = (path: string) => `${BASE}${path.startsWith("/") ? path : `/${path}`}`
