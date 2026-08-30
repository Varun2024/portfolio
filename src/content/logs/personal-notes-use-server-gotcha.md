# The `'use server'` gotcha that only bites on production build

Personal notes per program landed on BountyIndex this week. Signed-in only, autosave on debounce, textarea with a char counter. Deliberately no localStorage fallback — the whole point of an account-tied feature is the lock-in.

The build broke on Vercel. Locally it was fine.

## What happened

I'd put a couple of constants and a type in the same file as my server actions:

```ts
'use server'

export const MAX_NOTE_LENGTH = 5000
export type Note = { content: string; updatedAt: Date }

export async function getNote(programId: string) { ... }
export async function saveNote(programId: string, content: string) { ... }
```

Local dev never complained. `pnpm build` broke with a cryptic error about non-async exports in a server-actions file.

The rule: **files marked `'use server'` can only export async functions.** No constants, no types, no sync helpers. The `'use server'` directive turns every export into an RPC endpoint — a constant isn't callable, a type doesn't exist at runtime, so the compiler refuses.

The fix took thirty seconds: move constants and types to `lib/notes.ts`, keep only async functions in `app/actions/notes.ts`. But I only found the fix by reading the error twice and remembering I'd seen a hint about this in the Next.js docs months ago.

## The other half: why no localStorage fallback

The moat plan (B2) is account-tied lock-in. Personal notes on a bug bounty program are exactly the kind of thing that becomes valuable *because* it's tied to an account — you built up notes across 40 programs over three months, you don't want to lose them by clearing browser storage or switching devices.

If I shipped a localStorage fallback, I'd have to build the merge-on-sign-in bridge that the watchlist and saved-filters already need. That's real work for a feature whose entire pitch is "sign in so this doesn't evaporate."

So the signed-out state is a dashed sign-in prompt instead of a textarea. Friction, deliberately. Not every feature should meet the user where they are — some should ask them to take one step forward first.
