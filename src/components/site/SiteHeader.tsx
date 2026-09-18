import { NavLink } from "react-router-dom"
import { cn } from "@/lib/cn"
import Wordmark from "./Wordmark"

const NAV = [
  { to: "/markets", label: "Markets" },
  { to: "/briefings", label: "Briefings" },
  { to: "/about", label: "About" },
] as const

function navLinkClass({ isActive }: { isActive: boolean }) {
  return cn("text-eyebrow font-sans uppercase transition-colors", isActive ? "text-copper-600" : "text-slate-500 hover:text-navy-900")
}

/** Masthead: wordmark left, section nav right. Sticky, paper, hairline. No blur (DESIGN.md). */
export default function SiteHeader() {
  return (
    <header className="masthead sticky top-0 z-50 border-b border-line bg-background">
      <div className="mx-auto flex h-16 max-w-[var(--w-wide)] items-center justify-between gap-6 px-gutter">
        <Wordmark />
        <nav aria-label="Primary" className="flex items-center gap-6 sm:gap-8">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>{item.label}</NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
