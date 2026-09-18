import { Outlet, ScrollRestoration } from "react-router-dom"
import SideRail from "./SideRail"
import SiteHeader from "./SiteHeader"
import SiteFooter from "./SiteFooter"

/** Rail + document. The rail column is a real grid track so the navy runs the page's full height. */
export default function AppShell() {
  return (
    <div id="top" className="grid min-h-dvh grid-cols-1 lg:grid-cols-[var(--rail-w)_1fr]">
      <SideRail />
      <div className="min-w-0">
        <SiteHeader />
        <main><Outlet /></main>
        <SiteFooter />
      </div>
      <ScrollRestoration />
    </div>
  )
}
