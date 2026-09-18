import type { APIRoute } from "astro"
import { renderOg } from "@/lib/og"
export const GET: APIRoute = async () => {
  const png = await renderOg({ slug: "default", title: "Federal procurement, read from the record.", dek: "", section: "markets", format: "record", formatName: "Government Contracted", publishedAt: "", byline: "", body: [] })
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } })
}
