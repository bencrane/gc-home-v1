# gc-home-v1 — Design Enforcement

## Source of truth
`DESIGN.md` (project root) is the ABSOLUTE authority for typography, spacing, and color tokens. No skill, preset, or model preference overrides it. Any token used in UI code must exist in DESIGN.md; if it does not, add it to DESIGN.md first, then use it.

## Mandatory review gate (all UI generation)
Every change that touches a UI file (`.tsx .jsx .html .vue .svelte .astro .css .scss .ts .js`) MUST pass the Impeccable reviewer before the turn ends:
1. Load `impeccable` context once per session: `.claude/skills/impeccable/scripts/impeccable context`.
2. Read `.claude/skills/impeccable/reference/craft-floor.md` before the first UI edit.
3. The PostToolUse/Stop hooks in `.claude/settings.json` run the detector automatically. Fix every finding. Never add ignores to push a write through.
4. Finish with `/impeccable audit` or `/impeccable critique` on the touched surface.

## Aesthetic lock (hard bans)
Ultra-matte, high-density financial terminal. Banned outright:
- Purple/violet gradients, mesh gradients, any `linear-gradient` / `radial-gradient` / `conic-gradient`.
- Glowing shadows, drop shadows, `box-shadow` beyond a 1px hairline, `filter: blur`, `backdrop-filter`, glassmorphism.
- Hero sections, centered marketing layouts, rounded-xl+ blobs, emoji, decorative illustration.
- Proportional numerals in data. All numbers: monospace, `font-variant-numeric: tabular-nums`, right-aligned.

## Taste-skill dials (locked)
`design-taste-frontend` (and `-v1`) run at `DESIGN_VARIANCE: 2 / MOTION_INTENSITY: 3 / VISUAL_DENSITY: 9`. The design read does not override these. Cockpit rules apply: no card boxes, 1px hairline separators, tight paddings.

Active design skills: `impeccable`, `design-taste-frontend`, `web-design-guidelines`. The other bundled taste-skill presets (`gpt-taste`, `minimalist-ui`, `high-end-visual-design`, `brandkit`, `imagegen-*`, `industrial-brutalist-ui`, `stitch-design-taste`) are installed but NOT active for this project; do not load them unless explicitly asked.

## Animation and composition scope
- `gsap` — data-visualization transitions only (value ticks, series draw-in, sort reorders). Duration ≤ 240ms, no easing overshoot, honor `prefers-reduced-motion`. Skills: `gsap-core`, `gsap-timeline`, `gsap-react`, `gsap-performance`.
- `remotion` — programmatic video renders of terminal views (reports, replays). Skills: `remotion-best-practices` (router).
- `hyperframes` — HTML composition and rendering of terminal panels/decks. Skills: `hyperframes` (router), `hyperframes-core`, `hyperframes-animation`.
None of these are used for decorative page motion.
