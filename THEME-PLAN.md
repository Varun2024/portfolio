# Space Theme Commitment Plan

Goal: go from "space-flavored portfolio" to "themed experience with a POV."
Ship in phases so no single phase blocks the site.

---

## The narrative frame

**Framing:** the site is a **mission log / captain's console**. Visitor is boarding your ship, reading your mission history, and can send transmissions.

Every section maps to a beat in that story:

| Section | Reframed as | Micro-copy example |
|---|---|---|
| Hero | Ship intro / pilot ID | "Commander Varun. Currently orbiting Flux Fortify." |
| About | Origin log | "Origin: Raipur, Sector IN-3." |
| Experience | Previous missions | "Mission logs — most recent first." |
| Projects | Deployed craft | "Fleet — six vessels currently in orbit." |
| Testimonials | Incoming transmissions | "Radio chatter from Earth." |
| Contact | Open comms | "Establish transmission." |
| 404 | Off-course | "Signal lost. You've drifted from known space." |
| Loading | Booting | "Booting nav systems… 87%" |

This is what "commit" means — the theme is not decoration, it's the **information architecture voice**.

---

## Phase 1 — Foundation (weekend 1)

The interaction bedrock. Everything else stacks on this.

### 1.1 Custom cursor
- Default: small glowing dot (like a targeting reticle)
- Over links/buttons: expands into a ring
- Over 3D/interactive areas: crosshair or "engage" tag
- Reduced-motion: fall back to native cursor
- Ref: linear.app, arc.net, framer.com

### 1.2 Sound layer (with off toggle)
- Master toggle in top-right nav (starts OFF for accessibility)
- LocalStorage persistence
- Sounds needed:
  - hover-blip (nav, buttons) — soft synth tick
  - section-warp (on scroll into new section) — subtle whoosh
  - game start/hit/lose
  - transmission-sent (contact form submit)
- Library: `use-sound` or vanilla `Audio` — no need for Howler at this scale

### 1.3 Boot sequence loader
- First visit only (session storage)
- 800–1400ms max, skippable with click
- Terminal-style typing:
  ```
  > Initializing life support...
  > Sync with orbital nav... OK
  > Welcome, visitor.
  ```
- Then the hero fades in

### 1.4 Microcopy pass
- Rewrite every string on the site in-theme. Not just headlines — every button, label, empty state, error.
- Examples:
  - "Contact form" → "Open channel"
  - "Submit" → "Transmit"
  - "Loading testimonials" → "Receiving signals…"
  - "See selected work" → "View fleet"
  - Success toast: "Transmission received. Response en route."

---

## Phase 2 — Motion identity (weekend 2)

### 2.1 Section transitions
On scroll between sections, do something that isn't just fade-in:
- Stars streak/warp briefly during scroll velocity spike
- Section headers arrive with a subtle "beam-down" light streak
- Content boxes materialize with a scan-line sweep instead of a fade

### 2.2 Astronaut becomes a companion, not a prop
Right now it's stuck in the hero. Give it life across the page:
- Follows cursor on hover across the About section (small parallax offset)
- Reacts to section changes (waves at Contact, salutes at Experience, etc.) — pick 2, not all
- On mobile: small floating badge in corner (not the giant character)

### 2.3 Parallax star field across all sections
- Not just hero — carry it through as a global background canvas
- 3 layers, different scroll speeds
- Occasional shooting star (2–3 per minute max) — restraint is what makes it not annoying

---

## Phase 3 — Detail obsessions (the memorable stuff)

These are the parts that get screenshotted and shared on Twitter. Pick 3–4, not all.

### 3.1 Konami code easter egg
- Unlocks something visible: a debug HUD, a second mini-game, a hidden note from you, or a full-screen "warp" animation. Choose one, execute cleanly.

### 3.2 Battery / systems status in nav
- Tiny "SYS: 98%" indicator that decreases over the session, giving the sense of a live simulation. Reset on refresh. Pure vibe.

### 3.3 Themed 404
- "You've drifted off course. Nearest known planet: [Home ↩]"
- Small drifting astronaut animation
- Coordinates that update: `LAT: 23.24° N   LONG: 81.63° E   STATUS: LOST`

### 3.4 Themed cursor tags on hover
- Hover a project card → cursor tag reads "SCAN"
- Hover an experience card → "REVIEW LOG"
- Hover the astronaut → "GREET"
- Hover the game button → "LAUNCH"

### 3.5 Terminal-style resume viewer
- Instead of a PDF link, an in-site modal that types out the resume like a terminal print
- Real PDF download still available underneath

### 3.6 Radar-style project section
- Small radar sweep in the corner "detecting" your projects
- Or projects displayed as blips on a mini radar you can click

### 3.7 Themed contact form
- Not fields with labels, but a "console":
  ```
  > CALLSIGN:     [ Salmon Bhoi ]
  > FREQUENCY:    [ your@email  ]
  > MESSAGE:      [ ...         ]
  [ TRANSMIT ]
  ```

---

## Rules for staying on theme

Once you commit, these are the **discipline** parts. This is what separates bruno-simon.com from "guy who added a spaceship."

### Never do

- ❌ Use generic UI copy ("Loading…", "Submit", "Contact Us")
- ❌ Ship a section without at least one themed touchpoint
- ❌ Mix metaphors (no sci-fi + fantasy + generic startup)
- ❌ Break theme on the 404 or in system errors
- ❌ Ship shadcn defaults with no styling override

### Always do

- ✅ Every new component gets a themed name (`<Console>`, `<Signal>`, `<Beacon>`, not `<Card>`)
- ✅ New copy passes through the "would a ship captain say this?" filter
- ✅ Motion is deliberate, not decorative — every animation earns its place
- ✅ Restraint on sound and shooting stars — memorable ≠ annoying

---

## Color + type direction (proposed refresh)

Current: purple + amber + dark navy. Fine but generic dark theme.

Proposed:
- **Deep space navy** `#050814` — base
- **Nebula cyan** `#5EEAD4` — primary accent (signals, active states)
- **Hazard amber** `#FBBF24` — warnings, company names only (not everywhere like now)
- **Star white** `#F8FAFC` — text
- **Console green** `#22D3AA` — terminal/console elements only

Typography:
- Display: keep current (works)
- Body: consider a subtle mono for terminal moments (JetBrains Mono, Space Mono, or Berkeley Mono)
- Rule: mono only inside console / terminal / stat contexts. Not everywhere.

---

## Anti-pattern check

Before shipping any phase, ask:
1. Does this get screenshotted?
2. Does this survive on mobile without becoming annoying?
3. Would I still like this on the 10th visit?
4. Can I turn it off?

If a feature fails any of these → cut or gate it behind reduced-motion.

---

## Suggested ship order

Week 1: Phase 1.1 (cursor), 1.4 (microcopy) — biggest perceived-quality jump for lowest effort.
Week 2: Phase 1.2 (sound), 1.3 (boot).
Week 3: Phase 2 (motion identity).
Week 4+: Pick your favorite 2–3 from Phase 3.

Do not try to ship all of Phase 3. That's where portfolios die from scope.

---

## Deferred (per your ask)

- `varuncodes.tech/cv` — conservative one-pager for FAANG-tier applications. Build later, not now.
