import { createClient } from "@sanity/client"

/** Build-time read client. Public dataset, no token, no CDN (a webhook rebuild must never read a stale copy). */
export const sanity = createClient({ projectId: "5e8csiu1", dataset: "production", apiVersion: "2026-09-01", useCdn: false })

export const PIECE_QUERY = `*[_type == "piece" && status in ["published","corrected"]] | order(publishedAt desc){
  _id, title, "slug": slug.current, dek, section, format, status, publishedAt, byline, correction, agencies, naics3, ogFigure,
  body[]{ ..., _type == "dataBlock" => { presentation, form, heading, label, value, valueFormat, sub, delta, date, a, b, aName, bName, figures, source, result } }
}`
