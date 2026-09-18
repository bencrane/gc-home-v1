# gc-home-v1 — Government Contracted

## What this is
The public site for Government Contracted (GC): a media property covering federal procurement, in the register of Bloomberg Media for govcon. GC is one vehicle of Bazaar Global. Its job is credibility: GC reaches the CEOs of companies that win federal awards and connects them with specialized capital and equipment partners. It is read, not operated. It is not a terminal, not a dashboard product, and not the origination-desk site in gc-hq-new.

## Source of truth
`DESIGN.md` (project root) is the binding contract for color, typography, spacing, motion, and component rules. `src/index.css` is its executable form: Part 1 is the brand token set from gc-hq-new `apps/marketing-next/src/index.css`, Part 2 is the shadcn semantic layer from gc-hq-new `packages/ui/src/styles/globals.css`. Change both in the same commit or change neither. No ad hoc hex values, font sizes, or radii in components.

## Stack
Astro 7 (static output, one HTML file per page at build) with React 19 islands for the front page, piece pages (charts), and the gallery. TypeScript 6. Tailwind 4 via `@tailwindcss/vite` inside the Astro config. shadcn/ui on Base UI (`base-nova`), with the gc-hq `packages/ui` component set already in `src/components/ui` and the `@/` alias. Fonts via fontsource: Inter Variable, Fraunces Variable, JetBrains Mono Variable. ECharts for data graphics. GSAP for entry and data-change motion. Remotion and hyperframes for rendered media. No Tremor, no Recharts.

## Mandatory review gate (all UI work)
Every change touching `.tsx .css .html .ts` UI files passes the Impeccable reviewer before the turn ends:
1. Run `.claude/skills/impeccable/scripts/impeccable context` once per session.
2. Read `.claude/skills/impeccable/reference/craft-floor.md` before the first UI edit.
3. Hooks in `.claude/settings.json` run the detector on Edit/Write and on Stop. Fix every finding. Never add ignores to push a write through.
4. Finish with `/impeccable audit` or `/impeccable critique` on the touched surface.

## Design rules that override skill defaults
- Ground is paper (#f7f5f0), ink is navy (#0f1a2e), rail is navy-900, copper is the only accent and never a fill.
- Fraunces at weight 400 for every heading and hero figure. Never bold serif. Never a second display face.
- Mono uppercase tracked labels for eyebrows, axis labels, identifiers. Tabular numerals on every number.
- Radius 0 except pills on badges. Hairlines and register lines separate content; cards are not the default container.
- No glow, no colored shadow, no blur, no glass, no gradient other than `copper-rule` and `seal-wash`.
- Motion is `ease-brand` at `dur-base`, entry and data change only, honors `prefers-reduced-motion`. The gc-hq-new opening animation is not recreated here.

## Taste-skill dials (locked)
`design-taste-frontend` and `-v1` run at `DESIGN_VARIANCE: 4 / MOTION_INTENSITY: 3 / VISUAL_DENSITY: 6`. Editorial, column-locked, structured. The design read does not override these.
Active design skills: `impeccable`, `design-taste-frontend`, `web-design-guidelines`. Other bundled taste-skill presets (`gpt-taste`, `minimalist-ui`, `high-end-visual-design`, `brandkit`, `imagegen-*`, `image-to-code`, `industrial-brutalist-ui`, `stitch-design-taste`, `redesign-existing-projects`, `full-output-enforcement`) are installed but not active; do not load them unless asked.

## Data
Analytical reads (awards, obligations, recipients, expiring contracts, lookalikes) go to the core-x query sidecar first via the `sidecar-query` skill; map at `core-x/docs/reference/QUERY_SIDECAR_AGENT_GUIDE.md`. Lance under `s3://data-sink/active/` is the write-side system of record. No data pipelines live in this repo.

## Content (Sanity)
Editorial pieces live in the Sanity content lake (project `5e8csiu1`, dataset `production`). The Studio is in `studio/` (`npm run studio`), schema in `studio/schemaTypes`, desk structure in `studio/structure.ts`. Every published page is a `piece`: prose plus `dataBlock`, `awardRef`, and `pullQuote` objects. Numbers in a data block are frozen at the moment they were taken from the sidecar (`result` + `takenAt`); refreshing is a deliberate editorial act, never a page-load behavior. The site reads through `src/lib/sanity.ts` with GROQ; Portable Text renders through a serializer mapped to the gc-hq components so DESIGN.md governs CMS content. Sanity is never a mirror of sidecar data. Tokens go in Doppler or a gitignored `.env`, never in source or chat.
