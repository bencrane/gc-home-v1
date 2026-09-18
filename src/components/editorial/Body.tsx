import type { Block } from "@/content/types"
import { Ledger } from "./Ledger"
import { Figures } from "./Figures"
import { Chart } from "@/components/charts/Chart"
import { Heading } from "@/components/primitives"

/** Renders a piece body. Prose holds the reading measure; tables and charts span the article column. */
export function Body({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "p": return <p key={i} className="mt-6 max-w-[var(--w-prose)] text-body-lg text-foreground first:mt-0">{b.text}</p>
          case "h2": return <Heading key={i} level={3} className="mt-12 max-w-[var(--w-prose)]">{b.text}</Heading>
          case "ledger": return <Ledger key={i} spec={b} />
          case "figures": return <Figures key={i} spec={b} />
          case "chart": return <Chart key={i} spec={b} width={960} />
        }
      })}
    </div>
  )
}
