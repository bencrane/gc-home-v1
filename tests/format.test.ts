import { describe, it, expect } from "vitest"
import { money, pct, hourly, formatValue } from "@/lib/format"
describe("formatters", () => {
  it("money units", () => { expect(money(491.8e9)).toBe("$491.8B"); expect(money(2.1e6)).toBe("$2.1M"); expect(money(845e3)).toBe("$845K"); expect(money(-6.2e9)).toBe("−$6.2B") })
  it("nil safe", () => { expect(money(null)).toBe("—"); expect(formatValue("hourly", undefined)).toBe("—") })
  it("pct signs", () => { expect(pct(10.3)).toBe("+10.3%"); expect(pct(-27.2)).toBe("−27.2%"); expect(pct(0)).toBe("0.0%") })
  it("hourly", () => { expect(hourly(14.73)).toBe("$14.73") })
})
