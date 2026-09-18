# Charts — the system (binding)

Engine: Observable Plot, rendered to SVG at build (linkedom document) and inlined in the static HTML. No chart ships JavaScript. Rules follow the `dataviz` skill; colour validated with its script against the paper surface (#f7f5f0).

## Colour jobs
- Sequential / magnitude: one hue, navy-600 (#1f4470). Emphasis: subject in navy-600, context in slate-300 (#b8b09a).
- Diverging / change: navy-600 for increase, copper-700 (#674416) for decrease, hairline neutral midline. copper-400 fails 3:1 on paper and is never a mark.
- Categorical multi-series: not used. A chart with more than one series becomes small multiples or a table.
- Text never wears the data colour: labels and values in ink (#0f1a2e) or foreground-muted; identity comes from the mark.

## Forms, one per format
| Format | Job | Form | Mark spec |
|---|---|---|---|
| The Record | compare magnitude | ranked horizontal bar | ≤24px bars, square baseline, 2px surface gap, value at tip |
| Flows | above/below baseline | diverging horizontal bar | navy right / copper-700 left of a hairline zero, signed value at tip |
| Expiring | when things end | dot timeline | x = end date (time axis, monthly ticks), one row per award, dot r≥4 with 2px paper ring, value label right |
| Sub-Under | compare magnitude | ranked horizontal bar | as The Record |
| Who Won | compare magnitude | ranked horizontal bar | as The Record; agency as a muted sub-label |
| Wage Floor | before → after per item | dumbbell | floor (copper-700) → market (navy-600), 2px connector, one row per county |

## Rules
- Dominant row: when the largest row exceeds 50% of the visible total, keep true scale (never truncate an axis) and state the share in the caption; the bars stay honest and the prose carries the comparison.
- Change vs size: a block with a delta column is drawn as change (diverging), never size; the two are never mixed on one axis. One axis per chart, always.
- Axes: hairline (1px, solid) gridlines in `line` (#e1dccd); axis text mono-label 11px in foreground-subtle; no tick marks; no chart title inside the SVG (the block heading above carries it).
- Labels: value at the bar tip in mono-data 13px tabular; row labels in Inter 16px ink; never a label on every point in a timeline, only the extremes and the subject.
- Every chart is followed by its source line and the "as of" date, and every chart's data is also present as a ledger in the piece or reachable as a table.
- Height: 32px per row plus 40px axes; width fills the column.
