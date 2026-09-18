import { sanity, PIECE_QUERY } from "@/lib/sanity"
import { serializePiece } from "@/lib/serialize"
import type { Piece } from "@/content/types"
import { FORMATS } from "@/content/formats"

let cache: Promise<Piece[]> | null = null
/** All published pieces, newest first, fetched once per build and validated. */
export function getPieces(): Promise<Piece[]> {
  if (!cache) cache = sanity.fetch(PIECE_QUERY).then((docs: Parameters<typeof serializePiece>[0][]) => {
    const pieces = docs.map(serializePiece)
    if (pieces.length === 0) throw new Error("Sanity returned zero published pieces; refusing to build an empty site")
    // Content floor: every live format carries at least three pieces. No empty sections, no thin indexes.
    for (const f of FORMATS) {
      const n = pieces.filter((p) => p.format === f.id).length
      if (n > 0 && n < 3) throw new Error(`Format "${f.id}" has ${n} published piece(s); the floor is 3`)
    }
    return pieces
  })
  return cache
}
export const bySection = (pieces: Piece[], s: Piece["section"]) => pieces.filter((p) => p.section === s)
export const byFormat = (pieces: Piece[], f: Piece["format"]) => pieces.filter((p) => p.format === f)
