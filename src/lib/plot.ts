import * as Plot from "@observablehq/plot"
import { parseHTML } from "linkedom"

/** Render a Plot spec to an SVG string at build time. Fonts are inherited from the page. */
export function renderPlot(options: Plot.PlotOptions): string {
  const { document } = parseHTML("<!doctype html><html><body></body></html>")
  const node = Plot.plot({ ...options, document: document as unknown as Document })
  return (node as unknown as { outerHTML: string }).outerHTML
}

export const INK = "#0f1a2e"
export const NAVY = "#1f4470"
export const COPPER = "#674416"
export const SLATE = "#b8b09a"
export const LINE = "#e1dccd"
export const SUBTLE = "#5b6b86"
export const MONO = "JetBrains Mono Variable, ui-monospace, monospace"
export const SANS = "Inter Variable, ui-sans-serif, sans-serif"

export const BASE_STYLE = { fontFamily: SANS, fontSize: "13px", background: "transparent", color: INK, overflow: "visible" } as const
export const ROW = 46
