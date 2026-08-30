# 180 lines of SVG, no chart library, no client JS

Every BountyIndex program page now shows a lifecycle chart — the in-scope count over the program's entire snapshot history, with dots colour-coded by event kind. It's built with a `LifecycleChart` component that renders on the server, ships zero JS, and uses no chart library.

The whole thing is about 180 lines.

## Why not Recharts / Chart.js / Nivo

Because the requirements are trivial. One line, one area under it, a scatter of dots along the line, colour-coded by category. Left axis showing peak and zero. Bottom axis showing first and last date. That's it.

Every chart library I've used solves *ten* problems I don't have — legends, tooltips, animations, responsive resize handlers, theming, accessibility toggles. And every one of them ships a client bundle. For a chart that renders once per page load and never changes, that's a lot of JavaScript to solve the wrong problem.

## The SVG shape

Pure server-rendered SVG. Points get placed by mapping `(date, count)` to `(x, y)` with a linear scale — 15% headroom on the y-axis so the peak isn't jammed against the top edge. The line is a `<polyline>`; the area under it is a `<polygon>` with the same points plus two anchors on the x-axis. Dots are `<circle>` elements, one per snapshot, coloured by event kind:

- Neutral for the baseline snapshot
- Emerald for scope additions
- Amber for removals
- Cyan for reward changes

## Tooltips without JS

Each `<circle>` has a native `<title>` child: `"2026-07-14 · 18 scope items · added"`. Browsers render this as a native tooltip on hover. No hover state management, no positioning math, no accessibility work — the browser has been doing this for decades and does it better than my hand-rolled version would.

Legend beneath the chart. Subtitle above showing duration and peak count. Only renders when the program has ≥ 2 snapshots; single-snapshot programs keep the existing hint.

## The compounding value

The chart gets more useful per day. Every snapshot the daily cron writes is another dot. Six months from now, these charts will tell stories no other bounty aggregator can tell — because I didn't have those six months of snapshots six months ago either.

Ship the feature whose value compounds. Then wait.
