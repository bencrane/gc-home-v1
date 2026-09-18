import { NavLink, Link } from "react-router-dom"
import { cn } from "@/lib/cn"
import { Band } from "./Band"
import { FORMATS } from "@/content/formats"

const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })

function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="14" cy="14" r="11.5" /><circle cx="14" cy="14" r="8.5" />
      <path d="M14 8.5 L15.5 12.2 L19.4 12.5 L16.4 15.1 L17.3 18.9 L14 16.9 L10.7 18.9 L11.6 15.1 L8.6 12.5 L12.5 12.2 Z" />
    </svg>
  )
}

const utilLink = ({ isActive }: { isActive: boolean }) => cn("text-eyebrow font-sans uppercase transition-colors", isActive ? "text-copper-600" : "text-foreground hover:text-navy-600")

/** Masthead: utility strip · centered wordmark with the dateline plate at left · section bar of formats. */
export default function SiteHeader() {
  return (
    <header className="masthead bg-background">
      <Band as="div" className="flex h-12 items-center justify-between border-b border-foreground">
        <nav aria-label="Primary" className="flex items-center gap-6">
          <NavLink to="/markets" className={utilLink}>Markets</NavLink>
          <NavLink to="/briefings" className={utilLink}>Briefings</NavLink>
        </nav>
        <NavLink to="/about" className={utilLink}>About</NavLink>
      </Band>
      <Band as="div" className="relative py-8">
        <div className="hidden lg:absolute lg:left-[var(--spacing-gutter)] lg:top-1/2 lg:block lg:-translate-y-1/2">
          <Seal className="h-12 w-12 text-copper-500" />
          <p className="mt-3 max-w-[13rem] font-serif text-body leading-snug text-foreground">Federal procurement, read from the record.</p>
          <p className="mt-1 font-mono text-mono-label uppercase text-foreground-subtle">{today}</p>
        </div>
        <Link to="/" className="block text-center">
          <span className="font-display block text-[clamp(2.75rem,6.4vw,7rem)] uppercase leading-none tracking-[0.02em] text-foreground">Government Contracted</span>
        </Link>
      </Band>
      <div className="sticky top-0 z-50 border-y border-foreground bg-background">
        <Band as="nav" aria-label="Sections" className="flex h-12 items-center justify-center overflow-x-auto">
          {FORMATS.map((f, i) => (
            <span key={f.id} className="flex items-center">
              {i > 0 && <span aria-hidden className="mx-4 h-4 w-px bg-foreground/60" />}
              <NavLink to={`/section/${f.id}`} className={({ isActive }) => cn("whitespace-nowrap font-serif text-body uppercase tracking-[0.06em] transition-colors", isActive ? "text-copper-600" : "text-foreground hover:text-navy-600")}>{f.name}</NavLink>
            </span>
          ))}
        </Band>
      </div>
    </header>
  )
}
