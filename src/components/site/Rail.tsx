import { NavLink } from "react-router-dom"
import { cn } from "@/lib/cn"

const SECTIONS = [
  { to: "/markets", label: "Markets" },
  { to: "/briefings", label: "Briefings" },
] as const

function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="14" cy="14" r="11.5" /><circle cx="14" cy="14" r="8.5" />
      <path d="M14 8.5 L15.5 12.2 L19.4 12.5 L16.4 15.1 L17.3 18.9 L14 16.9 L10.7 18.9 L11.6 15.1 L8.6 12.5 L12.5 12.2 Z" />
    </svg>
  )
}

/** The navy rail: seal at top, section names set vertically, seal at the foot. The page's spine.
 *  A real grid track (see AppShell) so it runs the full page height; its content is viewport-sticky. */
export default function Rail() {
  return (
    <div className="hidden bg-navy-900 lg:block">
      <aside className="sticky top-0 flex h-dvh flex-col items-center justify-between py-6" aria-label="Sections">
        <NavLink to="/" aria-label="Front page" className="text-copper-300 transition-colors hover:text-copper-100"><Seal className="h-7 w-7" /></NavLink>
        <nav className="flex flex-col items-center gap-10">
          {SECTIONS.map((s) => (
            <NavLink key={s.to} to={s.to} className={({ isActive }) => cn("font-mono text-eyebrow uppercase transition-colors [writing-mode:vertical-rl]", isActive ? "text-copper-300" : "text-slate-400 hover:text-copper-200")}>{s.label}</NavLink>
          ))}
        </nav>
        <Seal className="h-6 w-6 text-navy-700" />
      </aside>
    </div>
  )
}
