import satori from "satori"
import { Resvg } from "@resvg/resvg-js"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import type { Piece } from "@/content/types"
import { keyFigure } from "@/components/editorial/FigureWell"
import { dateShort } from "@/lib/format"

const require = createRequire(import.meta.url)
const font = (pkg: string) => readFileSync(require.resolve(pkg))
const fonts = [
  { name: "Fraunces", data: font("@fontsource/fraunces/files/fraunces-latin-400-normal.woff"), weight: 400 as const, style: "normal" as const },
  { name: "Inter", data: font("@fontsource/inter/files/inter-latin-400-normal.woff"), weight: 400 as const, style: "normal" as const },
  { name: "Inter", data: font("@fontsource/inter/files/inter-latin-600-normal.woff"), weight: 600 as const, style: "normal" as const },
]

/** 1200×630 preview card: kicker, headline in Fraunces, key figure, wordmark. Navy field, paper type, copper rule. */
export async function renderOg(piece: Piece): Promise<Buffer> {
  const k = keyFigure(piece)
  const h = (type: string, props: Record<string, unknown>, ...children: unknown[]) => ({ type, props: { ...props, children: children.length === 0 ? undefined : children.length === 1 ? children[0] : children } })
  const tree = h("div", { style: { width: 1200, height: 630, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#0f1a2e", color: "#f7f5f0", fontFamily: "Inter" } },
    h("div", { style: { display: "flex", flexDirection: "column" } },
      h("div", { style: { fontSize: 20, letterSpacing: 3, textTransform: "uppercase", color: "#d3a96b", fontWeight: 600 } }, piece.publishedAt ? `${piece.formatName}  ·  ${dateShort(piece.publishedAt)}` : piece.formatName),
      h("div", { style: { marginTop: 28, fontFamily: "Fraunces", fontSize: piece.title.length > 60 ? 56 : 66, lineHeight: 1.08, letterSpacing: -1, maxWidth: 1040 } }, piece.title),
    ),
    h("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between" } },
      k ? h("div", { style: { display: "flex", flexDirection: "column" } },
        h("div", { style: { fontFamily: "Fraunces", fontSize: 72, lineHeight: 1 } }, k.value),
        h("div", { style: { marginTop: 10, width: 48, height: 2, background: "#bf8847" } }),
        h("div", { style: { marginTop: 10, fontSize: 18, letterSpacing: 2, textTransform: "uppercase", color: "#bccde0" } }, k.label.slice(0, 48)),
      ) : h("div", {}),
      h("div", { style: { fontFamily: "Fraunces", fontSize: 30, letterSpacing: 1, textTransform: "uppercase" } }, "Government Contracted"),
    ),
  )
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts })
  return new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng()
}
