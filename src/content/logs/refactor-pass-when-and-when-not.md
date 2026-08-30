# When to refactor, and when to leave the copy-paste alone

Six shipped features in two days. Then a cleanup pass. Zero behavior change, four commits, one per item — the discipline of the pass is that every commit is a diff a reviewer can hold in their head.

## What got extracted

**`requireUserId` → `app/actions/require-user.ts`.** Three inline copies across server actions, all doing the same session check. One import, three fewer bugs waiting to diverge.

**`sync.ts` split by domain.** The sign-in bridge was doing watchlist, compare, and saved-filters merging in one file. Broke it into `sync-watchlist.ts`, `sync-compare.ts`, `sync-saved-filters.ts`. The bridge (`syncOnSignIn`) stays in `sync.ts` because it *is* the coordination point. Client stores import from the matching per-domain file.

**`SectionHeading` primitive in `app/_ui/`.** The same heading treatment (title + underline + spacing) was open-coded across ScopeColumn, ProgramTimeline, ProgramNotes, and CommunityReports. One component, four migrations.

**The 555-line program detail page.** Split into `page.tsx` (242 lines), `scope-columns.tsx` (193), `timeline.tsx` (129). The page.tsx is now something you can hold in your head. The next batch of per-program features has a cleaner ground to build on.

## What did *not* get extracted, and why

A `useSyncedList<T>` hook across watchlist / compare / saved-filters looked obvious. All three do the same shape: local store, server merge on sign-in, optimistic updates. But the signatures differ enough — different id types, different server actions, different merge conflict rules — that the abstraction would have needed three escape hatches. That's not an abstraction, that's a `switch` statement wearing a hat.

Same for a design-token module and a `_ui/primitives/` layer for stat pills and legend dots. Only two or three instances each. Extracting now means naming things that don't have obvious names yet, and then living with those names forever.

## The rule

The extraction skill everyone talks about is the easy half. The harder half is *not* extracting — recognising when three things look similar but their differences are the point. A refactor that leaves duplication in place because the duplication is honest is a good refactor.

Ship a refactor pass when the same code has been written three times *the same way*. Skip it when it's been written three times *slightly differently*.
