import { VARIANTS, DEFAULT_VARIANT } from "@/variants"

const KEY = "gc.variant"

/** Resolve the active variant: ?v= wins and is remembered; otherwise the remembered one; otherwise base. */
export function applyVariant(): string {
  let id = DEFAULT_VARIANT
  try {
    const params = new URLSearchParams(window.location.search)
    const q = params.get("v")
    const preview = params.get("preview") === "1" // gallery thumbnails: never persist
    const stored = window.localStorage.getItem(KEY)
    id = q ?? stored ?? DEFAULT_VARIANT
    if (q && !preview) window.localStorage.setItem(KEY, q)
  } catch { /* storage unavailable: fall through to base */ }
  if (!VARIANTS.some((v) => v.id === id)) id = DEFAULT_VARIANT
  document.documentElement.dataset.variant = id
  return id
}

export function setVariant(id: string) {
  try { window.localStorage.setItem(KEY, id) } catch { /* ignore */ }
  document.documentElement.dataset.variant = id
}
