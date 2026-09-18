import { useParams, Navigate } from "react-router-dom"
import { Eyebrow, Heading, Text } from "@/components/primitives"
import { Band } from "@/components/site/Band"
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
      <Band className="border-b border-line py-10">
        <Eyebrow>Section</Eyebrow>
        <Heading level={1} className="mt-3">{copy.title}</Heading>
        <Text size="body-lg" tone="muted" className="mt-4 max-w-2xl">{copy.lede}</Text>
      </Band>
      <Band className="py-10">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {pieces.map((p) => <PieceCard key={p.slug} piece={p} />)}
        </div>
      </Band>
    </>
  )
}
