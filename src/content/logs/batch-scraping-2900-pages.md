# Scraping 2,900 pages politely

Stage 2 of the Immunefi ingest on BountyIndex hits `/bug-bounty/{slug}/information/` for each of 181 programs and pulls the `assets[]` array. Total: 2,906 scope entries across all programs. This is the batch-scraping post: what "polite" actually means when you're a solo dev scraping someone else's site to build a competitor.

## Concurrency cap: 6

Not 100 (rude and gets you blocked). Not 1 (finishes tomorrow). Six is enough to get through 181 pages in a few minutes and light enough that Immunefi's rate limiter doesn't notice.

Six is a guess informed by:

- What their infra can obviously absorb without slowing down (their landing page loads in ~200ms for a logged-out visitor, so their edge isn't warm-cache-only)
- The general "residential-tier concurrency" ceiling most sites treat as normal browsing (4-10)
- The fact that if I'm wrong and they block me, I lose the coverage entirely

Implementation is a semaphore around `Promise.all`. Not a bulk-queue library. Not a worker pool. Twenty lines of `async` code.

## Delete-and-reinsert per program

Every run, for every program, I `DELETE FROM scopes WHERE program_id = $1` before inserting the fresh set. This is the "state cleanliness" call.

The alternative is a diff-based upsert: figure out which scope entries are new, which are gone, which changed, and apply the delta. That's more code and much easier to get wrong — subtle equality bugs mean stale rows linger for months. Delete-and-reinsert can't drift.

It costs a burst of writes per program per run, which for 181 programs and ~16 scope entries each is negligible. If BountyIndex scaled to 100k programs with 500 scope entries each, I'd revisit. Below that scale, correctness beats cleverness.

## Mapping their taxonomy onto mine

Immunefi's asset types don't match my enum. They have their own set (Smart Contract, Blockchain/DLT, Web/App, etc.); I have mine (`smart_contract`, `web`, `mobile`, `blockchain`, `other`). A lookup table in `lib/immunefi.ts` translates their string to my enum. Anything unrecognised maps to `other` and gets logged.

The lesson from every scraping job I've built: **never let a foreign taxonomy leak into your schema.** Map it at the ingress layer, exactly once. If Immunefi renames "Smart Contract" to "Onchain Contract" tomorrow, I change one line in one file. If their taxonomy were persisted directly, I'd be running a data migration.

Boring rules, boring code, boring outcomes. That's the point.
