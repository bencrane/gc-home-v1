import { NavLink, Link } from "react-router-dom"
import { cn } from "@/lib/cn"
import { Band } from "./Band"

const SECTIONS = [
  { to: "/markets", label: "Markets" },
  { to: "/briefings", label: "Briefings" },
  { to: "/about", label: "About" },
] as const

const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })

function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="14" cy="14" r="11.5" /><circle cx="14" cy="14" r="8.5" />
      <path d="M14 8.5 L15.5 12.2 L19.4 12.5 L16.4 15.1 L17.3 18.9 L14 16.9 L10.7 18.9 L11.6 15.1 L8.6 12.5 L12.5 12.2 Z" />
    </svg>
  )
}

/** Masthead: the wordmark at display weight with the dateline, then one section bar. */
export default function SiteHeader() {
  return (
    <header className="masthead bg-background">
      <Band as="div" className="flex items-end justify-between pb-4 pt-7">
        <Link to="/" className="flex items-center gap-3 text-foreground">
          <Seal className="h-8 w-8 text-copper-500" />
          <span className="font-display text-h2 leading-none">Government Contracted</span>
        </Link>
        <span className="hidden font-mono text-mono-label uppercase text-foreground-subtle sm:inline">{today}</span>
      </Band>
      <div className="sticky top-0 z-50 border-y border-line bg-background">
        <Band as="nav" aria-label="Sections" className="flex h-10 items-center gap-8">
          {SECTIONS.map((s) => (
            <NavLink key={s.to} to={s.to} className={({ isActive }) => cn("text-eyebrow font-sans uppercase transition-colors", s.to === "/about" && "ml-auto", isActive ? "text-copper-600" : "text-foreground hover:text-navy-600")}>{s.label}</NavLink>
          ))}
        </Band>
      </div>
    </header>
  )
}
