# Fitting a 400s scrape inside Vercel Hobby's 300s cap

The Immunefi ingest job on BountyIndex has two stages. Stage 1 hits the landing page and extracts the program list (~180 programs). Stage 2 hits each program's detail page and extracts scope. On a cold run, all of it takes about 410 seconds.

Vercel Hobby caps serverless functions at 300 seconds.

The obvious answers — pay for Pro, move to a queue, split the job in half — all cost either money or complexity I didn't want to spend on a background sync that rarely finds real changes.

## The short-circuit

Almost all runs are quiet runs. Bug bounty programs don't update every day; most days, most programs are byte-for-byte identical to yesterday. So the first optimisation isn't "make Stage 2 faster." It's "skip Stage 2 when the program hasn't changed."

For each program during Stage 1, I hash the program-level fields (name, slug, top payout, indicators — the stuff that would tell you something interesting has moved) and store it as `programs.raw.stage1Hash`. On the next run, I compute the hash again and compare against the stored one. If it matches, I skip both the Stage 2 detail fetch *and* the persist block. The program is untouched.

The first run after deploying this change is still ~410s — every program is "new" so nothing short-circuits. From the second run onwards, quiet days finish in seconds. Real updates still get full Stage 2 treatment because their hash changed.

## The general pattern

Content-hash short-circuits work anywhere you have an incremental sync job where "most items haven't changed" is likely to be true:

- Scraping partner APIs where responses are stable
- Regenerating derived data from source rows
- Rebuilding search indexes from mostly-unchanged content
- ETL pipelines with slow-changing dimensions

The recipe:

1. Compute a hash of the fields whose changes actually matter.
2. Store the hash alongside the item.
3. On the next run, compute the new hash and compare.
4. If unchanged, skip everything downstream.
5. If changed, do the full pipeline for that item.

The tricky part is the "fields whose changes actually matter" step. Include too much (like an `updatedAt` timestamp that changes every run), and nothing ever short-circuits. Include too little, and real changes get missed. Hash the payload you actually care about, not the payload you happen to have.

Cost: a hash column and one extra hash computation per item.
Value: an incremental sync that scales to millions of items without ever running long.
