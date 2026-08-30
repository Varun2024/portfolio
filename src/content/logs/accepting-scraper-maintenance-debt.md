# When to accept permanent scraper maintenance debt

BountyIndex uses `arkadiyt/bounty-targets-data` as its upstream source for most platforms — HackerOne, Bugcrowd, Intigriti, YesWeHack, and a couple more. It's a well-maintained community repo that scrapes the platforms and publishes normalized JSON. Free, reliable, and someone else's problem.

Immunefi isn't in it.

## The choice

Two options for Immunefi coverage:

1. **Skip it.** Six platforms is already more than most aggregators cover. Immunefi is web3 — a niche. Not shipping is defensible.
2. **Scrape it directly.** Write my own HTML scraper against Immunefi's site. Accept permanent maintenance debt: every time they redesign, my scraper breaks, and I have to fix it.

Option 1 is safer. Option 2 is a moat.

## Why I picked option 2

The moat argument for a bug bounty aggregator is "we cover programs no one else does." That's the whole positioning. Every platform I add is a reason for a hunter to check my site instead of bookmarking individual platforms.

Immunefi has the highest top payout in the industry — LayerZero at $15M when I checked. Skipping the platform with the biggest headline numbers is skipping the exact rows a hunter wants to see. "Bug bounty aggregator except the interesting one" is not a product.

## The debt is real

I'm accepting:

- Every Immunefi frontend change breaks my scraper. Silently, until I notice.
- Every schema change in their data breaks my normalization. Silently, until I notice.
- I'm the only person who will ever fix these. There's no community repo to fall back on.
- I need monitoring: does today's scrape return roughly the same number of programs as yesterday's? If not, alert.

The tradeoff calculus for a solo builder is different from a team's. For a team, permanent maintenance debt on a single scraper is a rotational burden that eventually gets dropped. For a solo builder, it's an hour every couple of months when I notice the row count went sideways.

An hour every couple of months buys me the highest-payout platform on the internet. That's a good trade.

The general rule: **accept maintenance debt for coverage that changes your positioning.** Reject it for coverage that just widens a list.
