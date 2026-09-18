import { Link } from "react-router-dom"
import { Eyebrow, Heading, Text } from "@/components/primitives"
import { Band } from "@/components/site/Band"
import { PieceCard } from "@/components/editorial/PieceCard"
import { PIECES, bySection } from "@/content/pieces"
import type { Piece } from "@/content/types"

function SectionHead({ title, to, blurb }: { title: string; to: string; blurb: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-6 border-b-2 border-navy-900 pb-3">
      <div>
        <Heading level={2}>{title}</Heading>
        <Text size="body-sm" tone="muted" className="mt-1 max-w-[65ch]">{blurb}</Text>
      </div>
      <Link to={to} className="shrink-0 text-eyebrow font-sans uppercase text-copper-600 hover:text-navy-900">All {title.toLowerCase()} →</Link>
    </div>
  )
}

function River({ pieces }: { pieces: Piece[] }) {
  if (pieces.length === 0) return null
  if (pieces.length < 2) return <div>{pieces.map((p) => <PieceCard key={p.slug} piece={p} variant="row" />)}</div>
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
      {pieces.map((p) => <PieceCard key={p.slug} piece={p} />)}
    </div>
  )
}

/** Front page per docs/design/FRONT_BRIEF.md. Lead → secondaries → rivers by section. Every piece once. */
export default function Front() {
  const [lead, ...rest] = PIECES
  const latest = rest.slice(0, 4)
  const used = new Set([lead, ...latest].map((p) => p.slug))
  const markets = bySection("markets").filter((p) => !used.has(p.slug)).slice(0, 8)
  const briefings = bySection("briefings").filter((p) => !used.has(p.slug)).slice(0, 8)

  return (
    <>
      <Band className="front-band pb-16 pt-10">
        <PieceCard piece={lead} variant="lead" />
      </Band>
      <Band className="pb-12">
        <div className="mb-6 border-b-2 border-navy-900 pb-3"><Eyebrow>Latest</Eyebrow></div>
        <River pieces={latest} />
      </Band>
      {markets.length > 0 && (
        <Band className="py-10">
          <SectionHead title="Markets" to="/markets" blurb="Obligations, flows, expirations, and sub-award demand, read from the public record." />
          <River pieces={markets} />
        </Band>
      )}
      {briefings.length > 0 && (
        <Band className="py-10">
          <SectionHead title="Briefings" to="/briefings" blurb="The month's largest awards, the wage floors behind service bids, and the primes that shape the market." />
          <River pieces={briefings} />
        </Band>
      )}
    </>
  )
}
