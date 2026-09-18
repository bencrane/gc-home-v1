import type { Piece, Block, Frozen } from "@/content/types"
import { parsePiece } from "@/lib/schema"
import { FORMATS } from "@/content/formats"

type SanityBlock = { _type: string; _key?: string; style?: string; children?: { text: string }[] } & Record<string, unknown>
type SanityPiece = { _id: string; title: string; slug: string; dek: string; section: string; format: string; publishedAt: string; byline?: string; agencies?: string[]; naics3?: string[]; body: SanityBlock[] }

const PUBLIC_FIELDS = ["form", "heading", "label", "value", "valueFormat", "sub", "delta", "date", "a", "b", "aName", "bName", "figures", "source"] as const

function frozen(doc: SanityPiece, b: SanityBlock): Frozen {
  let parsed: unknown
  try { parsed = JSON.parse(String(b.result ?? "")) } catch { throw new Error(`Invalid piece "${doc.slug}": dataBlock "${b.heading}" result is not valid JSON`) }
  const f = parsed as Partial<Frozen>
  if (!Array.isArray(f.rows) || !Array.isArray(f.columns) || typeof f.takenAt !== "string") throw new Error(`Invalid piece "${doc.slug}": dataBlock "${b.heading}" result lacks takenAt/columns/rows`)
  // Public payload: only takenAt, columns, rows. queryId/params/artifact never leave here.
  return { takenAt: f.takenAt, columns: f.columns, rows: f.rows as Frozen["rows"] }
}

function toBlock(doc: SanityPiece, b: SanityBlock): Block | null {
  if (b._type === "block") {
    const text = (b.children ?? []).map((c) => c.text).join("")
    if (!text.trim()) return null
    return b.style === "h2" || b.style === "h3" ? { kind: "h2", text } : { kind: "p", text }
  }
  if (b._type !== "dataBlock") return null
  const pub: Record<string, unknown> = {}
  for (const k of PUBLIC_FIELDS) if (b[k] != null) pub[k] = b[k]
  if (b.presentation === "figures") return { kind: "figures", figures: (b.figures as { label: string; value: string; sub?: string }[]).map(({ label, value, sub }) => ({ label, value, sub })), source: String(b.source ?? "") }
  const data = frozen(doc, b)
  if (b.presentation === "ledger") return { kind: "ledger", ...(pub as object), data } as Block
  return { kind: "chart", ...(pub as object), data } as Block
}

/** Sanity document → the Piece the views render. Validated at the boundary; throws naming the slug. */
export function serializePiece(doc: SanityPiece): Piece {
  const formatName = FORMATS.find((f) => f.id === doc.format)?.name ?? doc.format
  const piece = {
    slug: doc.slug, title: doc.title, dek: doc.dek, section: doc.section, format: doc.format, formatName,
    publishedAt: doc.publishedAt.slice(0, 10), byline: doc.byline ?? "GC Staff",
    agencies: doc.agencies ?? [], naics3: doc.naics3 ?? [],
    body: doc.body.map((b) => toBlock(doc, b)).filter((b): b is Block => b !== null),
  }
  return parsePiece(piece) as Piece
}
