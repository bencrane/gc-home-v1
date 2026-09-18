import type { ChartSpec } from "@/content/types"
import { renderChart } from "./forms"
import { MonoLabel } from "@/components/primitives"
import { dateShort } from "@/lib/format"

/** A chart block inside a piece: heading, server-rendered SVG, source line. */
export function Chart({ spec, rows = 12, width = 720, bare = false }: { spec: ChartSpec; rows?: number; width?: number; bare?: boolean }) {
  const svg = renderChart(spec, width, rows)
  if (bare) return <div className="w-full [&>svg]:h-auto [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
  return (
    <figure className="my-10 first:mt-0">
      <MonoLabel as="span" className="text-copper-600">{spec.heading}</MonoLabel>
      <div className="mt-4 w-full border-t border-navy-900 pt-4 [&>svg]:h-auto [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
      <figcaption className="mt-3 text-mono-provenance font-mono text-foreground-subtle">{spec.source} · as of {dateShort(spec.data.takenAt)}</figcaption>
    </figure>
  )
}
