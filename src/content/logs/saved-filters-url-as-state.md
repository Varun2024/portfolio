# URL as state, then named presets on top

Saved filter sets landed on BountyIndex this week. Users pick a combination of filters — platform, asset type, reward range, whatever — save it under a name, and reload it with one click.

The interesting part isn't the feature. It's that the underlying primitive was already free.

## The URL was already the store

Every filter on the site is a URL parameter. `?platform=hackerone&type=web&min_reward=1000` is the state. Copy the URL to a friend, they see the same filtered list. Bookmark it, the browser is now your saved filter. Refresh, nothing is lost.

That means "save this filter set" is really just "give this URL a name." No client state store, no serialization format, no reconciliation logic. The query string *is* the query.

The database table has four meaningful columns: `id`, `userId`, `name`, `query`. The `query` field is the raw querystring — literally what's between the `?` and the end of the URL. Loading a filter is `router.push(pathname + '?' + query)`. Done.

## Signed-out users get localStorage

Same shape, different backend. `useSyncExternalStore` in `lib/saved-filters.ts` reads and writes localStorage with client-generated string ids. The store's interface is identical to the server-backed one, so components don't know or care where the data lives.

On sign-in, the `AuthSync` bridge merges local filters into the server table via `syncOnSignIn` — the same bridge that already handled watchlist and compare. Three lists, one round-trip, no per-list wiring.

## The MVP UI is `window.prompt`

For the "save current filter" action, I used `window.prompt("Name this filter set")`. That's it. No inline form, no modal, no validation UI beyond the browser's native input.

Would a proper inline form be nicer? Yes. Was it worth building before we know anyone uses the feature? No. If the feature gets traction, the prompt gets replaced. If it doesn't, `window.prompt` was correct — because the alternative was spending an afternoon on UX for something no one uses.

The lazy default carries a hidden claim: I trust myself to come back and improve this if the metric moves. Ship the honest MVP. Instrument it. Come back when it matters.
