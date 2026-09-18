import { createClient } from "@sanity/client"

/**
 * Read-only client for the Government Contracted content lake.
 * Pieces are read at build or request time; frozen data blocks come with them.
 * No token is needed for published content on a public dataset. A token, if
 * ever required (drafts, private dataset), comes from VITE_SANITY_READ_TOKEN
 * via Doppler or a gitignored .env, never from source.
 */
export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? "5e8csiu1",
  dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: "2026-09-01",
  useCdn: true,
  token: import.meta.env.VITE_SANITY_READ_TOKEN,
})

export const PIECE_FIELDS = `
  _id, title, "slug": slug.current, dek, section, status, publishedAt, correction,
  "series": series->{title, "slug": slug.current},
  "byline": byline->{name, role},
  body
`

export const pieceBySlug = (slug: string) =>
  sanity.fetch(`*[_type == "piece" && slug.current == $slug && status in ["published","corrected"]][0]{${PIECE_FIELDS}}`, { slug })

export const piecesInSection = (section: "markets" | "briefings") =>
  sanity.fetch(
    `*[_type == "piece" && section == $section && status in ["published","corrected"]] | order(publishedAt desc){${PIECE_FIELDS}}`,
    { section },
  )
