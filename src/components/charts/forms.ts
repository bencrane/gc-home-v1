import * as Plot from "@observablehq/plot"
import type { ChartSpec } from "@/content/types"
import { formatValue } from "@/lib/format"
import { renderPlot, INK, NAVY, COPPER, LINE, SUBTLE, MONO, BASE_STYLE, ROW } from "@/lib/plot"

const axisText = { fontSize: 11, fontFamily: MONO, fill: SUBTLE } as const
const rowLabel = { fontSize: 15, fontFamily: BASE_STYLE.fontFamily, fill: INK } as const

function trunc(s: string, n = 40) { return s.length > n ? s.slice(0, n - 1) + "…" : s }

/** Ranked horizontal bar — magnitude. */
function ranked(spec: Extract<ChartSpec, { form: "ranked" }>, width: number, rows: number): string {
  const data = spec.data.rows.slice(0, rows).map((r) => ({ label: trunc(String(r[spec.label] ?? "—")), value: Number(r[spec.value]) || 0 }))
  return renderPlot({
    width, height: data.length * ROW + 36, marginLeft: 0, marginRight: 72, marginTop: 4, marginBottom: 28,
    style: BASE_STYLE,
    y: { domain: data.map((d) => d.label), padding: 0.35, axis: null },
    x: { grid: true, ticks: 3, tickFormat: (v: number) => formatValue(spec.valueFormat, v), tickSize: 0, label: null },
    marks: [
      Plot.gridX({ stroke: LINE, strokeOpacity: 1 }),
      Plot.barX(data, { y: "label", x: "value", fill: NAVY, insetTop: 22, insetBottom: 4 }),
      Plot.text(data, { y: "label", text: "label", frameAnchor: "left", dy: -12, textAnchor: "start", ...rowLabel }),
      Plot.text(data, { y: "label", x: "value", text: (d) => formatValue(spec.valueFormat, d.value), dx: 6, textAnchor: "start", fontFamily: MONO, fontSize: 12, fill: INK, fontVariant: "tabular-nums" }),
      Plot.axisX({ ...axisText, tickSize: 0, label: null }),
    ],
  })
}

/** Diverging horizontal bar — change on prior period. */
function change(spec: Extract<ChartSpec, { form: "change" }>, width: number, rows: number): string {
  const data = spec.data.rows.slice(0, rows).map((r) => ({ label: trunc(String(r[spec.label] ?? "—")), value: Number(r[spec.value]) || 0 }))
  const m = Math.max(...data.map((d) => Math.abs(d.value)))
  return renderPlot({
    width, height: data.length * ROW + 36, marginLeft: 0, marginRight: 72, marginTop: 4, marginBottom: 28,
    style: BASE_STYLE,
    y: { domain: data.map((d) => d.label), padding: 0.35, axis: null },
    x: { grid: true, ticks: 3, domain: [-m, m], tickFormat: (v: number) => formatValue(spec.valueFormat, v), tickSize: 0, label: null },
    marks: [
      Plot.gridX({ stroke: LINE }),
      Plot.ruleX([0], { stroke: INK, strokeWidth: 1 }),
      Plot.barX(data, { y: "label", x: "value", fill: (d) => (d.value < 0 ? COPPER : NAVY), insetTop: 22, insetBottom: 4 }),
      Plot.text(data, { y: "label", text: "label", frameAnchor: "left", dy: -12, textAnchor: "start", ...rowLabel }),
      Plot.text(data.filter((d) => d.value >= 0), { y: "label", x: "value", text: (d) => formatValue(spec.valueFormat, d.value), dx: 6, textAnchor: "start", fontFamily: MONO, fontSize: 12, fill: INK }),
      Plot.text(data.filter((d) => d.value < 0), { y: "label", x: "value", text: (d) => formatValue(spec.valueFormat, d.value), dx: -6, textAnchor: "end", fontFamily: MONO, fontSize: 12, fill: INK }),
      Plot.axisX({ ...axisText, tickSize: 0, label: null }),
    ],
  })
}

/** Dot timeline — when awards end. */
function timeline(spec: Extract<ChartSpec, { form: "timeline" }>, width: number, rows: number): string {
  const data = spec.data.rows.slice(0, rows).map((r) => ({ label: trunc(String(r[spec.label] ?? "—"), 34), date: new Date(String(r[spec.date])), value: Number(r[spec.value]) || 0 }))
  const max = Math.max(...data.map((d) => d.value))
  return renderPlot({
    width, height: data.length * ROW + 36, marginLeft: 0, marginRight: 16, marginTop: 4, marginBottom: 28,
    style: BASE_STYLE,
    y: { domain: data.map((d) => d.label), axis: null },
    x: { grid: true, ticks: "month", tickSize: 0, label: null },
    marks: [
      Plot.gridX({ stroke: LINE }),
      Plot.ruleY(data, { y: "label", x1: () => data.reduce((a, d) => (d.date < a ? d.date : a), data[0].date), x2: "date", dy: 9, stroke: LINE, strokeWidth: 1 }),
      Plot.dot(data, { y: "label", x: "date", dy: 9, r: (d) => 4 + 5 * Math.sqrt(d.value / max), fill: NAVY, stroke: "#f7f5f0", strokeWidth: 2 }),
      Plot.text(data, { y: "label", text: "label", frameAnchor: "left", dy: -12, textAnchor: "start", ...rowLabel }),
      Plot.text(data, { y: "label", x: "date", text: (d) => formatValue(spec.valueFormat, d.value), dx: 14, dy: 9, textAnchor: "start", fontFamily: MONO, fontSize: 12, fill: INK }),
      Plot.axisX({ ...axisText, tickSize: 0, label: null, tickFormat: "%b" }),
    ],
  })
}

/** Dumbbell — floor to market per row. */
function dumbbell(spec: Extract<ChartSpec, { form: "dumbbell" }>, width: number, rows: number): string {
  const data = spec.data.rows.slice(0, rows).map((r) => ({ label: trunc(String(r[spec.label] ?? "—")), a: Number(r[spec.a]) || 0, b: Number(r[spec.b]) || 0 }))
  return renderPlot({
    width, height: data.length * ROW + 36, marginLeft: 64, marginRight: 24, marginTop: 4, marginBottom: 28,
    style: BASE_STYLE,
    y: { domain: data.map((d) => d.label), axis: null },
    x: { grid: true, ticks: 4, tickFormat: (v: number) => formatValue(spec.valueFormat, v), tickSize: 0, label: null, nice: true },
    marks: [
      Plot.gridX({ stroke: LINE }),
      Plot.ruleY(data, { y: "label", x1: "a", x2: "b", dy: 9, stroke: INK, strokeWidth: 2 }),
      Plot.dot(data, { y: "label", x: "a", dy: 9, r: 5, fill: COPPER, stroke: "#f7f5f0", strokeWidth: 2 }),
      Plot.dot(data, { y: "label", x: "b", dy: 9, r: 5, fill: NAVY, stroke: "#f7f5f0", strokeWidth: 2 }),
      Plot.text(data, { y: "label", text: "label", frameAnchor: "left", dy: -12, textAnchor: "start", ...rowLabel }),
      Plot.text(data, { y: "label", x: "a", text: (d) => formatValue(spec.valueFormat, d.a), dx: -10, dy: 9, textAnchor: "end", fontFamily: MONO, fontSize: 12, fill: INK }),
      Plot.axisX({ ...axisText, tickSize: 0, label: null }),
    ],
  })
}

export function renderChart(spec: ChartSpec, width = 720, rows = 12): string {
  switch (spec.form) {
    case "ranked": return ranked(spec, width, rows)
    case "change": return change(spec, width, rows)
    case "timeline": return timeline(spec, width, rows)
    case "dumbbell": return dumbbell(spec, width, rows)
  }
}
