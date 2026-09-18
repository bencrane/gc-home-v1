import reference from "@/data/reference.json"
import agencies from "@/data/agencies.json"
import naics3 from "@/data/naics3.json"
import { PIECES } from "@/content/pieces"
import type { Piece } from "@/content/types"

type Ref = { takenAt: string; agencyFy: { code: string; fy: number; obl: number; recipients: number; actions: number }[]; naicsFy: { naics3: string; fy: number; obl: number; recipients: number; actions: number }[]; topRecipients: { code: string; uei: string; name: string; obl: number }[] }
const ref = reference as Ref
export const AGENCY_NAMES = agencies as Record<string, string>
export const NAICS3_NAMES = naics3 as Record<string, string>
export const REFERENCE_TAKEN_AT = ref.takenAt

export type AgencyPage = { code: string; name: string; fy: Ref["agencyFy"]; recipients: Ref["topRecipients"]; pieces: Piece[] }
export type SectorPage = { naics3: string; name: string; fy: Ref["naicsFy"]; pieces: Piece[] }

/** Universe: agencies with FY25 data and (a tagged piece or ≥5 large recipients). Thin-content floor from the plan. */
export function agencyPages(): AgencyPage[] {
  const codes = new Set(ref.agencyFy.filter((r) => r.fy === 2025).map((r) => r.code))
  return [...codes].map((code) => {
    const fy = ref.agencyFy.filter((r) => r.code === code).sort((a, b) => b.fy - a.fy)
    const byName = new Map<string, Ref["topRecipients"][number]>()
    for (const r of ref.topRecipients.filter((r) => r.code === code)) { const k = r.name; const prev = byName.get(k); byName.set(k, prev ? { ...prev, obl: prev.obl + r.obl } : r) }
    const recipients = [...byName.values()].sort((a, b) => b.obl - a.obl)
    const pieces = PIECES.filter((p) => p.agencies?.includes(code))
    return { code, name: AGENCY_NAMES[code] ?? code, fy, recipients, pieces }
  }).filter((a) => AGENCY_NAMES[a.code] && (a.pieces.length > 0 || a.recipients.length >= 5)).sort((a, b) => (b.fy[0]?.obl ?? 0) - (a.fy[0]?.obl ?? 0))
}
export function sectorPages(): SectorPage[] {
  const codes = new Set(ref.naicsFy.filter((r) => r.fy === 2025).map((r) => r.naics3))
  return [...codes].map((n) => {
    const fy = ref.naicsFy.filter((r) => r.naics3 === n).sort((a, b) => b.fy - a.fy)
    const pieces = PIECES.filter((p) => p.naics3?.includes(n))
    return { naics3: n, name: NAICS3_NAMES[n] ?? n, fy, pieces }
  }).filter((s) => NAICS3_NAMES[s.naics3] && (s.pieces.length > 0 || s.fy.length === 3)).sort((a, b) => (b.fy[0]?.obl ?? 0) - (a.fy[0]?.obl ?? 0))
}
