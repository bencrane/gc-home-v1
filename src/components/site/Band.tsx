import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

/** The page column. Full width to --w-wide with the page gutter. Vertical rhythm is the caller's. */
export function Band({ children, className, as: Tag = "section" }: { children: ReactNode; className?: string; as?: "section" | "div" | "header" | "footer" | "nav" | "aside" | "article" }) {
  return <Tag className={cn("mx-auto w-full max-w-[var(--w-wide)] px-gutter", className)}>{children}</Tag>
}
