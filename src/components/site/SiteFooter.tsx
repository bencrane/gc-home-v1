import Wordmark from "./Wordmark"
import { Band } from "./Band"

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t-2 border-navy-900 bg-background">
      <Band as="div" className="py-8">
        <Wordmark />
        <div className="mt-6 flex flex-col gap-2 border-t border-line pt-4 font-mono text-mono-provenance text-foreground-subtle md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Government Contracted</p>
          <p>Independent. Not affiliated with SAM.gov, GSA, or any federal agency. <a href="/about" className="text-copper-600 hover:text-navy-900">About</a> · <a href="/gallery" className="text-copper-600 hover:text-navy-900">Design gallery</a></p>
        </div>
      </Band>
    </footer>
  )
}
