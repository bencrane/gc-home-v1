import { NavLink } from "react-router-dom"
import { cn } from "@/lib/cn"
import Wordmark from "./Wordmark"
import { Band } from "./Band"

const NAV = [
  { to: "/markets", label: "Markets" },
  { to: "/briefings", label: "Briefings" },
  { to: "/about", label: "About" },
] as const

const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })

/** Masthead: dateline strip and wordmark. Section nav lives in the rail at lg+, inline below it. */
export default function SiteHeader() {
  return (
    <header className="masthead border-b border-line bg-background">
      <Band as="div" className="flex h-9 items-center justify-between border-b border-line">
        <span className="font-mono text-mono-label uppercase text-foreground-subtle">{today}</span>
        <span className="hidden font-mono text-mono-label uppercase text-foreground-subtle sm:inline">Federal procurement, read from the record</span>
      </Band>
      <Band as="div" className="flex h-16 items-center justify-between">
        <Wordmark />
        <nav aria-label="Primary" className="flex items-center gap-6">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => cn("text-eyebrow font-sans uppercase transition-colors", item.to !== "/about" && "lg:hidden", isActive ? "text-copper-600" : "text-foreground hover:text-navy-600")}>{item.label}</NavLink>
          ))}
        </nav>
      </Band>
    </header>
  )
}
