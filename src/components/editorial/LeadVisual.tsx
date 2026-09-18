import type { Piece, ChartSpec, LedgerSpec, FiguresSpec } from "@/content/types"
import { Chart } from "@/components/charts/Chart"
import { MonoLabel } from "@/components/primitives"
import { formatValue } from "@/lib/format"

/** The front-page lead's visual: the piece's chart (server-rendered), or its first ledger as a compact list. */
export function LeadVisual({ piece }: { piece: Piece }) {
  const chart = piece.body.find((b): b is ChartSpec => b.kind === "chart")
  if (chart) return (
    <div>
      <MonoLabel className="text-copper-600">{chart.heading}</MonoLabel>
      <div className="mt-3 md:hidden"><Chart spec={chart} rows={6} width={340} bare /></div>
      <div className="mt-3 hidden md:block"><Chart spec={chart} rows={8} width={560} bare /></div>
    </div>
  )
  const led = piece.body.find((b): b is LedgerSpec => b.kind === "ledger")
  if (led) return (
    <div>
      <MonoLabel className="text-copper-600">{led.heading}</MonoLabel>
      <ol className="mt-3">
        {led.data.rows.slice(0, 8).map((r, i) => (
          <li key={i} className="flex items-baseline justify-between gap-4 border-b border-line py-2">
            <span className="truncate text-body text-foreground">{String(r[led.label] ?? "—")}</span>
            <span className="shrink-0 font-mono text-mono-data tabular-nums text-foreground">{formatValue(led.valueFormat, r[led.value])}</span>
          </li>
        ))}
      </ol>
    </div>
  )
  const figs = piece.body.find((b): b is FiguresSpec => b.kind === "figures")
  if (figs) return (
    <dl className="grid grid-cols-3 gap-6">
      {figs.figures.map((f) => (
        <div key={f.label}><dd className="figures-display text-figure text-foreground">{f.value}</dd><MonoLabel className="mt-1 text-foreground-subtle">{f.label}</MonoLabel></div>
      ))}
    </dl>
  )
  return null
}
