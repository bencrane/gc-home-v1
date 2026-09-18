# HANDOVER — gc-home-v1

Written 2026-09-18 from the repository at commit `982a83a` and from live API reads. Every line states where it can be re-verified. Nothing below is an assessment.

## 1. Repository

| Item | Value | Verify |
|---|---|---|
| Remote | `https://github.com/bencrane/gc-home-v1.git` (public) | `git remote -v` |
| Default branch | `main` | `git branch -r` |
| Commits on main | 63 | `git log --oneline \| wc -l` |
| Head | `982a83a docs: webhook live; Vercel is production` | `git log -1 --oneline` |
| Working tree | clean except `.gitignore` (adds `.vercel`) | `git status --short` |

## 2. Stack (from `package.json`)

- Runtime dependencies: `astro`, `@astrojs/react`, `react`, `react-dom`, `tailwindcss`, `@base-ui/react`, `@observablehq/plot`, `linkedom`, `satori`, `@resvg/resvg-js`, `@sanity/client`, `@portabletext/react`, `@fontsource-variable/{fraunces,inter,jetbrains-mono}`, `@fontsource/{fraunces,inter}`, `class-variance-authority`, `clsx`, `cmdk`, `lucide-react`, `next-themes`, `sonner`, `tailwind-merge`.
- Dev dependencies: `@astrojs/check`, `@tailwindcss/vite`, `@types/{node,react,react-dom}`, `tsx`, `typescript`, `vite`, `vitest`, `zod`.
- Not present in `package.json`: echarts, tremor, gsap, remotion, hyperframes, react-router.
- Scripts: `dev` (astro dev), `build` (`astro check && astro build && node scripts/postbuild.mjs`), `preview`, `studio`, `studio:deploy`, `test` (`vitest run`).
- `astro.config.mjs`: `output: "static"`, `site` from `SITE_URL` (default `https://gc-home.onrender.com`), `base` from `SITE_BASE` (default `/`), `trailingSlash: "ignore"`, integrations `react()`, vite plugin `tailwindcss()`.

## 3. Content source

| Item | Value | Verify |
|---|---|---|
| Sanity project / dataset | `5e8csiu1` / `production` | `studio/sanity.config.ts` |
| Dataset visibility | public (unauthenticated GROQ query returns results) | `curl "https://5e8csiu1.api.sanity.io/v2026-09-01/data/query/production?query=count(*[_type==%22piece%22])"` |
| Published pieces | 18 (`status in ["published","corrected"]`) | same endpoint with the status filter |
| Pieces per format | record 3, flows 3, expiring 3, subunder 3, whowon 3, wage 3 | `src/data/pieces.snapshot.json` |
| Pieces per section | markets 12, briefings 6 | same file |
| Build read path | `src/lib/sanity.ts` (client, `useCdn: false`, `PIECE_QUERY`) → `src/lib/serialize.ts` (Portable Text + `dataBlock` → `Piece`; copies only `form, heading, label, value, valueFormat, sub, delta, date, a, b, aName, bName, figures, source`; parses `result` JSON to `{takenAt, columns, rows}`) → `src/lib/schema.ts` `parsePiece` (zod) → `src/lib/content.ts` `getPieces()` (one fetch per build; throws on 0 pieces or any format with 1–2 pieces) | read the four files |
| Fixture content in repo | none. `src/content/pieces.ts` and `src/fixtures/` deleted in `b9ffb7d` | `git show --stat b9ffb7d` |
| Test snapshot | `src/data/pieces.snapshot.json`, 18 pieces, written by `node --import tsx scripts/export-pieces.ts` | run the script; `git diff` shows drift |
| Studio schemas | `studio/schemaTypes/documents/{piece,author,series}.ts`, `studio/schemaTypes/blocks/{dataBlock,awardRef,pullQuote}.ts`, `studio/structure.ts` | files |
| Studio local | `npm run studio` on port 3333 (`.claude/launch.json`) | run it |
| Studio hosted deploy | not verified in this handover | `npm run studio:deploy` status unknown |

Internal provenance fields on `dataBlock` (`queryId`, `params`, `artifact`) exist in the Studio schema (group "internal") and are excluded by `serialize.ts`. `scripts/postbuild.mjs` scans `dist/**/*.html` for `/sidecar|query_sidecar|queryId|artifact"|core-x/` and exits non-zero on a hit.

## 4. Build output (last local build, `dist/build-manifest.json`, builtAt `2026-09-18T03:10:35Z`)

| Page class | Count |
|---|---|
| front | 1 |
| pieces | 18 |
| sections | 2 |
| formats | 6 |
| agencies | 16 |
| sectors | 60 |
| other (about, gallery) | 2 |
| total | 105 |
| leak-check problems | 0 |

Tests: `npx vitest run` → 14 passed across `tests/schema.test.ts`, `tests/format.test.ts`, `tests/charts.test.ts`. `npx astro check` → 0 errors.

Reference pages read `src/data/reference.json`, `src/data/agencies.json`, `src/data/naics3.json` (committed sidecar exports; queries in `docs/formats/queries.sql`) through `src/lib/reference.ts`. These files are not refreshed by the build.

OG images: `src/pages/og/[slug].png.ts` and `src/pages/og/default.png.ts` render via `src/lib/og.ts` (satori + resvg, static Fraunces/Inter woff). Meta tags in `src/layouts/Base.astro`.

## 5. Hosting (live reads at time of writing)

| Host | URL | Status | Trigger | Verify |
|---|---|---|---|---|
| Vercel (production) | `https://gc-home-v1.vercel.app` | 200; latest production deployment READY at commit `982a83a` | Git integration: `bencrane/gc-home-v1`, production branch `main` | `npx vercel ls`, Vercel API `GET /v9/projects/gc-home-v1` |
| GitHub Pages | `https://bencrane.github.io/gc-home-v1/` | 200 | `.github/workflows/deploy.yml` on push to `main`, builds with `SITE_URL=https://bencrane.github.io SITE_BASE=/gc-home-v1` | `gh run list` |
| Render static site | `https://gc-home.onrender.com/` | 200 | Render's own Git hook | Render dashboard |

Vercel project facts (API): id `prj_I4Mbx1rAmx6mFSH9vcA7iMmKDAjZ`, team `team_gfbQ4C6lVx8Ji9VV5iu4PxLj`, framework `astro`, Node `24.x`. Environment variables present: `SITE_URL` (production only, value `https://gc-home-v1.vercel.app`), plus Sanity integration variables `VITE_SANITY_*`, `SANITY_API_*`, `SANITY_STUDIO_*`, `PUBLIC_SANITY_*` (values not read). `SITE_BASE` is not set. Rendered `og:url` on the Vercel front page is `https://gc-home-v1.vercel.app/`.

Deploy hook on the Vercel project: name `sanity-publish`, ref `main`. Its URL was written only to the Sanity webhook and never printed or committed.

## 6. Publish webhook (Sanity → Vercel)

| Field | Value |
|---|---|
| Sanity webhook id | `MCPRjoo2uqtLVQhs` |
| name | `vercel-rebuild` |
| dataset | `production` |
| target | the Vercel deploy hook `sanity-publish` |
| rule.on | `create, update, delete` |
| rule.filter | `_type == "piece" && status in ["published","corrected"]` |
| rule.projection | `{_id, "slug": slug.current}` |
| includeDrafts | false |

Verify: `GET https://api.sanity.io/v2021-10-04/hooks/projects/5e8csiu1` with a Sanity token (`SANITY_DEV_TOKEN` in Doppler `core-x`/`prd`). An end-to-end publish → deploy round trip has not been exercised yet; the only deployments so far were Git-triggered.

## 7. Secrets and tokens

- No token is committed. `.gitignore` excludes `.env`, `.env.*.local`, `.vercel`, `dist/`.
- `SANITY_DEV_TOKEN`: Doppler project `core-x`, config `prd`. Used only for `scripts/*` that write to Sanity and for the webhook registration. The site build needs no token (public dataset).
- Vercel CLI is logged in as `bencrane` on this machine; the token is in the CLI's own auth store.
- Sidecar token `QUERY_SIDECAR_TOKEN`: Doppler `core-x`/`prd` (used only when regenerating `src/data/*.json`).

## 8. Design system and enforcement

- `DESIGN.md` (329 lines) is the token contract; `src/index.css` is its executable form. `CLAUDE.md` (35 lines) states the enforcement rules and the taste dials (`DESIGN_VARIANCE 4 / MOTION_INTENSITY 3 / VISUAL_DENSITY 6`).
- Chart rules: `docs/design/CHARTS.md`. Renderers: `src/lib/plot.ts`, `src/components/charts/forms.ts` (forms `ranked`, `change`, `timeline`, `dumbbell`), `src/components/charts/Chart.tsx`.
- Front-page brief: `docs/design/FRONT_BRIEF.md`. Formats and editorial line: `docs/formats/FORMATS.md`.
- Impeccable hooks: `.claude/settings.json`. Installed skills: `ls .claude/skills` (34 directories including `gc-studio`, `impeccable`, `design-taste-frontend`, `hyperframes*`, `gsap-*`, `remotion-*`).

## 9. Open items (from `TODOS.md`)

- P1 · Card visual decision: figure well vs art on cards; the front currently renders figure wells on the first three Latest cards and art elsewhere (`src/views/Front.tsx`, `src/components/editorial/PieceCard.tsx`).
- P2 · Retire GitHub Pages and Render once a custom domain is on Vercel (`.github/workflows/deploy.yml`, Render service `gc-home`).
- P3 · RSS/JSON feed generated by Astro from Sanity content for beehiiv.
- Parked by operator decision: refresh rule and script for data blocks.

## 10. Commands

```bash
npm ci
npm run dev            # site, http://localhost:4321
npm run studio         # Sanity Studio, http://localhost:3333
npm run build          # astro check + build + leak check; writes dist/build-manifest.json
npm test               # vitest, 14 tests against src/data/pieces.snapshot.json
node --import tsx scripts/export-pieces.ts   # refresh the snapshot from Sanity
```
