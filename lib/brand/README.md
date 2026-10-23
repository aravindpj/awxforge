# AWX mark

The fluid mark is the approved one-stroke AWX. Geometry is fixed. Do not redraw it in components.

`scripts/generate-mark-paths.mjs` samples each cubic 36 times, offsets the outline by half the pen width along the normal, and writes `mark-paths.generated.ts`. Run it with `npm run gen:mark` after any intentional change to that script.

## Strokes

Full mark, viewBox `0 0 250 102`. Lockup uses the tight crop `4 2 242 98`. Compact X, viewBox `166 0 76 100`.

The main pen is six cubics. Widths at the nodes are `1.6, 7.5, 7.5, 7.5, 7.5, 6.5, 1.1`. Segments 0 and 5 blend with smoothstep. Odd segments swell on the downstroke (`1 + 0.32 sin`). Even segments before the last taper (`1 - 0.30 sin`). This matches the reference script, including segment 5, which is odd and therefore swells.

The orange strike is one cubic from `(170, 8)` to `(236, 94)`. Its width is `1.4 + 8.8 sin(π t^0.85)^0.7`.

The compact X uses the same pressure curve on both strokes: `2 + 9.5 sin(π t)^0.6`.

## Drawing

Each filled outline is masked by its centerline, stroked 26px white with `pathLength` 1. The draw moves `stroke-dashoffset` from 1 to 0.

At speed 1 the ink takes 2.4s (`cubic-bezier(.55, .05, .3, 1)`). The orange strike takes 0.7s (`cubic-bezier(.3, .6, .3, 1)`) after a 2.55s delay. A ring at `(200, 48)` scales from 0.4 to 3.4 and fades, lasting 0.9s after a 3.1s delay. Durations and delays divide by `speed`.

Ink `#0A0A0A`, aubergine `#722F7A`, background `#FFFFFF`. The ink shape has a 5px background-colored stroke with `paint-order: stroke`, so the orange strike reads as passing behind the pen.
