import { useParams, Navigate } from "react-router-dom"
import { Section, Eyebrow, Heading, Text } from "@/components/primitives"
import { PieceCard } from "@/components/editorial/PieceCard"
import { bySection } from "@/content/pieces"

const COPY = {
  markets: { title: "Markets", lede: "Obligations by agency, flows between industries, contracts reaching expiration, and the demand primes place on subcontractors. Read quarterly and monthly from the federal record." },
  briefings: { title: "Briefings", lede: "The month's largest awards, the wage floors that set service-contract bids, and the primes that shape the market." },
} as const

export default function SectionIndex() {
  const { section } = useParams()
  if (section !== "markets" && section !== "briefings") return <Navigate to="/" replace />
  const pieces = bySection(section)
  const copy = COPY[section]
  return (
    <>
      <Section spacing="sm" divide>
        <Eyebrow>Section</Eyebrow>
        <Heading level={1} className="mt-4">{copy.title}</Heading>
        <Text size="body-lg" tone="muted" className="mt-6 max-w-2xl">{copy.lede}</Text>
      </Section>
      <Section spacing="sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pieces.map((p) => <PieceCard key={p.slug} piece={p} />)}
        </div>
      </Section>
    </>
  )
}
