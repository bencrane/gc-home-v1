import * as echarts from "echarts/core"

/** DESIGN.md chart rules: chart-1…5 in order, hairline gridlines in `line`, mono axis labels,
 *  no area gradients, no shadows. Registered once; every chart passes theme="gc". */
export const GC_THEME = {
  color: ["#1f4470", "#bf8847", "#365d8a", "#15803d", "#b91c1c"],
  backgroundColor: "transparent",
  textStyle: { fontFamily: "JetBrains Mono Variable, ui-monospace, monospace", color: "#3a4a64" },
  grid: { left: 0, right: 0, top: 8, bottom: 0, containLabel: true },
  categoryAxis: {
    axisLine: { lineStyle: { color: "#c8c1ac" } },
    axisTick: { show: false },
    axisLabel: { color: "#7c8aa1", fontSize: 10, fontFamily: "JetBrains Mono Variable, ui-monospace, monospace" },
    splitLine: { show: false },
  },
  valueAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: "#7c8aa1", fontSize: 10, fontFamily: "JetBrains Mono Variable, ui-monospace, monospace" },
    splitLine: { lineStyle: { color: "#e1dccd", width: 1 } },
  },
  bar: { itemStyle: { borderRadius: 0 }, barMaxWidth: 28 },
  tooltip: {
    backgroundColor: "#ffffff",
    borderColor: "#e1dccd",
    borderWidth: 1,
    textStyle: { color: "#0f1a2e", fontFamily: "Inter Variable, ui-sans-serif, sans-serif", fontSize: 12 },
    extraCssText: "box-shadow:none;border-radius:0;",
  },
}

let registered = false
export function ensureTheme() {
  if (!registered) {
    echarts.registerTheme("gc", GC_THEME)
    registered = true
  }
}
