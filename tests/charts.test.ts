import { describe, it, expect } from "vitest"
import { renderChart } from "@/components/charts/forms"
import { PIECES } from "@/content/pieces"
import type { ChartSpec } from "@/content/types"

describe("chart forms render at build", () => {
  const charts = PIECES.flatMap((p) => p.body.filter((b): b is ChartSpec => b.kind === "chart").map((c) => ({ slug: p.slug, c })))
  it("every format has at least one chart block", () => {
    const forms = new Set(charts.map((x) => x.c.form))
    expect([...forms].sort()).toEqual(["change", "dumbbell", "ranked", "timeline"])
  })
  it("every chart renders to an SVG with no script", () => {
    for (const { slug, c } of charts) {
      const svg = renderChart(c, 720, 12)
      expect(svg, slug).toMatch(/^<svg/); expect(svg, slug).not.toMatch(/<script/)
    }
  })
  it("a chart with one row still renders", () => {
    const c = charts[0].c
    const one = { ...c, data: { ...c.data, rows: c.data.rows.slice(0, 1) } } as ChartSpec
    expect(renderChart(one, 720, 12)).toMatch(/^<svg/)
  })
})
