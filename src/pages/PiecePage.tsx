import { useParams, Navigate, Link } from "react-router-dom"
import { Eyebrow, Heading, Text, MonoLabel } from "@/components/primitives"
import { Band } from "@/components/site/Band"
import { Body } from "@/components/editorial/Body"
import { PieceCard } from "@/components/editorial/PieceCard"
import { bySlug, bySection } from "@/content/pieces"
import { dateLong } from "@/lib/format"

/** Piece: one article column. Prose at the reading measure, data blocks to the article width. Related pieces below. */
export default function PiecePage() {
  const { section, slug } = useParams()
  const piece = slug ? bySlug(slug) : undefined
  if (!piece || piece.section !== section) return <Navigate to="/" replace />
  const more = bySection(piece.section).filter((p) => p.slug !== piece.slug).slice(0, 4)
  return (
    <>
      <Band as="article" className="py-10">
        <div className="max-w-[64rem]">
          <Eyebrow><Link to={`/${piece.section}`} className="hover:text-navy-900">{piece.section}</Link> · {piece.formatName}</Eyebrow>
          <Heading level={1} className="mt-3">{piece.title}</Heading>
          <Text size="body-lg" tone="muted" className="mt-4 max-w-[60ch]">{piece.dek}</Text>
          <MonoLabel className="mt-6 border-b border-line pb-6 text-foreground-subtle">{piece.byline} · {dateLong(piece.publishedAt)}</MonoLabel>
          <div className="mt-8"><Body blocks={piece.body} /></div>
        </div>
      </Band>
      {more.length > 1 && (
        <Band className="border-t border-line py-10">
          <div className="mb-6 flex items-end justify-between border-b-2 border-navy-900 pb-3">
            <Heading level={2} className="text-h3">More in {piece.section}</Heading>
            <Link to={`/${piece.section}`} className="text-eyebrow font-sans uppercase text-copper-600 hover:text-navy-900">All {piece.section} →</Link>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">{more.map((p) => <PieceCard key={p.slug} piece={p} />)}</div>
        </Band>
      )}
    </>
  )
}
