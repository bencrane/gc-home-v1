import { Link } from "react-router-dom"
import type { Piece } from "@/content/types"
import { Heading, MonoLabel } from "@/components/primitives"
import { dateShort } from "@/lib/format"
import { Visual } from "./Visual"
import { Art } from "./Art"
import { cn } from "@/lib/cn"

type Props = { piece: Piece; variant?: "card" | "row" | "lead"; className?: string }

/** Card contract (docs/design/FRONT_BRIEF.md): art well 5:3, kicker, headline, two-line dek. Nothing else.
 *  row: hairline list entry for the secondaries column and small sections. lead: front-page lead. */
export function PieceCard({ piece, variant = "card", className }: Props) {
  const href = `/${piece.section}/${piece.slug}`
  const meta = <MonoLabel className="text-copper-600"><Link to={`/section/${piece.format}`} className="hover:text-navy-900">{piece.formatName}</Link> · {dateShort(piece.publishedAt)}</MonoLabel>

  if (variant === "lead") {
    return (
      <article className={cn("border-t-2 border-navy-900 pt-5", className)}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {meta}
            <Link to={href} className="group mt-3 block"><Heading level={1} className="text-display transition-colors group-hover:text-navy-600">{piece.title}</Heading></Link>
            <p className="mt-5 max-w-[60ch] text-body-lg text-foreground-muted">{piece.dek}</p>
            <Visual piece={piece} size="strip" />
            <MonoLabel className="mt-6 text-foreground-subtle">{piece.byline}</MonoLabel>
          </div>
          <Link to={href} className="block lg:col-span-5"><Visual piece={piece} size="lead" /></Link>
        </div>
      </article>
    )
  }

  if (variant === "row") {
    return (
      <article className={cn("border-b border-line py-4 first:pt-0", className)}>
        {meta}
        <Link to={href} className="group mt-1.5 block"><Heading level={2} className="text-h4 transition-colors group-hover:text-navy-600">{piece.title}</Heading></Link>
        <p className="mt-1.5 line-clamp-2 text-body-sm text-foreground-muted">{piece.dek}</p>
      </article>
    )
  }

  return (
    <article className={cn("flex flex-col border border-line bg-surface", className)}>
      <Link to={href} aria-hidden tabIndex={-1} className="block aspect-[5/3] overflow-hidden border-b border-line"><Art piece={piece} className="block h-full w-full" /></Link>
      <div className="flex flex-1 flex-col p-4">
        {meta}
        <Link to={href} className="group mt-2 block"><Heading level={3} className="text-h4 transition-colors group-hover:text-navy-600">{piece.title}</Heading></Link>
        <p className="mt-2 line-clamp-2 text-body-sm text-foreground-muted">{piece.dek}</p>
      </div>
    </article>
  )
}
