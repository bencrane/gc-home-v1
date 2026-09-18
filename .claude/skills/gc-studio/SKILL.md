---
name: gc-studio
description: Start, open, and verify the Government Contracted Sanity Studio and the Vite site locally in the browser pane; validate the content schema after edits. Use when the operator says "/gc-studio", "start the studio", "open the studio", "run the site", "start the site", "validate the schema", or when a task edits anything under studio/schemaTypes or studio/structure.ts.
---

# gc-studio

Runs the two local servers for gc-home-v1 and checks them. Never asks the operator to run these commands by hand; the browser pane does it.

## Servers

Both are defined in `.claude/launch.json` at the repo root. The `preview_start` tool reads that file from the session's working directory; when the session runs in a worktree, copy the same file to `<worktree>/.claude/launch.json` with absolute `--prefix` paths to the base repo before starting.

| name   | command                | port | what                                  |
|--------|------------------------|------|---------------------------------------|
| studio | `npm run studio`       | 3333 | Sanity Studio (project 5e8csiu1, production) |
| site   | `npm run dev`          | 5173 | Vite site                             |

## Flow: start the studio

1. `preview_start` with name `studio`. Reuse if already running.
2. Wait 3s, then `get_page_text`.
   - Text contains "Choose login provider": the Studio is up and needs the operator's sign-in. Say so in one line and stop. Do not attempt to sign in.
   - Text contains "All pieces" or "Government Contracted" with desk items: signed in. Continue with whatever the task was.
   - Anything else: read `preview_logs` for the studio server and fix the error before reporting.

## Flow: start the site

1. `preview_start` with name `site`.
2. Wait 2s, `get_page_text`, then a screenshot. Report the first viewport. The impeccable review gate in CLAUDE.md applies to any UI change verified this way.

## Flow: after a schema change

Any edit under `studio/schemaTypes/` or `studio/structure.ts` ends with both:

```bash
cd studio && npx tsc --noEmit && npx sanity schema validate
```

Zero errors is the bar. A running Studio hot-reloads the schema; refresh the pane and confirm the new field or desk item appears before reporting.

## Content model, for reference

- `piece` is the only page type: section markets or briefings, status draft/review/published/corrected, Portable Text body.
- Body objects: `dataBlock` (sidecar queryId, params, frozen `result`, `takenAt`, presentation ledger/figures/chart), `awardRef` (PIID or UEI with frozen summary), `pullQuote`.
- Numbers are frozen at the time they were taken. Refreshing a block is a deliberate editorial act that rewrites `result` and `takenAt`. The site never calls the sidecar from the browser.
- Desk structure: All pieces, Markets by status, Briefings by status, Series, Authors.

## Never

- Never paste or request Sanity tokens in chat. Read tokens live in Doppler or a gitignored `.env`.
- Never sign in to the Studio on the operator's behalf.
- Never run `sanity deploy`, `sanity dataset` mutations, or `sanity documents delete` unless the operator asked for that exact action in this session.
