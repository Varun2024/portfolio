# A daily changelog from sparse snapshots, in one query

BountyIndex snapshots every program's scope on a daily cron. The trick is that snapshots only get written when the hash actually changes — a program with no updates for a week has one snapshot, not seven. Storage stays sane, but "what changed yesterday?" becomes a per-program walk instead of a date range query.

That constraint turned out to make the changelog easier, not harder.

## The insight

Because snapshots are sparse, **every snapshot in a window IS a change.** There's no such thing as a "no-op snapshot" — the row wouldn't exist. So `getRecentChanges(hoursBack, limit)` walks per-program snapshot pairs and emits non-empty diffs where the *newer* snapshot falls inside the window. Each pair is a "before" and "after" — that's the diff.

That's one query. Group by day in the page component. Done.

## `/whats-new` and `/whats-new.xml`

The page groups diffs by day, reuses the `/feed` layout, and shows a summary per entry: `+N added / −M removed`, reward change, safe-harbor change, plus a small sample of the actual identifiers so users know what they're looking at.

The RSS mirror is one `<item>` per diff, same content. Default window is 7 days (168 hours) — a 24-hour window would be empty on quiet days and look broken. `?hours=24` narrows on demand.

The top nav swapped: `/feed` (new programs) moved to the footer, `/whats-new` (scope changes) took the primary slot. The scope changes are the higher-signal update for anyone actually hunting.

## Why RSS beats email alerts on a solo project

Email alerts sound like the obvious feature. Every SaaS ships them. But:

- Deliverability is a real, unglamorous job. SPF, DKIM, DMARC, warming up an IP, unsubscribe compliance. That's a week of work before you send the first useful email.
- Notification fatigue. Users unsubscribe or filter after two mediocre emails and never come back.
- Support cost: "I stopped getting emails" becomes an inbound support burden the day the send provider hiccups.

RSS has none of that. The feed is a static file. Users opt in by pointing their reader at it. They opt out by removing it. There is no delivery to fail. There is no unsubscribe to comply with. There is no support ticket to answer.

For a solo project trying to earn retention, RSS is the honest choice. Email is the choice you make when you have a team that can eat the ops cost.
