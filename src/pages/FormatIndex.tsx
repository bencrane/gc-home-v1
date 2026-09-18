import { useParams, Navigate } from "react-router-dom"
import { Eyebrow, Heading, Text } from "@/components/primitives"
import { Band } from "@/components/site/Band"
import { PieceCard } from "@/components/editorial/PieceCard"
import { PIECES } from "@/content/pieces"
import { formatById } from "@/content/formats"

export default function FormatIndex() {
  const { format } = useParams()
  const f = format ? formatById(format) : undefined
  if (!f) return <Navigate to="/" replace />
  const pieces = PIECES.filter((p) => p.format === f.id)
  return (
    <>
      <Band className="border-b border-line py-10">
        <Eyebrow>Section</Eyebrow>
        <Heading level={1} className="mt-3">{f.name}</Heading>
        <Text size="body-lg" tone="muted" className="mt-4 max-w-[65ch]">{f.blurb}</Text>
      </Band>
      <Band className="py-10">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {pieces.map((p) => <PieceCard key={p.slug} piece={p} />)}
        </div>
      </Band>
    </>
  )
}
