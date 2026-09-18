import { NavLink, Link } from "react-router-dom"
import { cn } from "@/lib/cn"
import { Band } from "./Band"
import { FORMATS } from "@/content/formats"

function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="14" cy="14" r="11.5" /><circle cx="14" cy="14" r="8.5" />
      <path d="M14 8.5 L15.5 12.2 L19.4 12.5 L16.4 15.1 L17.3 18.9 L14 16.9 L10.7 18.9 L11.6 15.1 L8.6 12.5 L12.5 12.2 Z" />
    </svg>
  )
}

/** Masthead: centered wordmark with the seal at left · section bar of formats. */
export default function SiteHeader() {
  return (
    <header className="masthead bg-background">
      <Band as="div" className="grid grid-cols-1 items-center gap-6 py-7 lg:grid-cols-[14rem_1fr_14rem]">
        <div className="hidden lg:block">
          <Seal className="h-11 w-11 text-copper-500" />
        </div>
        <Link to="/" className="block min-w-0 text-center">
          <span className="font-display block whitespace-nowrap text-[clamp(1.75rem,4vw,4.5rem)] uppercase leading-none tracking-[0.02em] text-foreground">Government Contracted</span>
        </Link>
        <div className="hidden lg:block" />
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
