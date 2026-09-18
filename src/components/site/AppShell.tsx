import { Outlet, ScrollRestoration } from "react-router-dom"
import Rail from "./Rail"
import SiteHeader from "./SiteHeader"
import SiteFooter from "./SiteFooter"

/** Rail is a 4.5rem grid track at lg+; the document takes the rest. */
export default function AppShell() {
  return (
    <div id="top" className="grid min-h-dvh grid-cols-1 bg-background text-foreground lg:grid-cols-[4.5rem_1fr]">
      <Rail />
      <div className="min-w-0">
        <SiteHeader />
        <main><Outlet /></main>
        <SiteFooter />
      </div>
      <ScrollRestoration />
    </div>
  )
}
