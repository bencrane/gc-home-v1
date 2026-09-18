import { Link } from "react-router-dom"
import { Section, Eyebrow, Heading, Text } from "@/components/primitives"
import { PieceCard } from "@/components/editorial/PieceCard"
import { PIECES, bySection } from "@/content/pieces"

function SectionHead({ title, to, blurb }: { title: string; to: string; blurb: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-6 border-b-2 border-navy-600 pb-3">
      <div>
        <Heading level={2} as="h2" className="text-h3">{title}</Heading>
        <Text size="body-sm" tone="muted" className="mt-1">{blurb}</Text>
      </div>
      <Link to={to} className="shrink-0 text-eyebrow font-sans uppercase text-copper-600 hover:text-navy-900">All {title.toLowerCase()} →</Link>
    </div>
  )
}

/** Front page: lead with its full visual, then a card grid per section. Every piece appears once. */
export default function Front() {
  const [lead, ...rest] = PIECES
  const markets = bySection("markets").filter((p) => p !== lead)
  const briefings = bySection("briefings").filter((p) => p !== lead)
  const latest = rest.slice(0, 2)
  const marketsGrid = markets.filter((p) => !latest.includes(p))
  const briefingsGrid = briefings.filter((p) => !latest.includes(p))

  return (
    <>
      <Section spacing="sm" divide className="front-band">
        <PieceCard piece={lead} variant="lead" />
      </Section>

      <Section spacing="sm" divide className="front-band">
        <Eyebrow>Latest</Eyebrow>
        <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-2">
          {latest.map((p) => <PieceCard key={p.slug} piece={p} />)}
        </div>
      </Section>

      <Section spacing="sm" divide>
        <SectionHead title="Markets" to="/markets" blurb="Obligations, flows, expirations, and sub-award demand, read from the public record." />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {marketsGrid.map((p) => <PieceCard key={p.slug} piece={p} />)}
        </div>
      </Section>

      <Section spacing="sm">
        <SectionHead title="Briefings" to="/briefings" blurb="The month's largest awards, the wage floors behind service bids, and the primes that shape the market." />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {briefingsGrid.map((p) => <PieceCard key={p.slug} piece={p} />)}
        </div>
      </Section>
    </>
  )
}
