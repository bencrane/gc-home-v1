import { z } from "zod"

/** Boundary validation for pieces. Any source (fixtures today, Sanity next) is parsed through this before render. */
const frozen = z.object({ takenAt: z.string().min(1), columns: z.array(z.string()), rows: z.array(z.record(z.string(), z.unknown())).min(1) })
const valueFormat = z.enum(["money", "count", "hourly", "date"])
const block = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("p"), text: z.string().min(1) }),
  z.object({ kind: z.literal("h2"), text: z.string().min(1) }),
  z.object({ kind: z.literal("ledger"), heading: z.string(), data: frozen, label: z.string(), value: z.string(), valueFormat, sub: z.string().optional(), delta: z.string().optional(), source: z.string() }),
  z.object({ kind: z.literal("figures"), figures: z.array(z.object({ label: z.string(), value: z.string(), sub: z.string().optional() })).min(1), source: z.string() }),
  z.object({ kind: z.literal("chart"), form: z.enum(["ranked", "change", "timeline", "dumbbell"]), heading: z.string(), data: frozen, label: z.string(), source: z.string(), valueFormat }).passthrough(),
])
export const pieceSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/), title: z.string().min(8), dek: z.string().min(20),
  section: z.enum(["markets", "briefings"]), format: z.enum(["record", "flows", "expiring", "subunder", "wage", "whowon"]),
  formatName: z.string(), publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), byline: z.string(), body: z.array(block).min(2),
})
export type ParsedPiece = z.infer<typeof pieceSchema>

/** Parse one piece; throws naming the slug and the failing path. */
export function parsePiece(input: unknown): ParsedPiece {
  const r = pieceSchema.safeParse(input)
  if (r.success) return r.data
  const slug = (input as { slug?: string })?.slug ?? "(no slug)"
  const first = r.error.issues[0]
  throw new Error(`Invalid piece "${slug}": ${first.path.join(".")} — ${first.message}`)
}

const INTERNAL = /sidecar|query_sidecar|queryId|artifact|core-x/i
/** Public payload must never carry internal identifiers. */
export function assertPublic(text: string, where: string) {
  if (INTERNAL.test(text)) throw new Error(`Internal identifier leaked in ${where}`)
}
