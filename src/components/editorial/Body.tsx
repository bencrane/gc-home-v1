import type { Block } from "@/content/types"
import { Ledger } from "./Ledger"
import { Figures } from "./Figures"
import { Chart } from "./Chart"
import { Heading } from "@/components/primitives"

/** Renders a piece body. Data blocks break out of the prose measure to the content width. */
export function Body({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-[var(--w-prose)]">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "p": return <p key={i} className="mt-6 text-body-lg text-foreground first:mt-0">{b.text}</p>
          case "h2": return <Heading key={i} level={3} className="mt-12">{b.text}</Heading>
          case "ledger": return <Ledger key={i} spec={b} />
          case "figures": return <Figures key={i} spec={b} />
          case "chart": return <Chart key={i} spec={b} />
        }
      })}
    </div>
  )
}
