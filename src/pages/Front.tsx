import { Link } from "react-router-dom"
import { Heading, Text } from "@/components/primitives"
import { Band } from "@/components/site/Band"
import { PieceCard } from "@/components/editorial/PieceCard"
import { PIECES, bySection } from "@/content/pieces"
import type { Piece } from "@/content/types"

function SectionHead({ title, to, blurb }: { title: string; to: string; blurb: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 border-b-2 border-navy-900 pb-4">
      <div>
        <Heading level={2}>{title}</Heading>
        <Text size="body-lg" tone="muted" className="mt-2 max-w-[60ch]">{blurb}</Text>
      </div>
      <Link to={to} className="shrink-0 text-mono-label font-mono uppercase text-copper-600 hover:text-navy-900">All {title.toLowerCase()} →</Link>
    </div>
  )
}

function River({ pieces, figureWells = 0 }: { pieces: Piece[]; figureWells?: number }) {
  if (pieces.length === 0) return null
  if (pieces.length < 2) return <div>{pieces.map((p) => <PieceCard key={p.slug} piece={p} variant="row" />)}</div>
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
      {pieces.map((p, i) => <PieceCard key={p.slug} piece={p} well={i < figureWells ? "figure" : "art"} />)}
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
      <Band className="front-band pt-4">
        <PieceCard piece={lead} variant="lead" />
      </Band>
      <Band className="pb-12 pt-12">
        <div className="mb-8 border-b-2 border-navy-900 pb-4"><Heading level={2}>Latest</Heading></div>
        <River pieces={latest} figureWells={3} />
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
