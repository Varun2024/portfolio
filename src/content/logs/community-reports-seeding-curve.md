# Shipping a community feature before the community exists

Community response-time tracking on BountyIndex — the "how long did they actually take to reply?" number that no platform publishes. It's the C1 pick in the moat plan: peer-sourced trust data that platforms won't ship because it embarrasses their slower programs.

The data model is small. A `user_reports` table with a composite primary key on (userId, programId), a `submittedAt`, a nullable `firstResponseAt`, an optional comment, and timestamps. One row per (user, program) — resubmit via `onConflictDoUpdate`. Individual rows are never exposed to other users. What the world sees is the aggregate: median first-response, count, waiting count.

Median comes from Postgres `percentile_cont(0.5) within group`, filtered to rows where a response has actually been recorded. Below three answered reports, we suppress the number entirely. Small-N medians on a page that markets itself as trust data would be worse than no data.

## The empty-state problem

Here's the awkward truth about shipping any community-data feature solo: on day one, the feature has no data. A stats grid with three zeros in it looks broken.

So the empty state isn't a stats grid. It's a call-to-action. "Be the first to report your response time from this program." A single button opens a native `<dialog>` — submitted date required, first-response date optional (leave blank if you're still waiting), 120-char comment optional. Signed-out users bounce through GitHub OAuth.

Once three answered reports land, the section flips from CTA to intel. Until then, it's the *invitation* to intel.

## Why ship it before the data exists

Because the moat is the schema, not the numbers. Every day the feature is live, the data compounds. If I waited until I had a seeded dataset before shipping, I'd have zero data forever. The chicken-and-egg problem doesn't solve itself with more planning.

Ship the moat. Design the empty state as the funnel. Let the audience contribute.
