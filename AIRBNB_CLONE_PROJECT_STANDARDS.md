---
name: airbnb-clone-standards
description: >
  Engineering standards, fidelity-extraction workflow, architecture principles,
  file-structure conventions, data contracts, animation/accessibility specs, and
  AI sub-agent configuration for the Airbnb-Clone take-home assignment: a
  pixel-perfect, behaviorally-identical clone of a real Airbnb listing page and
  its two overlay views (Photo Tour, Lightbox), plus a production-scale
  architecture diagram for a vacation-rental marketplace.
  Stack: Next.js 14 (App Router) + TypeScript (strict) + Tailwind CSS +
  Framer Motion (frontend-only, desktop-only), static/local data, Vercel (hosting).
  Reference (single source of truth): https://airbnb-clone-umber-two.vercel.app
  Consult this file before creating any file, component, route, animation, or
  styling decision. When judgment and this document conflict, this document wins.
---

# Airbnb-Clone — Engineering Standards

> **This document is the single source of truth for HOW to build.**
> **The reference URL is the single source of truth for WHAT to build.**
> Attach this file to every prompt. Read the relevant section before writing any
> component, animation, or style. Never invent a layout, spacing value, color,
> copy string, or interaction that isn't directly observed on the reference —
> guessing is how AI-assisted clones drift from "pixel-perfect" to "looks kinda
> like it." When this document is silent, apply the principles in Section 1.
> When judgment conflicts with this document, this document wins. When this
> document conflicts with an observed fact on the reference, **the reference wins**
> and this document must be updated (Section 6).

**Reference under test**
`https://airbnb-clone-umber-two.vercel.app` — Listing Page, Photo Tour overlay,
Lightbox overlay. Desktop viewport only (≥1280px design target; do not build
mobile breakpoints).

**Stack (locked)**
Framework: Next.js 14 (App Router) + TypeScript (strict) ·
Styling: Tailwind CSS (utility classes only, values pulled from Section 9 tokens) ·
Animation: Framer Motion (`motion/react`) for shared-layout / overlay transitions,
CSS transitions for simple hover states ·
Icons: `react-icons` (`Io5`/`Fa6` sets) or inline SVGs traced from the reference —
never a mismatched icon set ·
Data: static local JSON (`data/listing.json`) — no backend, no database. Backend
is explicitly optional per the assignment; frontend/browser storage keeps scope
focused ·
State: React state + Context for overlay open/close and gallery index only —
no Redux/Zustand for a single-page clone ·
Hosting: Vercel · Package Manager: pnpm

This stack is locked. Do not introduce a CMS, a database, a state library, or a
second animation library without documenting the decision in the README
design-decisions section and noting it here. A backend may be added only if it
stays a thin static-JSON server — it must never become a source of scope creep.

---

## 1. Core Principles

These principles govern every decision. Re-read them before touching any file.

### 1.1 Reference Fidelity Is The Only Metric
This is not "build an Airbnb-style page." It is "reproduce this exact page."
Every spacing value, font size, line height, color, border radius, shadow,
icon, copy string, image, hover state, transition curve, and keyboard
interaction must trace back to something observed on the reference — a
screenshot, a computed style, a recorded interaction — never to "what Airbnb
usually looks like" from training data. If it wasn't checked against the
reference, it isn't done. See Section 6 for the mandatory extraction workflow.

### 1.2 No Lift-and-Shift
The assignment explicitly penalizes "direct lift and shift of the codebase
from the url." Never fetch and reuse the reference's bundled JS/CSS/HTML,
scrape its Next.js `_next/static` chunks, or copy component source. Everything
is rebuilt from observed visual/behavioral output using this project's own
components, own Tailwind classes, own animation code. Only static assets
(images actually rendered on the page — property photos, host avatar, icons
if unavoidable) may be reused, and only because they're content, not code.

### 1.3 Single Responsibility
Every component has exactly one reason to change. `PhotoGrid` renders the
hero grid and nothing else. `Lightbox` shows one photo with prev/next and
nothing else. A component that fetches data AND animates AND lays out a grid
violates this — split it into a container + presentational pair.

### 1.4 DRY — Don't Repeat Yourself
Spacing, color, radius, and shadow values live in Tailwind theme tokens
(Section 9), defined once. The listing data shape is defined once in
`types/listing.ts` and imported everywhere. Animation durations/easings live
in one `lib/motion.ts` constants file — never a magic `duration: 0.287`
scattered across five components.

### 1.5 KISS — Keep It Simple
Three views, static data, no backend. Do not add SSR data-fetching, ISR,
a CMS, or auth. The Listing Page must be fully correct before Photo Tour is
started; Photo Tour must be fully correct before Lightbox is started. Each
view is additive on top of the last, never a rewrite of it.

### 1.6 Open / Closed
Adding a new amenity icon, a new review card, or a new photo category means
**extending** — a new entry in the data file, a new small mapped component —
never editing the working grid layout or the working overlay transition logic.

### 1.7 Accessibility Is Not Optional
The assignment lists "keyboard navigation, focus management, and
accessibility" as a first-class grading axis, equal to visual fidelity. Every
interactive element is reachable and operable by keyboard. Every overlay traps
focus and restores it on close. This is implemented alongside each component,
not bolted on at the end (Section 8).

### 1.8 Motion Parity, Not Motion Vibes
"Matching hover and scroll animations, and transitions" is graded literally.
An animation that is "close enough" in duration or easing is a fidelity bug,
not a style choice. Every transition's duration, easing curve, and triggering
interaction is extracted from the reference (Section 6.3) before being coded.

---

## 2. System Architecture

### 2.1 The Three Views, One App
This is a single-page frontend app with three view states layered on one
route. There is no routing between "pages" — Photo Tour and Lightbox are
overlays on top of the Listing Page, matching the reference's own behavior
(the URL reference itself doesn't navigate away for these).

```
┌───────────────────────────────────────────────────────────────┐
│                         Browser (Client)                       │
│                                                                 │
│   ┌─────────────────────────────────────────────────────┐     │
│   │                    Listing Page (base)                │     │
│   │  Header · Photo Grid · Title/Info · Amenities ·       │     │
│   │  Description · Reviews · Map · Sticky Booking Card ·  │     │
│   │  Footer                                                │     │
│   └───────────────────────┬────────────────────────────────┘   │
│                            │ click "Show all photos" / any hero │
│                            ▼ image                              │
│   ┌─────────────────────────────────────────────────────┐     │
│   │              Photo Tour (full-screen overlay)         │     │
│   │  Sticky header (Close/Share/Save) · scrollable photo  │     │
│   │  sections by category                                 │     │
│   └───────────────────────┬────────────────────────────────┘   │
│                            │ click any gallery photo             │
│                            ▼                                    │
│   ┌─────────────────────────────────────────────────────┐     │
│   │            Lightbox (single-photo viewer overlay)     │     │
│   │  Prev/Next arrows · index counter · Esc/←/→ keys      │     │
│   └─────────────────────────────────────────────────────┘     │
│                                                                 │
│   Global: OverlayProvider (which overlay is open, active photo │
│   index) · FocusTrapProvider (per open overlay)                │
└───────────────────────────┬─────────────────────────────────────┘
                            │ reads
                            ▼
                 ┌─────────────────────────┐
                 │  data/listing.json       │
                 │  (photos, amenities,     │
                 │   reviews, host, price)  │
                 └─────────────────────────┘
```

Permanent rules of flow:
- All three views read from the **same** in-memory listing object. No view
  re-fetches or duplicates data.
- Overlay open/close and the active lightbox index live in one
  `OverlayContext` — never local `useState` duplicated across components that
  need to agree on what's open.
- The Listing Page never unmounts while an overlay is open (overlays render on
  top, matching the reference's scroll-position-preserving behavior when you
  close Photo Tour/Lightbox and land back where you were).
- Deep-linking is out of scope (no requirement for it) — overlay state does not
  need to sync to the URL unless the reference itself demonstrates URL changes
  on overlay open (verify in Section 6; if the reference does update the URL/
  history for these overlays, match it — back button behavior included).

### 2.2 View Responsibilities

**Listing Page** — the base document.
- Renders the 5-photo hero grid, all listing content sections, and the sticky
  booking card exactly as laid out on the reference at ≥1280px.
- Owns nothing about overlay internals; it only knows how to *open* them
  (pass an initial photo index into `OverlayContext`).

**Photo Tour** — full-screen gallery.
- Opened via "Show all photos" button or clicking any hero grid image.
- Renders every photo, grouped by category/section if the reference groups
  them, in a scrollable full-screen layout with a sticky action header.
- Clicking a photo inside Photo Tour opens Lightbox at that photo's index.

**Lightbox** — single-photo viewer.
- Opened from any photo (hero grid or Photo Tour).
- Shows one photo at a time with prev/next controls, an index counter, and
  keyboard ←/→ navigation, Esc to close.
- Closing Lightbox returns to whichever view opened it (Listing Page or Photo
  Tour), preserving that view's scroll position.

### 2.3 State Flow

```
User clicks a hero photo
  → OverlayContext.open({ view: "lightbox", index: N })
  → Lightbox mounts, focus moves to it, background is inert (aria-hidden + focus trap)

User clicks "Show all photos"
  → OverlayContext.open({ view: "photoTour" })
  → Photo Tour mounts, focus moves to its close button

Inside Photo Tour, user clicks a photo
  → OverlayContext.open({ view: "lightbox", index: N, returnTo: "photoTour" })
  → Lightbox mounts on top of Photo Tour

User presses Esc in Lightbox
  → OverlayContext.close("lightbox")
  → focus returns to the element that opened it; returnTo view (if any) remains mounted underneath
```

---

## 3. Repository Structure

Single Next.js app. One `vercel deploy` ships the whole clone.

```
airbnb-clone/
│
├── app/
│   ├── layout.tsx                    # Root layout, font loading, providers
│   ├── page.tsx                      # Listing Page route ("/")
│   └── globals.css                   # Tailwind base + design tokens (Section 9)
│
├── components/
│   ├── listing/
│   │   ├── Header.tsx                # Top nav bar
│   │   ├── PhotoGrid.tsx             # 5-image hero grid + "Show all photos"
│   │   ├── ListingHeading.tsx        # Title, location, rating row
│   │   ├── HostSummary.tsx           # "Hosted by X" row + avatar
│   │   ├── AmenitiesList.tsx         # Icon + label grid, "Show all" trigger
│   │   ├── Description.tsx           # Expandable description block
│   │   ├── ReviewsSection.tsx        # Rating breakdown + review cards
│   │   ├── LocationMap.tsx           # Static map + address
│   │   ├── BookingCard.tsx           # Sticky price/date/guest card
│   │   └── Footer.tsx
│   ├── overlays/
│   │   ├── PhotoTour.tsx             # Full-screen gallery overlay
│   │   ├── Lightbox.tsx              # Single-photo viewer overlay
│   │   ├── OverlayShell.tsx          # Shared: portal, backdrop, focus trap
│   │   └── OverlayHeader.tsx         # Shared close/share/save row
│   └── shared/
│       ├── Icon.tsx                  # Icon wrapper (consistent sizing/stroke)
│       ├── Button.tsx
│       └── RatingStars.tsx
│
├── context/
│   └── OverlayContext.tsx            # Which overlay is open + active photo index
│
├── hooks/
│   ├── useFocusTrap.ts               # Traps Tab/Shift+Tab, restores focus on unmount
│   ├── useKeyboardNav.ts             # Esc / ←/→ handling for overlays
│   └── useScrollLock.ts              # Locks body scroll while an overlay is open
│
├── data/
│   └── listing.json                  # Extracted listing content (Section 4)
│
├── types/
│   └── listing.ts                    # Listing, Photo, Review, Host, Amenity types
│
├── lib/
│   ├── motion.ts                     # Durations/easings, one place (Section 7)
│   └── constants.ts                  # Breakpoint, z-index scale, misc constants
│
├── public/
│   └── images/                       # Downloaded reference photos, optimized
│
├── docs/
│   ├── architecture-diagram.png (or .pdf)   # Production-scale system diagram (Section 12)
│   ├── fidelity-log.md               # Section 6 extraction notes per component
│   └── prompts.md                    # Full AI prompt sequence (submission deliverable)
│
├── .claude/  (or .cursor/, .codex/ — whichever agent tool is used)
│   ├── agents/                       # Sub-agent configs (Section 13) — MUST be included in submission
│   │   ├── fidelity-auditor.md
│   │   ├── component-builder.md
│   │   ├── accessibility-checker.md
│   │   └── motion-implementer.md
│   └── commands/                     # Any reusable slash-commands/prompts used
│
├── .env.example                      # Empty/placeholder — no real secrets needed
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 4. Data Contracts

Defined once in `types/listing.ts`. Every field is populated from the
reference — no placeholder Lorem Ipsum, no invented review text.

```typescript
export interface Photo {
  id: string;
  src: string;          // path under /public/images
  alt: string;           // real alt text observed on the reference, or a
                          // faithful description if the reference's alt is empty
  category?: string;     // section the photo belongs to in Photo Tour, if grouped
  width: number;
  height: number;
}

export interface Host {
  name: string;
  avatarSrc: string;
  isSuperhost: boolean;
  yearsHosting: number;
}

export interface Amenity {
  id: string;
  label: string;
  icon: string;          // key into the Icon component's icon map
  available: boolean;    // reference may show unavailable amenities struck through
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatarSrc: string;
  rating: number;
  date: string;          // display string exactly as formatted on reference
  text: string;
}

export interface RatingBreakdown {
  overall: number;
  reviewCount: number;
  categories: { label: string; score: number }[]; // Cleanliness, Accuracy, etc.
}

export interface Listing {
  id: string;
  title: string;
  location: string;
  photos: Photo[];        // order matters — matches hero grid + Photo Tour order
  host: Host;
  amenities: Amenity[];
  description: string;    // full text; UI truncates/expands, data stays whole
  ratingBreakdown: RatingBreakdown;
  reviews: Review[];
  pricePerNight: number;
  currency: string;
  mapCoordinates: { lat: number; lng: number };
  address: string;
}
```

`OverlayContext` state shape (Section 2.3):

```typescript
type OverlayView = "none" | "photoTour" | "lightbox";

interface OverlayState {
  view: OverlayView;
  activePhotoIndex: number;
  returnTo: OverlayView | null; // where to fall back to when lightbox closes
}
```

---

## 5. Component Architecture Standards

- **Container vs. presentational split**: any component reading from
  `data/listing.json` or `OverlayContext` is a container; it passes plain
  props down to presentational components that only render markup/styles.
  `PhotoGrid` (container) → `GridImage` (presentational, pure).
- **No inline magic numbers.** A `px` or `%` value typed directly in a
  component (outside Tailwind's scale) is a fidelity risk — it means the
  spacing wasn't traced to a token. If the reference uses a value outside the
  default Tailwind scale, add it to `tailwind.config.ts` theme extension
  (Section 9), don't hardcode it inline.
- **Every overlay is a portal** rendered via `OverlayShell`, not inline JSX in
  the page tree — this matches the reference's stacking/backdrop behavior and
  keeps focus-trap logic in one place.
- **Images**: always `next/image` with explicit `width`/`height` from the data
  contract to prevent layout shift; the hero grid's aspect ratios must match
  the reference exactly (verify per-image, they are not uniform on most
  Airbnb listings).
- **No component exceeds ~150 lines.** A component approaching that size is
  usually doing two things — split it (Section 1.3).

---

## 6. Fidelity Extraction Workflow (mandatory, run per section before coding)

This is the core defense against AI hallucination the assignment brief warns
about. Never implement a section from memory of "what Airbnb looks like."
For every component, in order:

### 6.1 Visual capture
1. Screenshot the relevant section of the reference at 1280px+ width.
2. Open DevTools, inspect the section's root element and its children.
3. Record computed styles that matter: `font-size`, `font-weight`,
   `line-height`, `color`, `padding`, `margin`, `gap`, `border-radius`,
   `box-shadow`, `grid-template-columns`. Paste the exact values into
   `docs/fidelity-log.md` under that component's heading before writing any
   Tailwind class.
4. Note exact copy text (button labels, section headings) verbatim — these
   are content, not code, and are safe/expected to reproduce exactly.

### 6.2 Layout capture
1. Confirm grid/flex structure (column counts, gaps) by toggling DevTools'
   grid/flex overlay on the reference.
2. Confirm responsive container widths and max-widths at the design viewport.
3. Confirm z-index stacking order for overlays (Photo Tour above Listing
   Page, Lightbox above Photo Tour) by inspecting computed `z-index`.

### 6.3 Motion capture
1. Trigger the interaction (hover, click, scroll) on the reference with
   DevTools' "Animations" panel recording, or screen-record at reduced
   playback speed.
2. Record: trigger event, duration (ms), easing curve (or closest standard
   cubic-bezier), properties animated (opacity/transform/etc.), and any
   staggering between elements.
3. Log this in `docs/fidelity-log.md` per interaction before adding it to
   `lib/motion.ts` as a named constant (e.g. `LIGHTBOX_FADE = { duration: 0.2,
   ease: [0.4, 0, 0.2, 1] }`) — never an ad hoc value inline in a component.

### 6.4 Accessibility capture
1. Tab through the equivalent flow on the reference (or, if the reference
   itself has gaps, use standard WAI-ARIA dialog/gallery patterns as the
   fallback — note in `fidelity-log.md` when you're following a pattern
   rather than an observed behavior).
2. Note focus order, any `aria-label`s exposed in the DOM, and what happens
   to background content when an overlay opens (`aria-hidden`, `inert`).

### 6.5 Build → diff → fix
1. Implement the component.
2. Screenshot the built component side-by-side with the reference screenshot
   at the same viewport width.
3. Diff spacing/color/type by eye and by re-checking computed styles in
   DevTools on your own build.
4. Do not move to the next component until the current one matches. Fidelity
   debt compounds — a 4px drift in the header repeats everywhere the header
   pattern is reused.

---

## 7. Animation & Interaction Standards

All durations/easings are named constants in `lib/motion.ts`, sourced from
Section 6.3 captures — the values below are the *categories* to capture, not
literal numbers to assume.

- **Hero grid hover**: image scale/overlay-darken on hover — capture exact
  scale factor and duration; apply via CSS `transition` (Framer Motion is
  overkill for a simple hover scale).
- **Overlay open (Photo Tour, Lightbox)**: capture whether it's a fade,
  a slide, or a shared-element/layout transition from the clicked photo's
  position — this is the single highest-risk animation to get visually
  wrong. If the reference morphs the clicked thumbnail into the lightbox
  image position, implement with Framer Motion `layoutId` shared transitions
  rather than a plain fade.
- **Overlay close**: reverse of open, same duration/easing unless the
  reference demonstrably uses a different (often faster) close curve.
- **Lightbox prev/next**: capture direction-aware transition (slide
  left/right) vs. simple crossfade — these look similar at a glance but are
  different implementations.
- **Scroll-triggered behavior**: if the reference's booking card sticks/
  unsticks or the header changes on scroll, capture the exact scroll offset
  trigger point, not an approximate one.
- **Respect `prefers-reduced-motion`**: wrap non-essential motion (hover
  scales, decorative transitions) in a media-query check; essential state
  changes (overlay open/close) may keep a reduced, near-instant transition
  rather than removing the state change entirely.

---

## 8. Accessibility Standards

Graded explicitly per the assignment — treat this section as equal priority
to Section 6/7.

### 8.1 Keyboard Navigation
- Every clickable element (photo tiles, buttons, nav links, amenity "Show
  all" trigger) is a real `<button>` or `<a>`, never a `<div onClick>`.
- Tab order follows visual order top-to-bottom, left-to-right within the
  Listing Page.
- Lightbox: `←`/`→` navigate photos, `Esc` closes, `Tab`/`Shift+Tab` cycles
  only within the overlay (focus trap, Section 8.2).
- Photo Tour: standard document tab order within the overlay; `Esc` closes.

### 8.2 Focus Management
- `useFocusTrap` is applied to every overlay: focus moves to the overlay's
  first focusable element (usually its close button) on open, is trapped
  within the overlay while open (`Tab` from the last focusable element wraps
  to the first), and returns to the exact element that triggered the overlay
  on close.
- Background content gets `aria-hidden="true"` (and `inert` where supported)
  while an overlay is open, so screen readers don't navigate into it.
- Body scroll is locked (`useScrollLock`) while any overlay is open.

### 8.3 ARIA & Semantics
- Overlays use `role="dialog"` and `aria-modal="true"`, with an
  `aria-label` describing the overlay ("Photo tour", "Photo Lightbox").
- The Lightbox announces position via a visually-present index counter tied
  to an `aria-live="polite"` region so screen reader users get "Photo 3 of
  24" updates.
- Images have meaningful `alt` text (Section 4); decorative icons get
  `aria-hidden="true"` with the adjacent text carrying the meaning.
- Headings follow a logical single-`h1`-per-page hierarchy; overlay content
  doesn't skip levels.

### 8.4 Verification
Before marking any view done: tab through it start to finish with the mouse
untouched, and run an automated pass (axe DevTools or Lighthouse
accessibility audit) — zero critical/serious issues before considering the
component complete.

---

## 9. Styling Standards (Design Tokens)

All values below are placeholders for the *category* of token — populate the
actual numbers from Section 6.1 captures before writing components, then
lock them here so every component pulls from the same source.

```typescript
// tailwind.config.ts — theme.extend, populated from fidelity-log.md
colors: {
  "airbnb-rausch": "#___",     // primary brand/accent — sample from reference
  "airbnb-ink": "#___",        // primary text color
  "airbnb-gray": "#___",       // secondary text
  "airbnb-border": "#___",     // dividers, card borders
},
fontFamily: {
  sans: ["___", "sans-serif"], // match the reference's actual font stack
},
borderRadius: {
  card: "___px",
  pill: "___px",
},
boxShadow: {
  card: "___",
  "booking-card": "___",
},
```

Rules:
- Never eyeball a color as "close enough" — sample the exact hex from
  DevTools' computed styles or an eyedropper on the screenshot.
- Spacing uses Tailwind's default scale unless a captured value doesn't fit
  it, in which case it's added as a named extension, not an arbitrary
  bracket value (`p-[17px]`) sprinkled through components — one addition to
  the theme, referenced everywhere that needs it.
- Typography scale (sizes, weights, line-heights) is captured once per
  distinct text style used across the page (page title, section heading,
  body text, price text, review text) and named in the Tailwind config.

---

## 10. State Management

- `OverlayContext` (Section 4) is the only cross-component state. It is a
  single `useReducer`, not multiple `useState` calls, since view/index/
  returnTo change together.
- No server state, no data fetching library — `data/listing.json` is
  imported directly at build time.
- Local component state (expanded description, active amenity modal) stays
  local `useState`; it is not lifted into `OverlayContext` unless another
  component needs to react to it.

---

## 11. Performance Standards

- All images through `next/image`, correctly sized `width`/`height` from the
  data contract to avoid CLS.
- Photo Tour and Lightbox images lazy-load outside the initial viewport;
  only the hero grid's visible images are eager/priority-loaded.
- No layout thrash from animations — animate `transform`/`opacity` only,
  never `width`/`height`/`top`/`left` for the overlay transitions in
  Section 7.
- Bundle check: Framer Motion is tree-shaken (`import { motion } from
  "framer-motion"` per-component usage, no barrel re-exports of the whole
  library).

---

## 12. Architecture Diagram Deliverable (production-scale marketplace)

This is a separate deliverable from the app itself — a diagram (image or
PDF) in `docs/architecture-diagram.png`, not code. It answers: *"How would
this scale to a real, production, Airbnb-scale vacation-rental
marketplace?"* — not "how is this take-home clone built." It must cover, at
minimum:

- **Frontend**: CDN-fronted static/SSR delivery (e.g. Next.js on a
  platform like Vercel/CloudFront), edge caching strategy for listing pages,
  image optimization/CDN for photos.
- **Backend**: API layer decomposition (e.g. listings service, booking
  service, reviews service, host service) — service boundaries and why they're
  separated, plus how they're load-balanced/scaled horizontally.
- **Storage**: primary datastore for listings/bookings (relational, e.g.
  Postgres, with read replicas), object storage for photos (e.g. S3-class +
  CDN), caching layer (e.g. Redis) for hot listing pages.
- **Search**: how listing search/filtering scales — a dedicated search
  index (e.g. Elasticsearch/OpenSearch) fed by change-data-capture or events
  from the primary store, geo-search considerations for location-based
  queries.
- **Deployment**: CI/CD pipeline, multi-region considerations, rollout
  strategy (blue-green/canary), observability (logs/metrics/tracing) at the
  edges of each of the above.

Use Excalidraw or Lucid (per the assignment's suggestion); export as a single
static image/PDF, not a live editable link that could disappear. Label every
box and every arrow — an unlabeled diagram is not a deliverable.

---

## 13. AI Sub-Agent / Workflow Configuration

The assignment explicitly grades "modern AI workflow usage (coding agents,
sub-agents, skills, prompts)" and requires sub-agent/skill config files in
the submission. These live in `.claude/agents/` (or the equivalent directory
for whichever tool is used — Cursor rules, Codex config) and are committed,
not just used ephemerally.

Minimum recommended sub-agents/roles:

- **`fidelity-auditor`** — given a component and a reference screenshot,
  produces a diff report (spacing/color/type mismatches) per Section 6.5.
  Does not write code; only critiques.
- **`component-builder`** — implements one component per invocation from a
  filled-out `fidelity-log.md` entry, following Sections 3–5, 9. Refuses to
  proceed if the fidelity-log entry for that component is incomplete.
- **`accessibility-checker`** — audits a finished view against Section 8,
  reports keyboard-trap/ARIA gaps, does not silently "fix and move on"
  without flagging what changed.
- **`motion-implementer`** — takes a Section 6.3 motion capture and
  implements it in `lib/motion.ts` + the relevant component, and only that.

Each agent config file states: its single job, what it's forbidden from
doing (mirroring Section 2's "only job" pattern from prior projects), and
what inputs it expects. Keep the full sequence of prompts used across the
build in `docs/prompts.md` — this is a named submission deliverable ("the
sequence of prompts used for AI-assisted development").

---

## 14. Environment / Config

No real secrets are needed for a static frontend clone.

```bash
# .env.example
# This project has no required environment variables — it is a static
# frontend clone with local JSON data. Leave this file present but empty
# beyond this comment so the convention is documented for reviewers.
```

If a backend is added (optional, Section "Stack"), its config surface must
be documented here in the same commit it's introduced, following the
`.env.example` convention from prior projects.

---

## 15. Error Handling Standards

- Missing/failed image loads show a neutral fallback (gray block, not a
  broken-image icon) — never let a missing asset break the grid layout.
- Overlay components guard against an out-of-range `activePhotoIndex`
  (e.g. `photos.length === 0`) rather than crashing.
- No silent catches: if `data/listing.json` fails to parse at build time,
  the build fails loudly, not a blank page at runtime.

---

## 16. Branching & Commits

### 16.1 Branch Naming
```
<type>/<scope>-<short-description>
```
- **type**: `feat` · `fix` · `chore` · `docs` · `refactor` · `perf`
- **scope**: `listing` · `phototour` · `lightbox` · `motion` · `a11y` ·
  `styles` · `data` · `infra`

Examples:
```
feat/listing-hero-grid-layout
feat/lightbox-keyboard-navigation
fix/phototour-focus-trap-tab-order
perf/listing-image-lazy-loading
docs/fidelity-log-booking-card
```

### 16.2 Commit Messages
`type(scope): imperative description`
```
feat(listing): build hero photo grid with exact reference spacing
feat(lightbox): add prev/next arrows and arrow-key navigation
fix(a11y): trap focus inside phototour overlay
feat(motion): implement shared-element transition from grid to lightbox
```
One commit = one logical change. The app builds and runs at every commit.

---

## 17. Pre-Change Checklist

Run before creating any file, writing any logic, or calling any component
done.

**Fidelity**
- Does `docs/fidelity-log.md` have a completed entry for this component
  (colors, spacing, type, motion) before this code was written?
- Did I compare a screenshot of my build against the reference at the same
  viewport before calling this done?
- Is every copy string, icon, and image traced to the reference, not
  invented?

**Architecture & Boundaries**
- Does this belong to exactly one component (Section 1.3)?
- Is every overlay rendered through `OverlayShell`, not inline JSX?
- Are all colors/spacing/radii from Tailwind theme tokens (Section 9), zero
  arbitrary bracket values sprinkled ad hoc?

**Motion**
- Is the duration/easing a named constant in `lib/motion.ts`, not an inline
  magic number?
- Does it animate `transform`/`opacity` only?
- Is `prefers-reduced-motion` respected?

**Accessibility**
- Real `<button>`/`<a>` elements, not `<div onClick>`?
- Focus trap + focus restore on every overlay?
- `aria-hidden`/`inert` on background content while an overlay is open?
- Tabbed through with the mouse untouched — does it work end to end?

**Commits**
- Conventional Commit format? One logical unit? App builds at this commit?

---

## 18. README & Documentation Requirements

The README is evaluated. It must include:

- **What it is** — one paragraph: the clone, the stack, the approach, the
  reference URL.
- **Architecture** — the three-view diagram (Section 2.1) and state flow
  (Section 2.3).
- **Live URL** — Vercel deployment URL.
- **How to run locally** — exact commands: `pnpm install`, `pnpm dev`.
- **Fidelity approach** — summarize the extraction workflow (Section 6) and
  link to `docs/fidelity-log.md`.
- **Animation & accessibility notes** — call out the trickiest interactions
  matched (e.g. the shared-element lightbox transition) and how keyboard/
  focus management was implemented.
- **AI workflow** — which agent tool was used, what sub-agents were
  configured (Section 13) and why, link to `docs/prompts.md`.
- **Architecture diagram** — link/embed `docs/architecture-diagram.png` and
  one paragraph walking through the scaling decisions (Section 12).
- **What's complete vs. known gaps** — be explicit (e.g. "mobile
  intentionally out of scope per the assignment").

---

## 19. Submission Checklist

Straight from the assignment's deliverables — verify all before zipping.

- [ ] Zipped file containing code + architecture diagram (image/PDF).
- [ ] Code is **not** pushed to a public GitHub repository.
- [ ] `docs/prompts.md` contains the full sequence of AI prompts used.
- [ ] `.claude/agents/` (or equivalent) sub-agent/skill config files are
      included in the zip, not left out as "just tooling."
- [ ] Desktop-only implementation confirmed at ≥1280px; no mobile work
      claimed or required.
- [ ] Listing Page, Photo Tour, and Lightbox all verified against the
      reference per Section 6.5.
- [ ] Keyboard navigation and focus management verified per Section 8.4.
- [ ] Architecture diagram addresses frontend, backend, storage, search,
      and deployment scaling per Section 12.
- [ ] README complete per Section 18.
- [ ] Live deployment URL works and matches the local build.

---

*This document defines the complete standard for this project.*
*The reference URL is the source of truth for all visual/behavioral facts;
this document is the source of truth for how the work is organized and executed.*
*Where they conflict on process (not observed fact), this document wins.*
