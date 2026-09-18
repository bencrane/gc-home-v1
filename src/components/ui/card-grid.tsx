import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * CardGrid — the one way cards sit in rows.
 *
 * Owns the grid geometry so pages can't drift: fixed gap-6 rhythm, equal-height
 * rows (grid stretch — never `items-start`; a card's internals pin content with
 * flex, the row never sizes independently). Columns are the only choice.
 */
export function CardGrid({
  cols = 3,
  className,
  children,
}: {
  cols?: 2 | 3
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("grid gap-6", cols === 2 ? "grid-cols-2" : "grid-cols-3", className)}>
      {children}
    </div>
  )
}
