import type { FiguresSpec } from "@/content/types"
import { MonoLabel } from "@/components/primitives"

/** Hero figures: serif at 400 with lining tabular numerals, mono label beneath, hairline between. */
export function Figures({ spec }: { spec: FiguresSpec }) {
  return (
    <figure className="my-10 first:mt-0 border-t border-navy-600">
      <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {spec.figures.map((f) => (
          <div key={f.label} className="py-5 sm:px-6 sm:first:pl-0 sm:last:pr-0">
            <p className="figures-display text-h2 text-foreground">{f.value}</p>
            <MonoLabel className="mt-2 text-foreground-subtle">{f.label}</MonoLabel>
            {f.sub && <p className="mt-1 text-caption text-foreground-muted">{f.sub}</p>}
          </div>
        ))}
      </div>
      <figcaption className="mt-3 border-t border-line pt-3 text-mono-provenance font-mono text-foreground-subtle">{spec.source}</figcaption>
    </figure>
  )
}
