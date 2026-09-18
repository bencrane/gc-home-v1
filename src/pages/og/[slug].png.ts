import type { APIRoute, GetStaticPaths } from "astro"
import { getPieces } from "@/lib/content"
import { renderOg } from "@/lib/og"

export const getStaticPaths: GetStaticPaths = async () => (await getPieces()).map((p) => ({ params: { slug: p.slug }, props: { piece: p } }))

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg(props.piece)
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } })
}
