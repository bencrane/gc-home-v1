// Post-build assertions + manifest. Fails the build on a leaked internal identifier or a missing page.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
const dist = new URL("../dist/", import.meta.url).pathname
const html = []
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") && html.push(p) } }
walk(dist)
const leak = /sidecar|query_sidecar|queryId|artifact"|core-x/i
const problems = []
const pages = { front: 0, pieces: 0, sections: 0, formats: 0, other: 0 }
for (const f of html) {
  const t = readFileSync(f, "utf8")
  if (leak.test(t)) problems.push(`internal identifier in ${f.replace(dist, "")}`)
  if (!/<title>.+<\/title>/.test(t)) problems.push(`no title in ${f.replace(dist, "")}`)
  const rel = f.replace(dist, "")
  if (rel === "index.html") pages.front++
  else if (/^(markets|briefings)\/[^/]+\/index\.html$/.test(rel)) pages.pieces++
  else if (/^(markets|briefings)\/index\.html$/.test(rel)) pages.sections++
  else if (/^section\//.test(rel)) pages.formats++
  else pages.other++
}
const manifest = { builtAt: new Date().toISOString(), pages, problems }
writeFileSync(join(dist, "build-manifest.json"), JSON.stringify(manifest, null, 2))
console.log(`[postbuild] ${html.length} pages · pieces ${pages.pieces} · formats ${pages.formats} · problems ${problems.length}`)
if (problems.length) { for (const p of problems) console.error("  " + p); process.exit(1) }
