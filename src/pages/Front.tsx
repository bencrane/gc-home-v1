import { Link } from "react-router-dom"
import { Section, Eyebrow, Heading, Text } from "@/components/primitives"
import { PieceCard } from "@/components/editorial/PieceCard"
import { PIECES, bySection } from "@/content/pieces"
import type { Piece } from "@/content/types"

function SectionHead({ title, to, blurb }: { title: string; to: string; blurb: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-6 border-b-2 border-navy-600 pb-3">
      <div>
        <Heading level={2} className="text-h3">{title}</Heading>
        <Text size="body-sm" tone="muted" className="mt-1">{blurb}</Text>
      </div>
      <Link to={to} className="shrink-0 text-eyebrow font-sans uppercase text-copper-600 hover:text-navy-900">All {title.toLowerCase()} →</Link>
    </div>
  )
}

/** River: cards four-up at xl; fewer than two pieces renders as rows so no card stands alone. */
function River({ pieces }: { pieces: Piece[] }) {
  if (pieces.length === 0) return null
  if (pieces.length < 2) return <div>{pieces.map((p) => <PieceCard key={p.slug} piece={p} variant="row" />)}</div>
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {pieces.map((p) => <PieceCard key={p.slug} piece={p} />)}
    </div>
  )
}

/** Front page per docs/design/FRONT_BRIEF.md. Lead → secondaries → rivers by section. Every piece once. */
export default function Front() {
  const [lead, ...rest] = PIECES
  const secondaries = rest.slice(0, 4)
  const used = new Set([lead, ...secondaries].map((p) => p.slug))
  const markets = bySection("markets").filter((p) => !used.has(p.slug)).slice(0, 8)
  const briefings = bySection("briefings").filter((p) => !used.has(p.slug)).slice(0, 8)

  return (
    <>
      <Section spacing="sm" divide className="front-band">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8"><PieceCard piece={lead} variant="lead" /></div>
          <aside className="border-t-2 border-navy-600 pt-4 lg:col-span-4 lg:border-t-0 lg:border-l lg:border-line lg:pl-8 lg:pt-0">
            <Eyebrow>Latest</Eyebrow>
            <div className="mt-3">{secondaries.map((p) => <PieceCard key={p.slug} piece={p} variant="row" />)}</div>
          </aside>
        </div>
      </Section>

      {markets.length > 0 && (
        <Section spacing="sm" divide>
          <SectionHead title="Markets" to="/markets" blurb="Obligations, flows, expirations, and sub-award demand, read from the public record." />
          <River pieces={markets} />
        </Section>
      )}

      {briefings.length > 0 && (
        <Section spacing="sm">
          <SectionHead title="Briefings" to="/briefings" blurb="The month's largest awards, the wage floors behind service bids, and the primes that shape the market." />
          <River pieces={briefings} />
        </Section>
      )}
    </>
  )
}
