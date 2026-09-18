import { Link } from "react-router-dom"
import { Section, Eyebrow, Heading, Text, Grid, Cols } from "@/components/primitives"
import { PieceCard } from "@/components/editorial/PieceCard"
import { PIECES, bySection } from "@/content/pieces"

/** Front page: a lead, then the two sections as ledgers of recent pieces. */
export default function Front() {
  const [lead, ...rest] = PIECES
  const markets = bySection("markets").filter((p) => p !== lead).slice(0, 4)
  const briefings = bySection("briefings").filter((p) => p !== lead).slice(0, 4)
  return (
    <>
      <Section spacing="lg" divide>
        <Grid cols={12} align="start">
          <Cols spanLg={7}>
            <PieceCard piece={lead} lead level={2} />
          </Cols>
          <Cols spanLg={5}>
            <Eyebrow>Latest</Eyebrow>
            <div className="mt-4 space-y-5">
              {rest.slice(0, 3).map((p) => <PieceCard key={p.slug} piece={p} level={4} />)}
            </div>
          </Cols>
        </Grid>
      </Section>

      <Section divide>
        <Grid cols={12} align="start">
          <Cols spanLg={3}>
            <Eyebrow>Markets</Eyebrow>
            <Heading level={2} className="mt-4">Where federal demand is moving.</Heading>
            <Text tone="muted" className="mt-6">Obligations, flows, expirations, and sub-award demand, read from the public record.</Text>
            <Link to="/markets" className="mt-6 inline-block text-eyebrow font-sans uppercase text-copper-600 hover:text-navy-900">All markets →</Link>
          </Cols>
          <Cols spanLg={8} className="lg:col-start-5">
            <div className="space-y-5">{markets.map((p) => <PieceCard key={p.slug} piece={p} />)}</div>
          </Cols>
        </Grid>
      </Section>

      <Section>
        <Grid cols={12} align="start">
          <Cols spanLg={3}>
            <Eyebrow>Briefings</Eyebrow>
            <Heading level={2} className="mt-4">The primes, the awards, the rates.</Heading>
            <Text tone="muted" className="mt-6">Who won, what the wage floor says, and what it means for the companies that perform the work.</Text>
            <Link to="/briefings" className="mt-6 inline-block text-eyebrow font-sans uppercase text-copper-600 hover:text-navy-900">All briefings →</Link>
          </Cols>
          <Cols spanLg={8} className="lg:col-start-5">
            <div className="space-y-5">{briefings.map((p) => <PieceCard key={p.slug} piece={p} />)}</div>
          </Cols>
        </Grid>
      </Section>
    </>
  )
}
