import type { Piece, Format } from "@/content/types"

/** Abstract card art. Deterministic from the slug, motif from the format, palette from DESIGN.md.
 *  Flat geometry only: no gradients, no shadows. Schema: viewBox 400×240, paper ground, one navy
 *  structure, one copper mark. */
const NAVY = "#1f4470", INK = "#0f1a2e", NAVY3 = "#90abc8", COPPER = "#bf8847", LINE = "#e1dccd"

function rng(seed: string) {
  let h = 2166136261
  for (const c of seed) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000 }
}

const MOTIF: Record<Format, (r: () => number) => string> = {
  record: (r) => {
    const rows = 9, out: string[] = []
    for (let i = 0; i < rows; i++) {
      const w = 60 + r() * 280 * (1 - i / rows) ** 1.3
      out.push(`<rect x="40" y="${28 + i * 22}" width="${w.toFixed(0)}" height="10" fill="${i === 0 ? COPPER : NAVY}" opacity="${i === 0 ? 1 : 0.9 - i * 0.07}"/>`)
    }
    return out.join("")
  },
  flows: (r) => {
    const out: string[] = [`<line x1="40" y1="200" x2="360" y2="200" stroke="${LINE}"/>`]
    for (let i = 0; i < 7; i++) {
      const x = 50 + i * 45, h = 40 + r() * 120, up = r() > 0.35
      out.push(`<path d="M${x} 200 L${x} ${200 - h}" stroke="${up ? NAVY : COPPER}" stroke-width="10"/>`)
      out.push(`<path d="M${x - 8} ${200 - h + (up ? 10 : -10)} L${x} ${200 - h} L${x + 8} ${200 - h + (up ? 10 : -10)}" fill="none" stroke="${up ? NAVY : COPPER}" stroke-width="3"/>`)
    }
    return out.join("")
  },
  expiring: (r) => {
    const cx = 200, cy = 130, out: string[] = []
    for (let i = 0; i < 4; i++) {
      const rad = 40 + i * 22, sweep = 0.35 + r() * 0.55, a = Math.PI * 2 * sweep
      const x = cx + rad * Math.cos(-Math.PI / 2 + a), y = cy + rad * Math.sin(-Math.PI / 2 + a)
      out.push(`<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="${LINE}"/>`)
      out.push(`<path d="M${cx} ${cy - rad} A${rad} ${rad} 0 ${sweep > 0.5 ? 1 : 0} 1 ${x.toFixed(1)} ${y.toFixed(1)}" fill="none" stroke="${i === 3 ? COPPER : NAVY}" stroke-width="8"/>`)
    }
    out.push(`<line x1="${cx}" y1="${cy - 118}" x2="${cx}" y2="${cy - 100}" stroke="${INK}" stroke-width="2"/>`)
    return out.join("")
  },
  subunder: (r) => {
    const out: string[] = [`<rect x="180" y="26" width="40" height="40" fill="${NAVY}"/>`]
    const n = 4 + Math.floor(r() * 3)
    for (let i = 0; i < n; i++) {
      const x = 40 + (i * 320) / (n - 1)
      out.push(`<path d="M200 66 L200 100 L${x} 100 L${x} 130" fill="none" stroke="${NAVY3}" stroke-width="2"/>`)
      out.push(`<rect x="${x - 12}" y="130" width="24" height="24" fill="${i === Math.floor(n / 2) ? COPPER : NAVY}"/>`)
      const m = 1 + Math.floor(r() * 3)
      for (let j = 0; j < m; j++) {
        const xx = x - 16 + j * 16
        out.push(`<path d="M${x} 154 L${x} 176 L${xx} 176 L${xx} 190" fill="none" stroke="${LINE}" stroke-width="2"/>`)
        out.push(`<rect x="${xx - 5}" y="190" width="10" height="10" fill="${NAVY3}"/>`)
      }
    }
    return out.join("")
  },
  wage: (r) => {
    let y = 170, d = `M40 ${y}`
    const out: string[] = []
    for (let i = 0; i < 8; i++) { const x = 40 + (i + 1) * 40; y = Math.max(50, Math.min(190, y + (r() - 0.5) * 60)); d += ` L${x - 40} ${y} L${x} ${y}` }
    out.push(`<line x1="40" y1="120" x2="360" y2="120" stroke="${COPPER}" stroke-width="3" stroke-dasharray="6 6"/>`)
    out.push(`<path d="${d}" fill="none" stroke="${NAVY}" stroke-width="6"/>`)
    return out.join("")
  },
  whowon: (r) => {
    const out: string[] = []
    for (let row = 0; row < 3; row++) for (let col = 0; col < 6; col++) {
      const x = 55 + col * 58, y = 50 + row * 70, big = row === 0 && col === Math.floor(r() * 6)
      out.push(`<circle cx="${x}" cy="${y}" r="${big ? 22 : 12}" fill="none" stroke="${big ? COPPER : NAVY3}" stroke-width="${big ? 3 : 1.5}"/>`)
      if (big) out.push(`<circle cx="${x}" cy="${y}" r="12" fill="${COPPER}"/>`)
    }
    return out.join("")
  },
}

export function Art({ piece, className }: { piece: Piece; className?: string }) {
  const body = MOTIF[piece.format](rng(piece.slug))
  return (
    <svg viewBox="0 0 400 240" role="img" aria-label="" className={className} xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: `<rect width="400" height="240" fill="#f7f5f0"/>${body}` }} />
  )
}
