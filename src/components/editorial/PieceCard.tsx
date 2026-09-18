import { Link } from "react-router-dom"
import type { Piece } from "@/content/types"
import { Heading, MonoLabel } from "@/components/primitives"
import { dateShort } from "@/lib/format"
import { Visual } from "./Visual"
import { cn } from "@/lib/cn"

type Props = { piece: Piece; variant?: "plate" | "row" | "lead"; className?: string }

/** Three shapes. plate: a bordered card with the visual on top (grids). row: hairline list entry
 *  with a small visual at right (section ledgers). lead: the front-page lead with the full visual. */
export function PieceCard({ piece, variant = "plate", className }: Props) {
  const href = `/${piece.section}/${piece.slug}`
  const meta = <MonoLabel className="text-copper-600">{piece.formatName} · {dateShort(piece.publishedAt)}</MonoLabel>

  if (variant === "lead") {
    return (
      <article className={cn("grid grid-cols-1 gap-8 lg:grid-cols-12", className)}>
        <div className="lg:col-span-6">
          {meta}
          <Link to={href} className="group mt-3 block">
            <Heading level={1} className="transition-colors group-hover:text-navy-600">{piece.title}</Heading>
          </Link>
          <p className="mt-4 max-w-xl text-body-lg text-foreground-muted">{piece.dek}</p>
          <MonoLabel className="mt-5 text-foreground-subtle">{piece.byline}</MonoLabel>
        </div>
        <Link to={href} className="border-t-2 border-navy-600 pt-4 lg:col-span-6"><Visual piece={piece} size="lead" /></Link>
      </article>
    )
  }

  if (variant === "row") {
    return (
      <article className={cn("grid grid-cols-1 gap-6 border-t border-line py-5 sm:grid-cols-[1fr_200px]", className)}>
        <div>
          {meta}
          <Link to={href} className="group mt-2 block"><Heading level={3} className="transition-colors group-hover:text-navy-600">{piece.title}</Heading></Link>
          <p className="mt-2 text-body-sm text-foreground-muted">{piece.dek}</p>
        </div>
        <Link to={href} className="hidden h-40 overflow-hidden sm:block"><Visual piece={piece} /></Link>
      </article>
    )
  }

  return (
    <article className={cn("flex flex-col border border-line border-t-2 border-t-navy-600 bg-surface", className)}>
      <Link to={href} className="block h-56 overflow-hidden border-b border-line p-4"><Visual piece={piece} /></Link>
      <div className="flex flex-1 flex-col p-4">
        {meta}
        <Link to={href} className="group mt-2 block"><Heading level={4} className="transition-colors group-hover:text-navy-600">{piece.title}</Heading></Link>
        <p className="mt-2 text-body-sm text-foreground-muted">{piece.dek}</p>
      </div>
    </article>
  )
}
