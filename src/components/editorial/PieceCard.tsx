import type { Piece } from "@/content/types"
import { Heading, MonoLabel } from "@/components/primitives"
import { dateShort } from "@/lib/format"
import { Visual } from "./Visual"
import { Art } from "./Art"
import { FigureWell } from "./FigureWell"
import { cn } from "@/lib/cn"

type Props = { piece: Piece; variant?: "card" | "row" | "lead"; well?: "art" | "figure"; className?: string }

/** Card contract (docs/design/FRONT_BRIEF.md): art well 5:3, kicker, headline, two-line dek. Nothing else.
 *  row: hairline list entry for the secondaries column and small sections. lead: front-page lead. */
export function PieceCard({ piece, variant = "card", well = "art", className }: Props) {
  const href = `/${piece.section}/${piece.slug}`
  const meta = <MonoLabel className="text-copper-600"><a href={`/section/${piece.format}`} className="hover:text-navy-900">{piece.formatName}</a> · {dateShort(piece.publishedAt)}</MonoLabel>

  if (variant === "lead") {
    return (
      <article className={cn("border-b border-line border-t-2 border-t-navy-900 py-10", className)}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <MonoLabel className="text-copper-600"><a href={`/section/${piece.format}`} className="hover:text-navy-900">{piece.formatName}</a> · {dateShort(piece.publishedAt)} · <span className="text-foreground-subtle">{piece.byline}</span></MonoLabel>
            <a href={href} className="group mt-6 block"><Heading level={1} className="text-display transition-colors group-hover:text-navy-600">{piece.title}</Heading></a>
            <p className="mt-8 max-w-[60ch] text-dek-lg text-foreground-muted">{piece.dek}</p>
          </div>
          <a href={href} className="block lg:col-span-5"><Visual piece={piece} size="lead" /></a>
        </div>
      </article>
    )
  }

  if (variant === "row") {
    return (
      <article className={cn("border-b border-line py-6 first:pt-0", className)}>
        {meta}
        <a href={href} className="group mt-3 block"><Heading level={2} className="text-h3 transition-colors group-hover:text-navy-600">{piece.title}</Heading></a>
        <p className="mt-3 line-clamp-3 text-body-lg text-foreground-muted">{piece.dek}</p>
      </article>
    )
  }

  return (
    <article className={cn("flex flex-col border border-line bg-surface", className)}>
      <a href={href} aria-hidden tabIndex={-1} className="block aspect-[5/3] overflow-hidden border-b border-line">{well === "figure" ? <FigureWell piece={piece} /> : <Art piece={piece} className="block h-full w-full" />}</a>
      <div className="flex flex-1 flex-col p-6">
        {meta}
        <a href={href} className="group mt-3 block"><Heading level={3} className="transition-colors group-hover:text-navy-600">{piece.title}</Heading></a>
        <p className="mt-3 line-clamp-3 text-body-lg text-foreground-muted">{piece.dek}</p>
      </div>
    </article>
  )
}
