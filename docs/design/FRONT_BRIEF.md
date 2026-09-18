# Front page brief — Government Contracted (shape output, 2026-09-17)

**Job and audience.** A CEO or principal of a federal contractor, arriving from an outreach email or a search, deciding within one viewport whether this is a serious publication about their market. Visitor mode: Read. Success = they open a piece and later cite a figure from it.

**Outcome and proof.** The front page must read as a daily-updated record of the federal procurement market. Proof is the pieces themselves: titled findings with dated figures from the public record. No marketing copy, no CTA, no product claims.

**Selected direction.** Visual authority is DESIGN.md (gc-hq identity). Structural thesis: the Bloomberg river. One lead with its data visual; a column of secondaries as headline-plus-dek rows; then a river of uniform cards, four per row at wide, grouped by section with a ruled section head. Every piece appears once. Focal moment: the lead's headline and figure. Implementation consequence: a page-level grid spec, not primitives composed ad hoc.

**Card contract.** Every river card is the same shape: art well at 5:3 on top (abstract SVG generated per piece: motif by format, seeded by slug, flat navy/copper on paper), then format kicker, headline (h4, serif 400), dek (body-sm, two lines max), nothing else. Data visuals appear only on the lead and inside pieces.

**Hierarchy.** Level 1: lead (h1, dek, byline, visual, spans 8 of 12). Level 2: secondaries (3 to 4 rows, h3, dek, spans 4 of 12, hairline-separated, no art). Level 3: river cards (h4). Level 4: section index links. Weight steps must be obvious at a glance.

**Ranges and states.** Pieces: min 6, typical 18 to 40, max hundreds. Regions fill in order lead → secondaries → sections; a section with fewer than 2 pieces renders as rows, not a card grid, so no orphan cards. Empty section: omitted. Loading: none (static content). Below md: single column, lead art first, secondaries as rows, river as 1 column; below lg: river 2 columns.

**Layout.** 12-column grid at `--w-wide`. Gutters `--spacing-gutter`. Section rhythm `--section-y-sm`. Section head: serif h3 left, "All …" link right, 2px navy rule beneath. Cards: `surface` plate, 1px `line` border, no register line on cards (the section rule carries it), sharp corners.

**Anti-goals.** No cards of unequal height in a row. No pooled whitespace. No dashboard tiles on the front. No section with one card. No hero copy.

**Constraints.** Vite + React, existing primitives. Content is fetched from Sanity at build (`src/lib/content.ts`) and validated at the boundary; the page reads a `Piece[]`. Accessibility: headline is the link, art is decorative (`aria-hidden`).
