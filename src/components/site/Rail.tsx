
function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="14" cy="14" r="11.5" /><circle cx="14" cy="14" r="8.5" />
      <path d="M14 8.5 L15.5 12.2 L19.4 12.5 L16.4 15.1 L17.3 18.9 L14 16.9 L10.7 18.9 L11.6 15.1 L8.6 12.5 L12.5 12.2 Z" />
    </svg>
  )
}

/** The navy rail: the seal at top, a mark at the foot. The page's spine; navigation lives in the masthead.
 *  A real grid track (see AppShell) so it runs the full page height; its content is viewport-sticky. */
export default function Rail() {
  return (
    <div className="hidden bg-navy-900 lg:block">
      <aside className="sticky top-0 flex h-dvh flex-col items-center justify-between pb-8" aria-label="Site">
        <a href="/" aria-label="Front page" className="flex h-[var(--masthead-h)] items-center text-copper-300 transition-colors hover:text-copper-100"><Seal className="h-12 w-12" /></a>
        <span className="h-px w-6 bg-navy-700" aria-hidden />
        <Seal className="h-7 w-7 text-navy-700" />
      </aside>
    </div>
  )
}
