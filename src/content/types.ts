import type { ValueFormat } from "@/lib/format"

export type Section = "markets" | "briefings"
export type Format = "record" | "flows" | "expiring" | "subunder" | "wage" | "whowon"

/** A frozen result. Public-facing: no query ids or artifact stamps are ever rendered. */
export type Frozen = { takenAt: string; columns: string[]; rows: Record<string, unknown>[] }

export type LedgerSpec = {
  kind: "ledger"; heading: string; data: Frozen
  label: string; value: string; valueFormat: ValueFormat; sub?: string; delta?: string; source: string
}
export type FiguresSpec = { kind: "figures"; figures: { label: string; value: string; sub?: string }[]; source: string }

/** One chart form per format (docs/design/CHARTS.md). */
export type ChartSpec =
  | { kind: "chart"; form: "ranked"; heading: string; data: Frozen; label: string; value: string; valueFormat: ValueFormat; sub?: string; source: string }
  | { kind: "chart"; form: "change"; heading: string; data: Frozen; label: string; value: string; valueFormat: ValueFormat; source: string }
  | { kind: "chart"; form: "timeline"; heading: string; data: Frozen; label: string; date: string; value: string; valueFormat: ValueFormat; source: string }
  | { kind: "chart"; form: "dumbbell"; heading: string; data: Frozen; label: string; a: string; b: string; aName: string; bName: string; valueFormat: ValueFormat; source: string }

export type Block = { kind: "p"; text: string } | { kind: "h2"; text: string } | LedgerSpec | FiguresSpec | ChartSpec

export type Piece = {
  slug: string; title: string; dek: string; section: Section; format: Format; formatName: string
  publishedAt: string; byline: string; body: Block[]
  /** Reference-page tags: awarding agency codes and 3-digit NAICS. Editor-owned after seed. */
  agencies?: string[]; naics3?: string[]
}
