import { useParams, Navigate, Link } from "react-router-dom"
import { Eyebrow, Heading, Text, MonoLabel } from "@/components/primitives"
import { Band } from "@/components/site/Band"
import { Body } from "@/components/editorial/Body"
import { PieceCard } from "@/components/editorial/PieceCard"
import { bySlug, bySection } from "@/content/pieces"
import { dateLong } from "@/lib/format"

export default function PiecePage() {
  const { section, slug } = useParams()
  const piece = slug ? bySlug(slug) : undefined
  if (!piece || piece.section !== section) return <Navigate to="/" replace />
  const more = bySection(piece.section).filter((p) => p.slug !== piece.slug).slice(0, 4)
  return (
    <>
      <Band className="py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <Eyebrow><Link to={`/${piece.section}`} className="hover:text-navy-900">{piece.section}</Link> · {piece.formatName}</Eyebrow>
            <Heading level={1} className="mt-3 max-w-4xl">{piece.title}</Heading>
            <Text size="body-lg" tone="muted" className="mt-4 max-w-2xl">{piece.dek}</Text>
            <MonoLabel className="mt-6 border-b border-line pb-6 text-foreground-subtle">{piece.byline} · {dateLong(piece.publishedAt)}</MonoLabel>
            <div className="mt-8"><Body blocks={piece.body} /></div>
          </article>
          <aside className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
            <Eyebrow>More in {piece.section}</Eyebrow>
            <div className="mt-3">{more.map((p) => <PieceCard key={p.slug} piece={p} variant="row" />)}</div>
          </aside>
        </div>
      </Band>
    </>
  )
}
