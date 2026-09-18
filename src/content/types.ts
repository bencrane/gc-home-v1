export type Section = "markets" | "briefings"
export type Format = "record" | "flows" | "expiring" | "subunder" | "wage" | "whowon"

export type Frozen = {
  queryId: string
  artifact: string | null
  takenAt: string
  columns: string[]
  rows: Record<string, unknown>[]
}

export type LedgerSpec = {
  kind: "ledger"
  heading: string
  data: Frozen
  label: string            // column for the left cell
  value: string            // column for the right cell
  valueFormat: "money" | "count" | "hourly" | "date"
  sub?: string             // optional column rendered muted under the label
  delta?: string           // optional column rendered as a signed % next to value
  source: string
}
export type FiguresSpec = {
  kind: "figures"
  figures: { label: string; value: string; sub?: string }[]
  source: string
}
export type ChartSpec = {
  kind: "chart"
  heading: string
  data: Frozen
  category: string
  series: { column: string; name: string }[]
  valueFormat: "money"
  source: string
}
export type Block = { kind: "p"; text: string } | { kind: "h2"; text: string } | LedgerSpec | FiguresSpec | ChartSpec

export type Piece = {
  slug: string
  title: string
  dek: string
  section: Section
  format: Format
  formatName: string
  publishedAt: string
  byline: string
  body: Block[]
}
