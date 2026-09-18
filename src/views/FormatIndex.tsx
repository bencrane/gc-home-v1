import { Eyebrow, Heading, Text } from "@/components/primitives"
import { Band } from "@/components/site/Band"
import { PieceCard } from "@/components/editorial/PieceCard"
import type { Piece } from "@/content/types"
import { formatById } from "@/content/formats"

export default function FormatIndex({ format, pieces }: { format: string; pieces: Piece[] }) {
  const f = formatById(format)!
  return (
    <>
      <Band className="border-b border-line py-10">
        <Eyebrow>Section</Eyebrow>
        <Heading level={1} className="mt-3">{f.name}</Heading>
        <Text size="body-lg" tone="muted" className="mt-4 max-w-[60ch] text-dek">{f.blurb}</Text>
      </Band>
      <Band className="py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {pieces.map((p) => <PieceCard key={p.slug} piece={p} />)}
        </div>
      </Band>
    </>
  )
}
