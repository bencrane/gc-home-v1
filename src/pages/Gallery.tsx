import { useState } from "react"
import { VARIANTS } from "@/variants"
import { setVariant } from "@/lib/variant"
import { Eyebrow, Heading, Text, MonoLabel } from "@/components/primitives"
import { cn } from "@/lib/cn"

const PREVIEW_W = 1280
const PREVIEW_H = 800
const SCALE = 0.3

function Preview({ id, path = "/", scale = SCALE }: { id: string; path?: string; scale?: number }) {
  return (
    <div className="relative overflow-hidden border border-line bg-background" style={{ height: PREVIEW_H * scale }}>
      <iframe
        title={`${id} preview`}
        src={`${path}?v=${id}&preview=1`}
        width={PREVIEW_W}
        height={PREVIEW_H}
        tabIndex={-1}
        className="pointer-events-none absolute left-0 top-0 origin-top-left"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  )
}

/** Variant gallery: one card per design variant with a live scaled front page. Open walks the site
 *  in that variant (persisted). Pick two to compare side by side at a larger scale. */
export default function Gallery() {
  const [compare, setCompare] = useState<string[]>([])
  const [path, setPath] = useState("/")
  const toggle = (id: string) => setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id].slice(-2)))
  const open = (id: string) => { setVariant(id); window.location.assign(`/?v=${id}`) }
  const active = (() => { try { return document.documentElement.dataset.variant } catch { return undefined } })()

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-[var(--w-wide)] items-end justify-between gap-6 px-gutter py-8">
          <div>
            <Eyebrow>Design gallery</Eyebrow>
            <Heading level={1} className="mt-3">Variants</Heading>
            <Text tone="muted" className="mt-3 max-w-2xl">Each card is the site under one variant of the design tokens. Open walks the whole site in it. Pick two to compare.</Text>
          </div>
          <label className="flex items-center gap-3">
            <MonoLabel as="span">Page</MonoLabel>
            <select value={path} onChange={(e) => setPath(e.target.value)} className="border border-line-strong bg-surface px-3 py-2 text-body-sm">
              <option value="/">Front</option>
              <option value="/markets">Markets index</option>
              <option value="/markets/defense-up-10-hhs-down-a-quarter-fy25">Piece · The Record</option>
              <option value="/markets/defense-shifted-43-billion-into-aircraft-and-vehicles">Piece · Flows (chart)</option>
              <option value="/briefings/border-counties-set-guard-wages-2-50-under-the-texas-market">Piece · Wage Floor</option>
            </select>
          </label>
        </div>
      </header>

      {compare.length === 2 && (
        <section className="border-b border-line bg-slate-100">
          <div className="mx-auto max-w-[var(--w-wide)] px-gutter py-8">
            <div className="flex items-baseline justify-between">
              <Eyebrow>Compare</Eyebrow>
              <button onClick={() => setCompare([])} className="text-eyebrow font-sans uppercase text-slate-500 hover:text-navy-900">Clear</button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {compare.map((id) => {
                const v = VARIANTS.find((x) => x.id === id)!
                return (
                  <div key={id}>
                    <MonoLabel className="mb-2">{v.name}</MonoLabel>
                    <Preview id={id} path={path} scale={0.48} />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <main className="mx-auto max-w-[var(--w-wide)] px-gutter py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {VARIANTS.map((v) => {
            const picked = compare.includes(v.id)
            return (
              <article key={v.id} className={cn("border-t-2 pt-4", picked ? "border-copper-500" : "border-navy-600")}>
                <button onClick={() => open(v.id)} className="group block w-full text-left" aria-label={`Open ${v.name}`}>
                  <Preview id={v.id} path={path} />
                </button>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <MonoLabel>{v.id}{active === v.id ? " · active" : ""}</MonoLabel>
                    <Heading level={3} className="mt-1">{v.name}</Heading>
                  </div>
                  <div className="flex shrink-0 gap-4 pt-1">
                    <button onClick={() => toggle(v.id)} className={cn("text-eyebrow font-sans uppercase", picked ? "text-copper-600" : "text-slate-500 hover:text-navy-900")}>{picked ? "Picked" : "Compare"}</button>
                    <button onClick={() => open(v.id)} className="text-eyebrow font-sans uppercase text-copper-600 hover:text-navy-900">Open →</button>
                  </div>
                </div>
                <Text size="body-sm" tone="muted" className="mt-3">{v.summary}</Text>
                <ul className="mt-3 space-y-1 border-t border-line pt-3">
                  {v.changes.map((c) => <li key={c} className="text-caption text-slate-600">{c}</li>)}
                </ul>
              </article>
            )
          })}
        </div>
      </main>
    </div>
  )
}
