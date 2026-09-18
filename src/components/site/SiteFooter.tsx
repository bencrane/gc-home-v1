import { Band } from "./Band"

/** One row under a navy rule. Nothing else. */
export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t-2 border-navy-900 bg-background">
      <Band as="div" className="flex flex-col gap-2 py-6 font-mono text-mono-provenance text-foreground-subtle md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Government Contracted</p>
        <p>Independent. Not affiliated with SAM.gov, GSA, or any federal agency.</p>
      </Band>
    </footer>
  )
}
