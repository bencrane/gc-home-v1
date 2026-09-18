import { useEffect, useRef } from "react"
import * as echarts from "echarts/core"
import { BarChart } from "echarts/charts"
import { GridComponent, TooltipComponent } from "echarts/components"
import { CanvasRenderer } from "echarts/renderers"
import type { ChartSpec } from "@/content/types"
import { ensureTheme } from "@/lib/echarts-theme"
import { money, dateShort } from "@/lib/format"
import { MonoLabel } from "@/components/primitives"

echarts.use([BarChart, GridComponent, TooltipComponent, CanvasRenderer])

/** Horizontal bar chart for ranked movements. One series per spec entry, chart-N palette, hairline grid. */
export function Chart({ spec }: { spec: ChartSpec }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    ensureTheme()
    const inst = echarts.init(ref.current, "gc", { renderer: "canvas" })
    const rows = [...spec.data.rows].reverse()
    inst.setOption({
      animationDuration: 300,
      animationEasing: "cubicOut",
      tooltip: { trigger: "axis", axisPointer: { type: "shadow", shadowStyle: { color: "rgba(15,26,46,0.04)" } }, valueFormatter: (v: number) => money(v) },
      grid: { left: 0, right: 16, top: 4, bottom: 0, containLabel: true },
      xAxis: { type: "value", axisLabel: { formatter: (v: number) => money(v) } },
      yAxis: { type: "category", data: rows.map((r) => String(r[spec.category])), axisLabel: { width: 300, overflow: "truncate", fontFamily: "Inter Variable, ui-sans-serif, sans-serif", fontSize: 12, color: "#0f1a2e" } },
      series: spec.series.map((s) => ({ name: s.name, type: "bar", data: rows.map((r) => Number(r[s.column])), barMaxWidth: 18 })),
    })
    const ro = new ResizeObserver(() => inst.resize())
    ro.observe(ref.current)
    return () => { ro.disconnect(); inst.dispose() }
  }, [spec])
  return (
    <figure className="my-10 first:mt-0">
      <MonoLabel as="span" className="text-copper-600">{spec.heading}</MonoLabel>
      <div ref={ref} className="mt-3 h-[420px] w-full border-t border-navy-600 pt-2" />
      <figcaption className="mt-3 text-mono-provenance font-mono text-foreground-subtle">{spec.source} · as of {dateShort(spec.data.takenAt)}</figcaption>
    </figure>
  )
}
