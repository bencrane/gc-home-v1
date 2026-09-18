/** Fixed left rail — navy band carrying the seal and numbered section
 *  anchors. Desktop only; collapses away below lg so mobile keeps the
 *  full-width flow. Content offsets itself via lg:pl-[var(--rail-w)]. */

/** Section anchors return when the page has sections again. */
const RAIL_SECTIONS: { n: string; href: string; label: string }[] = [];

function Seal({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="14" cy="14" r="11.5" />
      <circle cx="14" cy="14" r="8.5" />
      <path d="M14 8.5 L15.5 12.2 L19.4 12.5 L16.4 15.1 L17.3 18.9 L14 16.9 L10.7 18.9 L11.6 15.1 L8.6 12.5 L12.5 12.2 Z" />
    </svg>
  );
}

export default function SideRail() {
  return (
    /* The navy paints the full-height grid track, so the column never ends
       before the page does; only the inner rail content is viewport-sticky. */
    <div className="hidden border-r border-navy-800 bg-navy-900 lg:block">
      <aside
        className="sticky top-0 z-40 flex h-dvh flex-col items-center justify-between pb-6"
        aria-label="Section navigation"
      >
      {/* Top block matches the header's h-16 so the two seals share a centerline. */}
      <a href="#top" aria-label="Top" className="flex h-16 items-center">
        <Seal className="h-7 w-7 text-copper-300 transition-colors hover:text-copper-50" />
      </a>

      <nav className="flex flex-col items-center gap-8">
        {RAIL_SECTIONS.map((s) => (
          <a
            key={s.n}
            href={s.href}
            aria-label={s.label}
            className="font-mono text-mono-data tabular-nums text-slate-400 transition-colors hover:text-copper-300"
          >
            {s.n}
          </a>
        ))}
      </nav>

        <Seal className="h-6 w-6 text-navy-700" />
      </aside>
    </div>
  );
}
