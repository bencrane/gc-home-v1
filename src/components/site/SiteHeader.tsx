import { cn } from "@/lib/cn"
import { Band } from "./Band"
import { FORMATS } from "@/content/formats"

/** Masthead: centered wordmark with the seal at left · section bar of formats. */
export default function SiteHeader({ currentPath = "/" }: { currentPath?: string }) {
  return (
    <header className="masthead bg-background">
      <Band as="div" className="flex h-[var(--masthead-h)] items-center">
        <a href="/" className="block w-full min-w-0 text-center">
          <span className="font-display block whitespace-nowrap text-wordmark uppercase text-foreground">Government Contracted</span>
        </a>
      </Band>
      <div className="sticky top-0 z-50 border-y border-foreground bg-background">
        <Band as="nav" aria-label="Sections" className="flex h-12 items-center justify-center overflow-x-auto">
          {FORMATS.map((f, i) => (
            <span key={f.id} className="flex items-center">
              {i > 0 && <span aria-hidden className="mx-4 h-4 w-px bg-foreground/60" />}
              <a href={`/section/${f.id}`} aria-current={currentPath.startsWith(`/section/${f.id}`) ? "page" : undefined} className={cn("whitespace-nowrap font-serif text-body uppercase tracking-[0.06em] transition-colors", currentPath.startsWith(`/section/${f.id}`) ? "text-copper-600" : "text-foreground hover:text-navy-600")}>{f.name}</a>
            </span>
          ))}
        </Band>
      </div>
    </header>
  )
}
