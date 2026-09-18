import { describe, it, expect } from "vitest"
import { parsePiece, assertPublic } from "@/lib/schema"
import { PIECES } from "@/content/pieces"

const base = PIECES[0]
describe("parsePiece", () => {
  it("accepts every seeded piece", () => { for (const p of PIECES) expect(() => parsePiece(p)).not.toThrow() })
  it("names the slug and path on failure", () => {
    expect(() => parsePiece({ ...base, body: [] })).toThrow(/Invalid piece ".*": body/)
  })
  it("rejects a frozen result with no rows", () => {
    const bad = { ...base, body: [{ kind: "ledger", heading: "x", data: { takenAt: "2026-09-17", columns: [], rows: [] }, label: "a", value: "b", valueFormat: "money", source: "s" }, { kind: "p", text: "prose" }] }
    expect(() => parsePiece(bad)).toThrow(/data.rows/)
  })
  it("rejects nil and empty input", () => {
    expect(() => parsePiece(null)).toThrow(); expect(() => parsePiece({})).toThrow()
  })
})
describe("assertPublic", () => {
  it("catches internal identifiers", () => { expect(() => assertPublic("via core-x query sidecar", "caption")).toThrow(/leaked/) })
  it("passes clean copy", () => { expect(() => assertPublic("Source: USAspending, FPDS contract actions", "caption")).not.toThrow() })
  it("every seeded caption is clean", () => {
    for (const p of PIECES) for (const b of p.body) if ("source" in b) assertPublic(b.source, p.slug)
  })
})
