import { Eyebrow, Heading, Text, MonoLabel } from "@/components/primitives"
import { Band } from "@/components/site/Band"
import { PieceCard } from "@/components/editorial/PieceCard"
import { money, count, pct, dateShort, properName } from "@/lib/format"
import type { AgencyPage, SectorPage } from "@/lib/reference"
import { REFERENCE_TAKEN_AT } from "@/lib/reference"

function FyLedger({ rows }: { rows: { fy: number; obl: number; recipients: number; actions: number }[] }) {
  return (
    <figure>
      <MonoLabel className="text-copper-600">Obligations by fiscal year</MonoLabel>
      <div className="mt-3 border-t border-navy-900">
        {rows.map((r, i) => {
          const prev = rows[i + 1]
          const d = prev ? (100 * (r.obl - prev.obl)) / prev.obl : null
          return (
            <div key={r.fy} className="grid grid-cols-[6rem_1fr_auto_auto] items-baseline gap-6 border-b border-line py-3">
              <span className="font-mono text-mono-data text-foreground-subtle">FY{String(r.fy).slice(2)}</span>
              <span className="text-body text-foreground">{count(r.recipients)} recipients · {count(r.actions)} actions</span>
              <span className={"w-16 text-right font-mono text-mono-data tabular-nums " + (d != null && d < 0 ? "text-danger" : "text-foreground-subtle")}>{d == null ? "" : pct(d)}</span>
              <span className="w-20 text-right font-mono text-body tabular-nums text-foreground">{money(r.obl)}</span>
            </div>
          )
        })}
      </div>
      <figcaption className="mt-3 text-mono-provenance font-mono text-foreground-subtle">Source: USAspending, FPDS contract actions · as of {dateShort(REFERENCE_TAKEN_AT)}</figcaption>
    </figure>
  )
}

export function AgencyView({ page }: { page: AgencyPage }) {
  return (
    <>
      <Band className="border-b border-line py-10">
        <Eyebrow>Agency</Eyebrow>
        <Heading level={1} className="mt-3">{page.name}</Heading>
        <Text size="body-lg" tone="muted" className="mt-4 max-w-[60ch] text-dek">{money(page.fy[0]?.obl)} obligated in FY{String(page.fy[0]?.fy).slice(2)} across {count(page.fy[0]?.recipients)} recipients.</Text>
      </Band>
      <Band className="py-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <FyLedger rows={page.fy} />
          {page.recipients.length >= 3 && (
            <figure>
              <MonoLabel className="text-copper-600">Largest recipients · FY25</MonoLabel>
              <div className="mt-3 border-t border-navy-900">
                {page.recipients.map((r) => (
                  <div key={r.uei} className="flex items-baseline justify-between gap-6 border-b border-line py-3">
                    <span className="truncate text-body text-foreground">{properName(r.name)}</span>
                    <span className="shrink-0 font-mono text-body tabular-nums text-foreground">{money(r.obl)}</span>
                  </div>
                ))}
              </div>
              <figcaption className="mt-3 text-mono-provenance font-mono text-foreground-subtle">Primes with at least $100M obligated · as of {dateShort(REFERENCE_TAKEN_AT)}</figcaption>
            </figure>
          )}
        </div>
      </Band>
      {page.pieces.length > 0 && (
        <Band className="border-t border-line py-10">
          <div className="mb-8 border-b-2 border-navy-900 pb-4"><Heading level={2}>Coverage</Heading></div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">{page.pieces.map((p) => <PieceCard key={p.slug} piece={p} />)}</div>
        </Band>
      )}
    </>
  )
}

export function SectorView({ page }: { page: SectorPage }) {
  return (
    <>
      <Band className="border-b border-line py-10">
        <Eyebrow>Sector · NAICS {page.naics3}</Eyebrow>
        <Heading level={1} className="mt-3">{page.name}</Heading>
        <Text size="body-lg" tone="muted" className="mt-4 max-w-[60ch] text-dek">{money(page.fy[0]?.obl)} obligated in FY{String(page.fy[0]?.fy).slice(2)} across {count(page.fy[0]?.recipients)} recipients.</Text>
      </Band>
      <Band className="py-10"><div className="max-w-[40rem]"><FyLedger rows={page.fy} /></div></Band>
      {page.pieces.length > 0 && (
        <Band className="border-t border-line py-10">
          <div className="mb-8 border-b-2 border-navy-900 pb-4"><Heading level={2}>Coverage</Heading></div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">{page.pieces.map((p) => <PieceCard key={p.slug} piece={p} />)}</div>
        </Band>
      )}
    </>
  )
}
