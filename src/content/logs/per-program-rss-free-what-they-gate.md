# Free what your competitor gates

Every program on BountyIndex now has its own RSS feed. Point your reader at `/rss/programs/{platform}/{slug}` and you get one `<item>` per non-empty snapshot diff — scope added, scope removed, reward changed, safe-harbor language changed. Feed-reader autodiscovery via `<link rel="alternate">`, plus a visible RSS anchor on the page for the small number of humans who click it.

It's a free version of what the closest competitor (bbradar) sells as a Pro feature.

## The strategic call

When you're the small player, the pricing surface of your competitor is your feature list.

Not because you should copy them. Because their paid tier is a map of the features their users pay for — which means it's a map of the features that create retention. When you're free and they're paid, giving away one of their paid features costs you nothing (you weren't going to charge for it) and reframes the entire comparison. "Free what they gate" is a positioning move as much as a product move.

The features I'd love to gate for a hypothetical paid tier — I don't have a paid tier. There's no revenue to protect. Every gated feature I would build is a moat competitor's paid feature I'm choosing not to undercut. So I undercut.

## The Next.js catch-all trap

Small implementation gotcha along the way. The RSS route lives at `app/rss/programs/[platform]/[...slug]/route.ts`. My first attempt put it inside the existing program page's `[...slug]/` directory as a nested route.

Next.js disallows any route segment after a catch-all. Catch-all means "match everything from here on" — there is no "here on" after that. The build error is clear once you know what to look for; it's baffling if you don't. Move the route out to its own path prefix (`/rss/programs/...`) and the constraint goes away.

Two lessons in one commit:

1. When your competitor's pricing page is a spec, treat it as a spec.
2. Catch-all segments own the tail of the route. Don't try to build a house on someone else's tail.
