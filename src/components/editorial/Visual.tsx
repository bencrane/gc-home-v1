import { useEffect, useRef } from "react"
import * as echarts from "echarts/core"
import type { Piece, LedgerSpec, ChartSpec, FiguresSpec } from "@/content/types"
import { ensureTheme } from "@/lib/echarts-theme"
import { money, count, hourly, dateShort } from "@/lib/format"
import { MonoLabel } from "@/components/primitives"
import { Art } from "./Art"
import { activeVariant } from "@/lib/variant"

const fmt = { money, count, hourly, date: (v: unknown) => dateShort(String(v)) } as const

/** The card visual: derived from the piece's first data block, never a stock image.
 *  figures → the lead figure large; ledger → top rows as a compact bar list; chart → small bars. */
export function Visual({ piece, size = "card" }: { piece: Piece; size?: "card" | "lead" | "strip" }) {
  const mode = piece.visual ?? activeVariant().cardVisual ?? "data"
  if (size === "card" && mode === "art") return <Art piece={piece} className="block h-full w-full" />
  const blocks = piece.body.filter((b): b is LedgerSpec | ChartSpec | FiguresSpec => b.kind === "ledger" || b.kind === "chart" || b.kind === "figures")
  const block = blocks[0]
  if (!block) return null
  // strip: the figures as an inline row under the dek (lead text column). Nothing if the piece has none.
  if (size === "strip") {
    const figs = blocks.find((b): b is FiguresSpec => b.kind === "figures")
    return figs ? <FigureStrip spec={figs} /> : null
  }
  // lead: one visual only — the first table or chart; figures live in the strip.
  if (size === "lead") {
    const main = blocks.find((b) => b.kind !== "figures") ?? block
    if (main.kind === "ledger") return <LedgerVisual spec={main} size="lead" />
    if (main.kind === "chart") return <ChartVisual spec={main} size="lead" />
    return <FigureVisual spec={main} size="lead" />
  }
  if (block.kind === "figures") return <FigureVisual spec={block} size={size} />
  if (block.kind === "ledger") return <LedgerVisual spec={block} size={size} />
  return <ChartVisual spec={block} size={size} />
}

function FigureStrip({ spec }: { spec: FiguresSpec }) {
  return (
    <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-line pt-5">
      {spec.figures.map((f) => (
        <div key={f.label} className="min-w-0">
          <dd className="figures-display text-h2 text-foreground">{f.value}</dd>
          <dt className="mt-1 font-mono text-mono-label uppercase text-foreground-subtle">{f.label}</dt>
        </div>
      ))}
    </dl>
  )
}

function FigureVisual({ spec, size }: { spec: FiguresSpec; size: "card" | "lead" }) {
  const [f, ...rest] = spec.figures
  return (
    <div className={size === "lead" ? "grid grid-cols-3 gap-4" : ""}>
      <div className="min-w-0">
        <p className="figures-display text-figure text-foreground">{f.value}</p>
        <MonoLabel className="mt-1 text-foreground-subtle">{f.label}</MonoLabel>
      </div>
      {size === "lead" && rest.map((r) => (
        <div key={r.label} className="min-w-0">
          <p className="figures-display text-figure text-foreground">{r.value}</p>
          <MonoLabel className="mt-1 text-foreground-subtle">{r.label}</MonoLabel>
        </div>
      ))}
    </div>
  )
}

function LedgerVisual({ spec, size }: { spec: LedgerSpec; size: "card" | "lead" }) {
  const rows = spec.data.rows.slice(0, size === "lead" ? 7 : 5)
  const f = fmt[spec.valueFormat] as (v: unknown) => string
  const max = Math.max(...rows.map((r) => Number(r[spec.value]) || 0))
  return (
    <figure>
      <MonoLabel className="text-copper-600">{spec.heading}</MonoLabel>
      <ol className="mt-4">
        {rows.map((r, i) => {
          const v = Number(r[spec.value]) || 0
          const w = max ? Math.max(1.5, (v / max) * 100) : 0
          return (
            <li key={i} className="py-1.5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="truncate text-body text-foreground">{String(r[spec.label] ?? "—")}</span>
                <span className="shrink-0 font-mono text-mono-data tabular-nums text-foreground">{f(r[spec.value])}</span>
              </div>
              <div className="mt-1 h-1.5 w-full bg-surface-muted"><div className={i === 0 ? "h-full bg-navy-900" : "h-full bg-navy-500"} style={{ width: `${w}%` }} /></div>
            </li>
          )
        })}
      </ol>
    </figure>
  )
}

function ChartVisual({ spec, size }: { spec: ChartSpec; size: "card" | "lead" }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    ensureTheme()
    const inst = echarts.init(ref.current, "gc")
    const rows = [...spec.data.rows.slice(0, size === "lead" ? 10 : 6)].reverse()
    inst.setOption({
      animation: false,
      grid: { left: 0, right: 8, top: 0, bottom: 0, containLabel: true },
      xAxis: { type: "value", show: false },
      yAxis: { type: "category", data: rows.map((r) => String(r[spec.category])), axisLabel: { width: size === "lead" ? 220 : 150, overflow: "truncate", fontFamily: "Inter Variable, ui-sans-serif, sans-serif", fontSize: 11, color: "#0f1a2e" }, axisLine: { show: false } },
      series: [{ type: "bar", data: rows.map((r) => Number(r[spec.series[0].column])), barMaxWidth: 10, itemStyle: { color: (p: { value: number }) => (p.value < 0 ? "#b91c1c" : "#1f4470") } }],
    })
    const ro = new ResizeObserver(() => inst.resize()); ro.observe(ref.current)
    return () => { ro.disconnect(); inst.dispose() }
  }, [spec, size])
  return (
    <div>
      <MonoLabel className="text-copper-600">{spec.heading}</MonoLabel>
      <div ref={ref} className="mt-2 w-full" style={{ height: size === "lead" ? 260 : 170 }} />
    </div>
  )
}
