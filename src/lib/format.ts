const usd0 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
const num0 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 })

/** $491.8B / $2.1M / $845K — one decimal, unit suffix, for figures and ledger values. */
export function money(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "—"
  const a = Math.abs(n)
  const sign = n < 0 ? "−" : ""
  if (a >= 1e9) return `${sign}$${(a / 1e9).toFixed(1)}B`
  if (a >= 1e6) return `${sign}$${(a / 1e6).toFixed(1)}M`
  if (a >= 1e3) return `${sign}$${(a / 1e3).toFixed(0)}K`
  return sign + usd0.format(a)
}
export function count(n: number | null | undefined): string {
  if (n == null) return "—"
  return num0.format(n)
}
export function pct(n: number | null | undefined): string {
  if (n == null) return "—"
  return `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n).toFixed(1)}%`
}
export function hourly(n: number | null | undefined): string {
  if (n == null) return "—"
  return `$${n.toFixed(2)}`
}
export function dateLong(iso: string): string {
  return new Date(iso + (iso.length === 10 ? "T12:00:00Z" : "")).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}
export function dateShort(iso: string): string {
  return new Date(iso + (iso.length === 10 ? "T12:00:00Z" : "")).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}
/** Title-case an ALL-CAPS SAM legal name for prose; ledgers keep the record's form. */
export function properName(s: string | null | undefined): string {
  if (!s) return "—"
  return s.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase()).replace(/\b(Llc|Inc|Co|Jv|Lp|Ltd)\b/g, (m) => m.toUpperCase()).replace(/\b(Of|And|The|A)\b/g, (m) => m.toLowerCase())
}
