import { NavLink, Link } from "react-router-dom"
import { cn } from "@/lib/cn"
import Wordmark from "./Wordmark"
import { Band } from "./Band"

const SECTIONS = [
  { to: "/markets", label: "Markets" },
  { to: "/briefings", label: "Briefings" },
] as const

const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })

/** Masthead in three rules: dateline strip (with About), wordmark row, section bar. */
export default function SiteHeader() {
  return (
    <header className="masthead bg-background">
      <Band as="div" className="flex h-9 items-center justify-between border-b border-line">
        <span className="font-mono text-mono-label uppercase text-foreground-subtle">{today}</span>
        <div className="flex items-center gap-6">
          <span className="hidden font-mono text-mono-label uppercase text-foreground-subtle md:inline">Federal procurement, read from the record</span>
          <Link to="/about" className="font-mono text-mono-label uppercase text-foreground-subtle hover:text-navy-900">About</Link>
        </div>
      </Band>
      <Band as="div" className="flex h-16 items-center">
        <Wordmark />
      </Band>
      <div className="sticky top-0 z-50 border-y border-line bg-background">
        <Band as="nav" aria-label="Sections" className="flex h-10 items-center gap-8">
          {SECTIONS.map((s) => (
            <NavLink key={s.to} to={s.to} className={({ isActive }) => cn("text-eyebrow font-sans uppercase transition-colors", isActive ? "text-copper-600" : "text-foreground hover:text-navy-600")}>{s.label}</NavLink>
          ))}
        </Band>
      </div>
    </header>
  )
}
