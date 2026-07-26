# Portfolio Fixes & Improvements

Audit date: 2026-08-01
URL: https://varuncodes.tech/

Ordered by impact. Each item lists the problem, why it matters, and the fix direction.

---

## Critical (fix first — these read as "broken")

### 1. Empty testimonial card on first load
- **Where:** Testimonials section, left card
- **Problem:** Shows only "What people say about me" heading + pagination dots. No quote body visible until user interacts.
- **Why it matters:** First impression of the section is broken/empty state.
- **Fix:** Ensure first slide renders with content on mount. Check if data fetch is delayed or if index is off-by-one.

### 2. Mobile hero — text overlaps astronaut
- **Where:** Hero, viewport ≤ 480px
- **Problem:** Headline, paragraph, and CTA buttons overlap the 3D astronaut character.
- **Why it matters:** ~60% of recruiter traffic is mobile. This is the first thing they see.
- **Fix options:**
  - Stack astronaut below the text on mobile
  - Shrink astronaut scale on small viewports
  - Add a text-side gradient scrim so overlap becomes intentional
  - Move astronaut behind text with reduced opacity + `pointer-events: none`

### 3. Persistent "dodge asteroids" hint tooltip
- **Where:** Fixed floating hint next to the Play button, all pages
- **Problem:** Never dismisses. Follows on every scroll position. Covers testimonial content on desktop.
- **Fix:**
  - Show once for 3–4s, auto-collapse to just the ⭐ Play button
  - Or trigger only after 20s of idle time
  - Add close (x) that persists via localStorage

### 4. Massive dead space before Contact section
- **Where:** Between Testimonials and "Let's Connect"
- **Problem:** ~600px of empty scroll. Feels like the page ended.
- **Fix:** Audit section margin/padding on `<Contact>` or the section wrapper. Likely a lazy-load boundary or intentional-but-broken margin.

### 5. "Crafted, not just coded" card — illegible headline
- **Where:** About bento grid, top-right card
- **Problem:** Orbiting pills (SRP / DRY / SOLID / Design Principles) cross the headline text. Word "coded" is bisected by a pill.
- **Fix options:**
  - Push orbit radius further out so pills orbit around, not through
  - Fade pill opacity where they intersect text (`mix-blend-mode: overlay` on the text, or blur pills behind)
  - Add a solid backdrop plate behind the text

---

## Design-level (positioning & hierarchy)

### 6. Theme identity conflict
- **Problem:** Copy = "Full-stack & AI Engineer at Flux Fortify" (serious). Visuals = space cartoon, Among Us-style astronaut, asteroids game (playful).
- **Why it matters:** Stuck between two audiences. Under-serves recruiters/clients, doesn't fully commit to the fun angle.
- **Fix — pick a lane:**
  - **Serious lane:** replace mascot with abstract 3D or subtle scene; keep motion, drop character
  - **Playful lane:** lean in — custom cursor, sound on game, animated transitions between sections
- Do not stay in the middle.

### 7. Color hierarchy is muddy
- **Problem:** Amber/orange is used for **three different things**:
  - Company names (Flux Fortify, Grainscope)
  - Tech stack tags (Next.js · TypeScript · NASA API)
  - Section labels (TESTIMONIALS, WORKED WITH ME?)
- **Why it matters:** Everything shouts at the same volume.
- **Fix:** Assign one meaning per color/weight combo. Suggested:
  - Company = strong amber, bold
  - Tags = muted gray with subtle borders
  - Section eyebrow = accent purple, small caps

### 8. Experience bullets — no metrics or outcomes
- **Problem:** All bullets describe **what** was built. No **outcome** (users, revenue, speedup, adoption).
- **Why it matters:** At senior level, results > tech stack.
- **Fix:** Add one metric per role where honest:
  - "Cut form completion time from 90s to 30s"
  - "Shipped to 2k users in first month"
  - "Reduced page load from 4.2s to 1.1s"

### 9. Timeline dots — decorative not structural
- **Where:** Experience card bullet lists
- **Problem:** Purple dots read as ornamentation rather than list markers.
- **Fix:** Either make them meaningful (numbered / lettered / colored by category) or use standard `<ul>` markers with cleaner styling.

---

## UX micro-issues

### 10. Nav active-section indicator doesn't sync on scroll
- **Problem:** "Home" stays highlighted even when user scrolls past it.
- **Fix:** IntersectionObserver on each `<section>`; update nav active state based on which section is in view.

### 11. `Resume ↗` opens same tab
- **Problem:** External-link arrow (↗) implies new tab, but it opens in-place.
- **Fix:** Add `target="_blank" rel="noopener noreferrer"`.

### 12. No visible focus states
- **Problem:** Tabbing through nav/CTAs shows no visible focus ring. WCAG 2.1 fail.
- **Fix:** Add `:focus-visible` styles to all interactive elements. Use a distinct outline (2px + offset).

### 13. No skip-to-content link
- **Problem:** Keyboard users must tab through nav on every page load.
- **Fix:** Add visually-hidden `<a href="#main-content">Skip to content</a>` as the first focusable element.

### 14. No `prefers-reduced-motion` handling
- **Problem:** Asteroid hint pulses regardless of user OS setting.
- **Fix:** Wrap all animations in `@media (prefers-reduced-motion: no-preference)` or use JS check.

---

## Performance

### 15. HeroCanvas is 941 KB on first paint
- **Impact:** Hurts LCP + CWV on mobile.
- **Fix:**
  - Show a static poster image first (WebP, ~50 KB)
  - Hydrate canvas on `requestIdleCallback` or after `load` event
  - Or gate canvas behind a "load 3D scene" opt-in on mobile

### 16. OG preview image is 1.6 MB
- **Impact:** Slow social shares, hurts LCP for anyone linked from social.
- **Fix:** Compress to <200 KB. Target 1200×630 exactly. Convert to WebP with PNG fallback.

---

## SEO

### 17. Sections use styled `<div>` instead of `<h2>`
- **Problem:** Google can't map content hierarchy.
- **Fix:** Each section title (About Me, Experience, My Selected Projects, What people say about me, Let's Connect) should be `<h2>`.

### 18. Missing alt text audit
- **Problem:** Project screenshots and About images likely have generic or missing alts.
- **Fix:** Every `<img>` gets descriptive alt including relevant keywords where natural.

### 19. No blog / long-form content
- **Impact:** Biggest missed lever for organic search traffic.
- **Fix (long-term):** Ship `/blog` with 4–5 posts on things you actually built (Asteroid Dodger collision detection, Firebase Analytics + Vite setup, etc.).

### 20. Off-page: update all bios to varuncodes.tech
- **Fix:** GitHub profile, LinkedIn contact info, Twitter bio, dev.to, Peerlist. Each = a backlink.

---

## The 3-fix weekend plan

If time-boxed, ship these first:

1. **Fixes #1 + #2 + #3** — the "this feels broken" signals (empty testimonial, mobile overlap, sticky hint).
2. **Fix #5** — Crafted card legibility.
3. **Fix #8** — add metrics to 2–3 Experience bullets.

Everything else is polish.
