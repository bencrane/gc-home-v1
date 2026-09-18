import { useParams, Navigate, Link } from "react-router-dom"
import { Section, Eyebrow, Heading, Text, MonoLabel } from "@/components/primitives"
import { Body } from "@/components/editorial/Body"
import { PieceCard } from "@/components/editorial/PieceCard"
import { bySlug, bySection } from "@/content/pieces"
import { dateLong } from "@/lib/format"

export default function PiecePage() {
  const { section, slug } = useParams()
  const piece = slug ? bySlug(slug) : undefined
  if (!piece || piece.section !== section) return <Navigate to="/" replace />
  const more = bySection(piece.section).filter((p) => p.slug !== piece.slug).slice(0, 3)
  return (
    <>
      <Section spacing="sm" divide containerWidth="content">
        <Eyebrow>
          <Link to={`/${piece.section}`} className="hover:text-navy-900">{piece.section}</Link> · {piece.formatName}
        </Eyebrow>
        <Heading level={1} className="mt-4 max-w-4xl">{piece.title}</Heading>
        <Text size="body-lg" tone="muted" className="mt-6 max-w-2xl">{piece.dek}</Text>
        <MonoLabel className="mt-8 text-foreground-subtle">{piece.byline} · {dateLong(piece.publishedAt)}</MonoLabel>
      </Section>
      <Section spacing="sm" containerWidth="content">
        <Body blocks={piece.body} />
      </Section>
      {more.length > 0 && (
        <Section spacing="sm" tone="slate" containerWidth="content">
          <Eyebrow>More in {piece.section}</Eyebrow>
          <div className="mt-4 space-y-5">{more.map((p) => <PieceCard key={p.slug} piece={p} level={4} />)}</div>
        </Section>
      )}
    </>
  )
}
