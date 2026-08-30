# Two upgrades that made program pages feel alive — with data I already had

Sometimes the fastest way to make a product feel better is to run a "what data do I already have that the UI isn't using?" audit.

Two changes on BountyIndex program pages this week, both zero new infra:

## 1. Real company favicons

The old hero on each program page showed a platform-only dot — a small coloured circle indicating whether the program was on HackerOne, Bugcrowd, etc. Functional. Ugly.

New version: an actual company favicon. Google's `s2/favicons` endpoint returns a favicon for any domain at any size:

```
https://www.google.com/s2/favicons?domain=example.com&sz=128
```

The program hero now shows the target company's own icon (LayerZero's diamond, Coinbase's logo, whatever). Suddenly every program page has visual identity instead of a colour code. Zero cost, one image tag.

Two catches worth knowing:

- Not every domain has a good favicon. Some come back as generic globes. Acceptable fallback for our case.
- Google's endpoint is free but unofficial. If it disappears, swap for DuckDuckGo's `icons.duckduckgo.com/ip3/`. Two-line change.

## 2. 7-day activity chip

The meta row on each program used to be static — platform name, program type, that's it. New version adds `+N −M · 7d` when the program has actual scope movement in the last week.

The data was already in the snapshots table. The query is: find the earliest snapshot from ≥ 7 days ago, diff it against the current one, count adds and removes. If both are zero, don't render the chip. If either is non-zero, render.

The effect on the page is small but weirdly meaningful. A page that just says "HackerOne · Public" tells you nothing about whether this program is *alive*. A page that says "HackerOne · Public · +3 −1 · 7d" tells you the scope is being maintained. Silence is a signal too.

## The audit

Every product I've worked on has this exercise sitting unclaimed on the roadmap: **what data am I already storing that the UI isn't asking for?**

Ingest is expensive. Storage is cheap. Once the data is in the database, adding a UI element that displays it is often a two-hour job — no schema change, no migration, no upstream coordination. The bottleneck is that no one has walked the schema recently.

Walk your own schema every quarter. There's always a chip, a badge, a hover state waiting to happen.
