/** Design variants under comparison. Each id maps to `html[data-variant="<id>"]` overrides in
 *  src/variants.css. "base" is the committed world in DESIGN.md with no overrides. Add a variant
 *  here and a CSS block there; the gallery picks it up. */
export type Variant = { id: string; name: string; summary: string; changes: string[]; cardVisual?: "data" | "art" }

export const VARIANTS: Variant[] = [
  {
    id: "base",
    name: "Federal Register",
    summary: "The committed world from DESIGN.md. Paper ground, navy rail, Fraunces at 400, copper kickers, 18px Inter body.",
    changes: ["No overrides"],
  },
  {
    id: "art",
    name: "Art Cards",
    summary: "Same tokens as Federal Register, but cards carry abstract art generated per piece (motif by format, seeded by slug) instead of a data visual. The lead keeps its figures.",
    changes: ["Card visual: abstract SVG art", "Lead visual unchanged"],
    cardVisual: "art",
  },
  {
    id: "broadsheet",
    name: "Broadsheet",
    summary: "Denser newspaper read. Smaller display, 17px body in a wider measure, tighter section rhythm, more pieces per screen.",
    changes: ["Display clamp capped at 3.25rem", "Body 17px / 1.55, measure 52rem", "Section rhythm 3rem / 4rem / 5rem", "Ledger rows 10px vertical"],
  },
  {
    id: "ink",
    name: "Ink Front",
    summary: "Front bands on navy-900 with paper type, the record on ink as in the gc-hq opening. Piece pages stay on paper.",
    changes: ["Hero and front sections on navy-900", "Copper-300 kickers on ink", "Hairlines in navy-700", "Masthead on ink"],
  },
  {
    id: "quiet",
    name: "Quiet Copper",
    summary: "Copper withdrawn to focus rings and one figure per page. Kickers and links in navy. Tests whether the identity survives without the accent.",
    changes: ["Eyebrow and nav links navy-600", "Ledger heading navy", "Chart-2 becomes navy-400"],
  },
]

export const DEFAULT_VARIANT = "base"
