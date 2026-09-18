---
version: 1
name: Government-Contracted-design-system
description: "Government Contracted (GC) — a media property for federal procurement, in the register of Bloomberg Media for govcon. Own system (2026-09-17): the palette and three faces are the carried identity; type scale, rhythm, widths, and the page grid are designed for a news front. Identity: warm document paper (#f7f5f0) as ground, deep navy ink (#0f1a2e) as authority, a fixed navy side rail, copper as the official-seal accent used only for markers and emphasis, Fraunces serif at weight 400 for display, Inter for UI, JetBrains Mono uppercase-tracked for labels and data provenance. Sharp corners by default. Structure comes from hairlines, register lines, and a 32px ledger grid, not from cards or shadows. Every value in this file is live in src/index.css; this file is the human-readable contract for them."

colors:
  # Ground and ink
  background: "#f7f5f0"
  surface: "#ffffff"
  surface-muted: "#ede9df"
  foreground: "#0f1a2e"
  foreground-muted: "#3a4a64"
  foreground-subtle: "#5b6b86"
  line: "#e1dccd"
  line-strong: "#c8c1ac"
  # Navy — federal-document authority (primary = navy-600, rail = navy-900)
  navy-50: "#f0f4fa"
  navy-100: "#dde6f0"
  navy-200: "#bccde0"
  navy-300: "#90abc8"
  navy-400: "#5c80a8"
  navy-500: "#365d8a"
  navy-600: "#1f4470"
  navy-700: "#1a3658"
  navy-800: "#152a43"
  navy-900: "#0f1a2e"
  # Copper — the seal accent. Never a large fill.
  copper-50: "#fbf6ee"
  copper-100: "#f3e7cf"
  copper-200: "#e6cd9d"
  copper-300: "#d3a96b"
  copper-400: "#bf8847"
  copper-500: "#a36f31"
  copper-600: "#85591f"
  copper-700: "#674416"
  copper-800: "#4a3110"
  # Slate — warm neutrals between navy and copper
  slate-50: "#f7f5f0"
  slate-100: "#ede9df"
  slate-200: "#dcd6c5"
  slate-300: "#b8b09a"
  slate-400: "#8e8670"
  slate-500: "#696452"
  slate-600: "#4d4a3d"
  slate-700: "#34322a"
  slate-800: "#1f1d18"
  slate-900: "#0f0e0b"
  # Status
  success: "#15803d"
  warning: "#b45309"
  danger: "#b91c1c"
  # Semantic (shadcn layer, OKLCH in src/index.css; hex here is the rendered value)
  primary: "#1f4470"
  primary-foreground: "#f7f5f0"
  accent: "#f3e7cf"
  accent-foreground: "#85591f"
  muted: "#ede9df"
  muted-foreground: "#3a4a64"
  border: "#e1dccd"
  ring: "#bf8847"
  sidebar: "#152a43"
  sidebar-foreground: "#dde6f0"
  sidebar-primary: "#d3a96b"
  chart-1: "#1f4470"
  chart-2: "#bf8847"
  chart-3: "#365d8a"
  chart-4: "#15803d"
  chart-5: "#b91c1c"
  # Dark restatement (.dark) — same language on an ink field
  dark-background: "#0f1a2e"
  dark-foreground: "#ede9df"
  dark-card: "#152a43"
  dark-primary: "#90abc8"
  dark-accent-foreground: "#d3a96b"
  dark-border: "#1a3658"

typography:
  # Modular scale, ratio 1.2 on 16px: 11 · 13 · 16 · 19 · 23 · 28 · 33 · 40 · 48 · 57 · 69. One role per step.
  wordmark:
    fontFamily: Fraunces Variable
    fontSize: clamp(2.25rem, 4.7vw, 4.3125rem)
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.02em
    textTransform: uppercase
    role: the loudest text on the site (69px at desktop)
  display:
    fontFamily: Fraunces Variable
    fontSize: clamp(2.5rem, 4vw, 3.5625rem)
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: -0.02em
    role: front lead headline (57)
  h1:
    fontFamily: Fraunces Variable
    fontSize: clamp(2rem, 2.9vw, 2.5rem)
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.015em
    role: piece title, index title (40)
  figure:
    fontFamily: Fraunces Variable
    fontSize: 33px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.02em
    fontVariantNumeric: lining-nums tabular-nums
    role: hero figures
  h2:
    fontFamily: Fraunces Variable
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.01em
    role: section heads (Markets, Briefings, More in …)
  h3:
    fontFamily: Fraunces Variable
    fontSize: 23px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.01em
    role: row headlines, strip figures
  dek:
    fontFamily: Inter Variable
    fontSize: 23px
    fontWeight: 400
    lineHeight: 1.4
    role: standfirst under a display or h1; one step above prose
  h4:
    fontFamily: Fraunces Variable
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: -0.005em
    role: card headlines
  body-lg:
    fontFamily: Inter Variable
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.55
    role: piece prose
  body:
    fontFamily: Inter Variable
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    role: card deks, ledger labels, section blurbs, nav
  caption:
    fontFamily: Inter Variable
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
  mono-data:
    fontFamily: JetBrains Mono Variable
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.02em
    role: table values, axis values
  mono-provenance:
    fontFamily: JetBrains Mono Variable
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    role: source lines under figures
  mono-label:
    fontFamily: JetBrains Mono Variable
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.12em
    textTransform: uppercase
    role: THE micro label. Every kicker, eyebrow, figure label, axis label, section link. No second uppercase small voice exists.
  nav:
    fontFamily: Fraunces Variable
    fontSize: 16px
    fontWeight: 400
    letterSpacing: 0.06em
    textTransform: uppercase
    role: masthead section bar only

rounded:
  default: 0px
  sm: 0px
  md: 2px
  lg: 4px
  pill: 9999px

spacing:
  base: 4px
  gutter: 32px
  rail-w: 72px
  band-y: 40px
  w-wide: 1920px
  w-prose: 736px
  card-gap: 24px / 32px
  ledger-grid: 32px

motion:
  ease-brand: cubic-bezier(0.16, 1, 0.3, 1)
  dur-fast: 180ms
  dur-base: 300ms
  dur-slow: 600ms

components:
  rail:
    width: var(--rail-w)
    background: navy-900
    content: seal mark top, vertical mono-label nav (MARKETS, BRIEFINGS), copper on active
    behavior: fixed; painted onto html background so it never stops short on iOS
  eyebrow:
    role: section kicker above every display or h1
    style: mono, uppercase, 0.18em tracking, copper-600 on paper / copper-300 on ink
  register-line:
    role: card and panel top edge
    style: 2px solid primary (navy-600)
  copper-rule:
    role: hairline divider that should feel official
    style: 1px, horizontal gradient transparent → copper-500 → transparent (the one permitted gradient)
  ledger-table:
    role: agency and award tables (see 02 · THE READ)
    style: row hairlines in line / navy-700 on ink; label in Inter body; value in mono-data or figures-display, right-aligned, tabular-nums
  vignette-card:
    role: award detail plate on paper
    style: surface white, line border, register line, mono-label keys, figures-display values, shadow-card only when floating over the grid
  button:
    primary: navy-600 fill, paper text, sharp corners
    secondary: paper fill, line border, ink text
    ghost: no fill, mono-label caps, copper on hover
  badge:
    style: pill radius, surface-muted fill, mono-label text
---

## Overview

Government Contracted is read, not operated. The visitor is a CEO of a company that just won a federal award, or a capital partner evaluating the desk behind it. The surface must feel like a primary-source publication about federal procurement: a document, a ledger, a register. Authority comes from typography and structure. Nothing glows, nothing floats without reason, nothing is rounded for friendliness.

Three signatures carry the identity everywhere:

1. **Paper and ink.** Warm paper ground, deep navy ink, a fixed navy rail on the left edge of every page. On dark surfaces (the opening record, tables on ink) the same language restates itself with paper-colored type on navy-900.
2. **Fraunces at 400.** Display and headings are a serif at regular weight with negative tracking. The optical size does the work; bold is never used on the serif.
3. **Mono labels and provenance.** Every kicker, every axis label, every identifier (PIID, UEI, CAGE, NAICS, PSC) is JetBrains Mono, uppercase, wide-tracked, in a muted tone. Data values are tabular.

## Colors

- **Ground** is `background` (#f7f5f0), never white at page level. `surface` (#ffffff) is for plates and cards that sit on the ground.
- **Ink** is `foreground` (#0f1a2e) for body and headings; `foreground-muted` for supporting prose; `foreground-subtle` for mono labels and secondary provenance.
- **Navy** is structure: rail, primary buttons, register lines, chart-1, selection. `navy-600` is the working primary; `navy-900` is the rail and dark ground.
- **Copper** is the seal. Eyebrows, active nav markers, focus rings, hairline rules, chart-2, one emphasized figure per view. Never a background, never a button fill, never a large area.
- **Status** colors appear only on status: success, warning, danger. No chromatic accents beyond navy, copper, and status.
- **Dark restatement** keeps hue and role, inverts value: paper type on navy-900 ground, borders in navy-700, copper brightens to copper-300.

## Typography

- Serif (`Fraunces Variable`) for display, h1–h4, card titles, and hero figures via `figures-display`. Weight 400 always.
- Sans (`Inter Variable`) for body, captions, form values, table labels.
- Mono (`JetBrains Mono Variable`) for eyebrow, mono-label, mono-data, mono-provenance. Uppercase belongs to the first three; provenance is mixed case and tight.
- Numerals in any table, figure, or chart axis use `tabular-nums`. Hero figures use `lining-nums tabular-nums` in the serif.
- Type roles are Tailwind utilities generated from the tokens: `text-wordmark`, `text-display`, `text-h1`, `text-figure`, `text-h2`, `text-h3`, `text-dek`, `text-h4`, `text-body-lg`, `text-body`, `text-caption`, `text-mono-data`, `text-mono-provenance`, `text-mono-label`. Ad hoc font sizes are not used. Every size on the site is a step of the 1.2 scale; a new size means a new step with a named role, never a one-off.

## Layout

- Page: rail (72px navy grid track at lg+) + document. Document column runs to `w-wide` (1920px) with a 32px gutter; no marketing bands. Vertical rhythm is 40px per front band.
- Front (docs/design/FRONT_BRIEF.md): lead 8/12 with its data visual, secondaries 4/12 as rows, then rivers of 4-up cards per section. Every piece once.
- Card contract: 5:3 art well, kicker, h4 headline, two-line dek.

- Rail on the left at `--rail-w`; content offsets by it at lg+. The rail is painted into the html background so it reaches the physical screen edge on every device.
- Widths: `w-prose` for reading columns, `w-content` for standard bands, `w-wide` for tables and charts. Gutter is `--spacing-gutter`.
- Section rhythm via `--section-y-*`. Bands stack; the page never scrolls horizontally, overflow scrolls inside its container.
- Grids are symmetric and column-locked. Asymmetry is limited to a two-column split with prose left and a data plate right, as in the hero.
- `paper-grid` (32px ledger lines at 4% ink) is the only background texture and is used on paper bands that hold a data plate.

## Elevation & Depth

- Level 0: flat, hairline in `line`. Default for everything.
- Level 1: register line (2px navy top edge) on cards and plates.
- Level 2: `shadow-card` (`0 24px 60px -30px rgba(15,26,46,.18)`) only for a plate floating over the paper grid, as in the award vignette.
- No colored shadows, no glow, no blur, no glass. `seal-wash` (a faint navy radial at the top of a hero band) is the single atmospheric effect and is used once per page at most.

## Shapes

- Radius 0 by default. Buttons, inputs, cards, plates, tables are sharp.
- Pill radius only on dots and badges.
- Borders are 1px in `line`; strong borders in `line-strong`; the register line is 2px primary.

## Components

The base component set is the copied gc-hq `packages/ui` in `src/components/ui`: badge, button, card, card-grid, checkbox, command, dialog, dropdown-menu, input, input-group, label, popover, radio-group, select, separator, sheet, skeleton, slider, sonner, switch, table, tabs, textarea, tooltip. All are shadcn on Base UI, themed by the semantic tokens. New components are added through `npx shadcn add` and then aligned to these rules.

- **Eyebrow** above every display heading. Copper on paper, copper-300 on ink.
- **Ledger table** for lists of agencies, awards, recipients: label left in sans, value right in mono, hairline rows, no zebra striping, no cell borders.
- **Vignette plate** for a single award: white surface, register line, mono-label keys, serif figures, optional callouts joined by hairlines.
- **Charts** (ECharts) use chart-1 through chart-5 in order, gridlines in `line` at 1px, axis labels in mono-label, no area gradients, no drop shadows on series.

## Do's and Don'ts

- Do open every band with a mono eyebrow, then a serif heading, then sans prose.
- Do right-align every numeric column with tabular figures.
- Do use copper for exactly one emphasis per view.
- Don't use bold serif, gradient text, or a second display face.
- Don't use rounded corners above 4px on anything but badges.
- Don't fill areas with copper or any chromatic color; fills are paper, surface, or navy.
- Don't add cards where hairlines and whitespace already separate content.
- Don't animate decoratively. Motion is `ease-brand` at `dur-base`, on entry and on data change, and honors `prefers-reduced-motion`.

## Responsive Behavior

- Rail narrows to 52px below lg; content plate reclaims the width.
- Two-column bands collapse to a single column below md with prose first, plate second.
- Ledger tables keep both columns at all widths; values never wrap, labels truncate with an ellipsis.
- Display type is fluid via clamp; body sizes are fixed.

## Iteration Guide

- Change a value in `src/index.css` and mirror it here in the same change. The two files are one contract.
- Add semantic roles, not raw palette references, to components. Palette scales exist for charts and one-off marks only.
- When gc-hq-new's tokens move, diff `apps/marketing-next/src/index.css` and `packages/ui/src/styles/globals.css` against Part 1 and Part 2 of `src/index.css`.

## Known Gaps

- Media-specific components (article layout, byline, pull quote, briefing card, ticker strip) are not yet defined. They inherit the rules above until specified.
- Chart typography and gridline tokens are stated here but not yet encoded as an ECharts theme object.
- The opening animation from gc-hq-new is intentionally not carried over.
