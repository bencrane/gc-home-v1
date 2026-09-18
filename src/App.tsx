import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppShell from "@/components/site/AppShell"
import Front from "@/pages/Front"
import SectionIndex from "@/pages/SectionIndex"
import PiecePage from "@/pages/PiecePage"
import About from "@/pages/About"
import Gallery from "@/pages/Gallery"
import FormatIndex from "@/pages/FormatIndex"

const router = createBrowserRouter([
  { path: "/gallery", element: <Gallery /> },
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <Front /> },
      { path: "/about", element: <About /> },
      { path: "/section/:format", element: <FormatIndex /> },
      { path: "/:section", element: <SectionIndex /> },
      { path: "/:section/:slug", element: <PiecePage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
