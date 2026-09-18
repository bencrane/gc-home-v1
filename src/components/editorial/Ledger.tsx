import type { LedgerSpec } from "@/content/types"
import { money, count, hourly, dateShort, pct } from "@/lib/format"
import { MonoLabel } from "@/components/primitives"

const fmt = { money, count, hourly, date: (v: unknown) => dateShort(String(v)) } as const

/** The ledger table: label left in sans, value right in mono tabular, hairline rows, no boxes. */
export function Ledger({ spec }: { spec: LedgerSpec }) {
  const f = fmt[spec.valueFormat] as (v: unknown) => string
  return (
    <figure className="my-10 first:mt-0">
      <MonoLabel as="span" className="text-copper-600">{spec.heading}</MonoLabel>
      <div className="mt-3 border-t border-navy-600">
        {spec.data.rows.map((r, i) => (
          <div key={i} className="ledger-row grid grid-cols-[1fr_auto] items-baseline gap-6 border-b border-line py-3">
            <div className="min-w-0">
              <p className="truncate text-body text-foreground">{String(r[spec.label] ?? "—")}</p>
              {spec.sub && <p className="truncate text-mono-provenance font-mono text-foreground-subtle">{String(r[spec.sub] ?? "")}</p>}
            </div>
            <div className="flex items-baseline gap-6 text-right">
              {spec.delta && (
                <span className={"w-16 font-mono text-mono-data tabular-nums " + (Number(r[spec.delta]) < 0 ? "text-danger" : "text-foreground-subtle")}>
                  {pct(Number(r[spec.delta]))}
                </span>
              )}
              <span className="w-20 font-mono text-body tabular-nums text-foreground">{f(r[spec.value])}</span>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-mono-provenance font-mono text-foreground-subtle">
        {spec.source} · as of {dateShort(spec.data.takenAt)}
      </figcaption>
    </figure>
  )
}
