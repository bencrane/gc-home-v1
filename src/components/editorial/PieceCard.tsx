import { Link } from "react-router-dom"
import type { Piece } from "@/content/types"
import { Heading, MonoLabel } from "@/components/primitives"
import { dateShort } from "@/lib/format"

export function PieceCard({ piece, level = 3, lead = false }: { piece: Piece; level?: 2 | 3 | 4; lead?: boolean }) {
  return (
    <article className={lead ? "" : "border-t border-line pt-5"}>
      <MonoLabel className="text-copper-600">
        {piece.formatName} · {dateShort(piece.publishedAt)}
      </MonoLabel>
      <Link to={`/${piece.section}/${piece.slug}`} className="group mt-3 block">
        <Heading level={level} display={lead} className="transition-colors group-hover:text-navy-600">{piece.title}</Heading>
      </Link>
      <p className={"mt-3 text-foreground-muted " + (lead ? "max-w-2xl text-body-lg" : "text-body")}>{piece.dek}</p>
    </article>
  )
}
