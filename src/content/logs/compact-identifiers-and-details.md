# Truncating URLs and addresses without hiding what matters

Bug bounty scope lists have two kinds of ugly identifiers: long URLs (`https://api.subdomain.example.com/v2/very/specific/endpoint/path`) and blockchain addresses (`0x1234567890abcdef1234567890abcdef12345678`). Rendered raw, they blow out the layout and make every row unreadable.

But you can't just truncate them to 40 characters. The end of a URL is often where the meaning lives — `/admin` vs `/health` matters. The end of a hex address is what disambiguates two addresses on the same protocol.

## What `shortenIdentifier` actually does

- For URLs: strip the protocol (`https://` adds nothing scannable), keep the host and path.
- For long hex or base58 addresses: collapse the middle into an ellipsis. First 8 characters, ellipsis, last 6 characters. `0x12345678…345678`.
- Cap display length at 64 characters regardless. Past 64, no one is reading it inline anyway.

The full identifier stays in the `title` attribute (native tooltip on hover) and in the `href` when the identifier is a link. Scan-ability in the row, full fidelity one hover or click away.

## Long scope lists get a native `<details>`

Some programs have 200+ scope entries. Rendering them all inline turns the page into a scroll trap. Rendering the top 10 with a "show more" button means writing state, an event handler, and probably an animation.

`<details>` and `<summary>` are already in the platform:

```html
<ul>
  <li>...</li> <!-- first 10 -->
</ul>
<details>
  <summary>+ 214 more</summary>
  <ul>
    <li>...</li> <!-- the rest -->
  </ul>
</details>
```

Zero JavaScript. Zero state. The browser handles the open/close transition, remembers focus, and respects keyboard navigation for free. The `:open` pseudo-class lets me style the summary differently when expanded, entirely in CSS.

Reach for a JS disclosure library the day `<details>` fails to do something you actually need. Almost every time, that day never comes.
