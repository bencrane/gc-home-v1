import type { APIRoute, GetStaticPaths } from "astro"
import { PIECES, bySlug } from "@/content/pieces"
import { renderOg } from "@/lib/og"

export const getStaticPaths: GetStaticPaths = () => PIECES.map((p) => ({ params: { slug: p.slug } }))

export const GET: APIRoute = async ({ params }) => {
  const piece = bySlug(params.slug!)
  if (!piece) return new Response("Not found", { status: 404 })
  const png = await renderOg(piece)
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } })
}
