import { href } from "@/lib/url"
import { Eyebrow, Heading, MonoLabel } from "@/components/primitives"
import { Band } from "@/components/site/Band"
import { Body } from "@/components/editorial/Body"
import { PieceCard } from "@/components/editorial/PieceCard"
import { bySlug, bySection } from "@/content/pieces"
import { dateLong } from "@/lib/format"

/** Piece: one article column. Prose at the reading measure, data blocks to the article width. Related pieces below. */
export default function PiecePage({ slug }: { slug: string }) {
  const piece = bySlug(slug)!
  const more = bySection(piece.section).filter((p) => p.slug !== piece.slug).slice(0, 4)
  return (
    <>
      <Band as="article" className="py-10">
        <div className="max-w-[64rem]">
          <Eyebrow><a href={href(`/${piece.section}`)} className="hover:text-navy-900">{piece.section}</a> · {piece.formatName}</Eyebrow>
          <Heading level={1} className="mt-3">{piece.title}</Heading>
          <p className="mt-5 max-w-[48ch] text-dek text-foreground-muted">{piece.dek}</p>
          <MonoLabel className="mt-6 border-b border-line pb-6 text-foreground-subtle">{piece.byline} · {dateLong(piece.publishedAt)}</MonoLabel>
          <div className="mt-8"><Body blocks={piece.body} /></div>
        </div>
      </Band>
      {more.length > 1 && (
        <Band className="border-t border-line py-10">
          <div className="mb-8 flex flex-col gap-3 border-b-2 border-navy-900 pb-4 md:flex-row md:items-end md:justify-between">
            <Heading level={2}>More in {piece.section}</Heading>
            <a href={href(`/${piece.section}`)} className="text-mono-label font-mono uppercase text-copper-600 hover:text-navy-900">All {piece.section} →</a>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">{more.map((p) => <PieceCard key={p.slug} piece={p} />)}</div>
        </Band>
      )}
    </>
  )
}
