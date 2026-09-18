import type { Piece, FiguresSpec, LedgerSpec, ChartSpec } from "@/content/types"
import { money, count, hourly } from "@/lib/format"

const fmt = { money, count, hourly, date: (v: unknown) => String(v) } as const

/** The card well: the piece's key figure, set large, on a field by section.
 *  Markets → ink field, paper figure. Briefings → paper field, ink figure. Copper rule under the figure. */
export function keyFigure(piece: Piece): { value: string; label: string } | null {
  const figs = piece.body.find((b): b is FiguresSpec => b.kind === "figures")
  if (figs && figs.figures[0]) return { value: figs.figures[0].value, label: figs.figures[0].label }
  const led = piece.body.find((b): b is LedgerSpec => b.kind === "ledger")
  if (led && led.data.rows[0]) {
    const f = fmt[led.valueFormat] as (v: unknown) => string
    return { value: f(led.data.rows[0][led.value]), label: String(led.data.rows[0][led.label] ?? led.heading) }
  }
  const ch = piece.body.find((b): b is ChartSpec => b.kind === "chart")
  if (ch && ch.data.rows[0]) return { value: money(Number(ch.data.rows[0][ch.series[0].column])), label: String(ch.data.rows[0][ch.category]) }
  return null
}

export function FigureWell({ piece, className }: { piece: Piece; className?: string }) {
  const k = keyFigure(piece)
  const ink = piece.section === "markets"
  return (
    <div className={"flex h-full w-full flex-col justify-end p-6 " + (ink ? "bg-navy-900 text-background" : "bg-background text-foreground") + (className ? " " + className : "")} aria-hidden>
      {k && (
        <>
          <p className="figures-display truncate text-[clamp(2rem,2.6vw,2.75rem)] leading-none">{k.value}</p>
          <div className={"mt-3 h-px w-10 " + (ink ? "bg-copper-300" : "bg-copper-500")} />
          <p className={"mt-3 truncate font-mono text-mono-label uppercase " + (ink ? "text-slate-300" : "text-foreground-subtle")}>{k.label}</p>
        </>
      )}
    </div>
  )
}
