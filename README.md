# APEX TECHNOLOGY — Website

Marketing site for APEX TECHNOLOGY, built around **Apex POS** (offline Windows POS software for Pakistani shops) and **Apex Gym**.

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Motion

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

| Script | What it does |
|---|---|
| `npm run build` | Production build (all 24 routes prerender static) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run media` | Rebuild all web video/posters from the source masters |
| `npm run media:hero` | Rebuild just the hero loop and its poster |

---

## Before deploying

Set **`NEXT_PUBLIC_SITE_URL`** to the real domain (e.g. `https://apextechnology.pk`).

Canonical URLs, `sitemap.xml`, `robots.txt` and all JSON-LD absolute URLs are derived from it. If it is wrong, every SEO tag on the site is wrong.

Resolution order (`src/lib/site.ts`):

1. `NEXT_PUBLIC_SITE_URL` — set this to the real domain
2. Vercel's own production hostname, injected automatically
3. `https://apextechnology.pk` — local builds only

**Set it to a domain you actually control.** `.vercel.app` subdomains are globally unique and first-come; `apex-technology.vercel.app` belongs to an unrelated project. Pointing this variable at it made every canonical tag credit a stranger's site and caused Google to reject all 17 sitemap URLs with "URL not allowed". Step 2 exists so a *missing* variable falls back to the real deployment instead of a wrong guess — but a *wrong* value still overrides everything, so verify it.

Verify after deploying: `curl https://<your-domain>/sitemap.xml` — the hosts inside must match the domain you fetched it from.

On Vercel: Project → Settings → Environment Variables.

---

## Where to change things

Nearly all copy and data is separated from layout:

| What | File |
|---|---|
| Phone, email, WhatsApp, nav, cities served | `src/lib/site.ts` |
| Prices and package contents | `src/content/pricing.ts` |
| Apex POS feature copy | `src/content/pos.ts` |
| Industry pages | `src/content/industries.ts` |
| Services pages | `src/content/services.ts` |
| FAQ (also feeds FAQPage schema) | `src/content/faq.ts` |
| Titles, descriptions, keyword clusters | `src/lib/seo.ts` |
| Blog articles | `content/blog/*.md` |
| City landing pages | `src/content/cities.ts` |
| Comparison pages | `src/content/comparisons.ts` |
| JSON-LD builders | `src/lib/schema.ts` |
| Brand colours and type scale | `src/app/globals.css` (`@theme`) |
| Mobile bottom-bar items | `src/components/layout/BottomNav.tsx` |
| Enquiry drawer fields, budget bands | `src/components/layout/ContactDrawer.tsx` |
| Intro screen timing | `src/components/layout/Preloader.tsx` |

**Contact details are never hardcoded in a component.** Change `src/lib/site.ts` and it updates everywhere, including structured data.

Adding an industry or service to its content array automatically creates the page, the nav entry, the cards and the sitemap entry.

---

## Media pipeline

Raw video masters live **outside this repo**, in `../_source-media/video/`. They total ~114 MB and must never be committed — git keeps every blob forever.

`public/media/` holds the compressed, web-ready derivatives (~10 MB) and **is** committed, because the build needs them.

To regenerate after replacing a master:

```bash
npm run media          # everything
npm run media:hero     # just the hero loop
```

See [`docs/MEDIA-SOURCES.md`](docs/MEDIA-SOURCES.md) for which source maps to which output.

### Everything is H.264, no WebM

VP9 measured **1.6–1.9× larger** than H.264 on every live-action clip, and once the hero became live-action footage it measured larger too (810 KB vs 690 KB). Browsers pick the first source they support, so shipping WebM would hand Chrome and Firefox the bigger file.

VP9 only won while the hero was a *screen recording* (260 KB vs 350 KB). If a screen-recorded hero ever returns, re-test rather than assuming either way.

### Never put a CSS filter on the hero video

The hero used to carry `blur-[2px]`, and blurring a full-viewport video every frame was the cause of a reported stutter. The current footage has natural shallow depth of field, so the scrim alone is enough. If the hero ever needs softening again, **bake it into the encode** — that is free at runtime — rather than adding a CSS filter.

Related: keyframes must not animate SVG geometry (`r`, `cx`, `width`). Those force the whole SVG layer to re-rasterise each frame; animate `opacity` and `transform` instead. See `apex-pulse-node` in `globals.css`.

---

## Performance notes

- The hero **poster is the LCP element**; the video fades in on `canplay`
- The hero video is **not fetched at all** below 768px, under `prefers-reduced-motion`, or when `saveData` is on — it is gated in an effect, not by CSS, so those cases cost zero requests
- The hero poster is extracted from frame 0 of the *encoded loop*, not the master, so there is no visible jump on fade-in
- Showcase clips are `preload="none"` and IntersectionObserver-gated
- The ~2.9 MB demo video is click-to-play — the `<video>` element does not exist until requested
- The demo carries **no audio track at all** (stripped at encode). The source measured -43.5 dB mean / -22.3 dB peak — inaudible room noise costing ~1.5 MB. The player is muted as well, which also keeps `autoPlay` reliable, since browsers block autoplay of audible media

## Analytics

`@vercel/speed-insights` is mounted in the root layout. It reports real-user Core Web Vitals — the only way to know whether the LCP/CLS work holds on Pakistani mobile connections rather than on a dev machine. Enable it under **Speed Insights** in the Vercel dashboard; it is inert until then and collects nothing locally.

**It is described in `/privacy`.** That page states the site runs no advertising or cross-site trackers and documents this one measurement tool explicitly. If any other script, pixel, or server-side endpoint is added, update `/privacy` in the same change — there is a maintainer note at the top of that file saying so.

---

## Verification

```bash
npm run build
npx eslint .
npm start &                                   # or next start --port 3311
node scripts/audit-seo.mjs http://localhost:3311
node scripts/check-links.mjs http://localhost:3311
ROUTES="/,/pos-system,/pricing" node scripts/audit-layout.mjs http://localhost:3311 360
node scripts/shoot.mjs /pricing shot.png 1440 1100
```

- `audit-seo.mjs` — prints every route's title/description/canonical and flags anything Google would truncate, plus duplicate titles or descriptions
- `check-links.mjs` — crawls the site, fails on dead internal links and malformed `wa.me` / `tel:` / `mailto:` URLs
- `audit-layout.mjs` — fails if any route scrolls horizontally, naming the offending element
- `shoot.mjs` — screenshots a route and reports console errors

> Git Bash mangles bare `/` arguments into Windows paths. Prefix these with `MSYS_NO_PATHCONV=1` when running from Git Bash.

---

## Accessibility

- Skip-to-content link, visible focus rings, semantic headings
- FAQ uses native `<details>`/`<summary>` — keyboard-correct without JS, and answers stay in the DOM for crawlers
- Desktop dropdowns open on `:hover` **and** `:focus-within`, so keyboard users get them with no JS state
- All animation is disabled by a single `prefers-reduced-motion` block in `globals.css`; `Reveal` checks it in JS too, since Motion sets inline styles that CSS cannot reach

---

## Known follow-ups

See `docs/PLAN.md` §13. In short:

1. **Set `NEXT_PUBLIC_SITE_URL`** to the real domain
2. **Confirm package contents** — the PKR 30/55/80k prices are confirmed, but which features sit in which tier is provisional
3. **No FBR POS integration is claimed anywhere.** It is a high-volume Pakistani search term; only add it if it is genuinely true
4. **No testimonials, client logos or client-count statistics exist.** Nothing was invented — supply real ones to add them
5. Apex Gym copy is deliberately conservative, describing only what was verifiable


---

## SEO notes

Metadata is written for **click-through**, not just ranking — a page that ranks but is not clicked produces no leads. Three rules, applied in `src/lib/seo.ts`:

1. **Price in the title where intent is commercial.** Pakistani POS buyers search on price, and it pre-qualifies the click.
2. **The differentiator in the title.** Competitors sell monthly subscriptions; "one-time" and "no monthly fee" are what separate this product.
3. **A phone number and a next step in the description**, in local format (`0335 7583554`) so it can be dialled straight from the SERP.

**There is no `| BRAND` title template.** It cost 7–18 characters on every page and pushed most titles past truncation, spending the most valuable pixels in the result on a brand nobody searches for yet. Run `npm run audit:seo` after any title change to confirm nothing exceeds the limits.

The rent-vs-own comparison (`CostComparison.tsx`) is the main conversion device on `/`, `/pos-system` and `/pricing`. It names no competitor and asserts no company's price — the monthly figure is given as a range the visitor substitutes their own quote into, and year one is shown honestly as cheaper for the subscription.


---

## Interface chrome

Three client-only pieces mount in the root layout. None appears in the server HTML, so crawlers and the no-JS experience get the page unchanged.

### Preloader

A preloader is normally an SEO tax — an overlay covering content delays when the largest element counts as painted, and Core Web Vitals feed ranking. This one is constrained so it stays polish:

| Guard | Value |
|---|---|
| Shows | First visit per session only (`sessionStorage`) |
| Minimum on screen | 1050ms — below this it *flashes*, which reads as a glitch |
| Hard cap | 1700ms, whatever else happens |
| Reduced motion | Skipped, and `display:none` in CSS so it vanishes rather than animating fast |

`MIN_MS` is deliberately tied to the mark's own animation length (~0.95s). Shortening one without the other means visitors never see the logo finish drawing. **Change them together.**

### Bottom navigation (mobile)

A floating glass pill, not an edge-to-edge bar, hidden at `lg` where the header already carries full nav. `pb-bottomnav` on `<body>` reserves the space.

Glass sits at **88%** navy opacity. It was 72% and the page scrolling underneath stayed fully legible through the bar, colliding with the labels — the heavy blur plus saturation is what still reads as glass at 88%. There is a `@supports not (backdrop-filter)` fallback so unsupported browsers get a near-solid bar rather than a see-through one.

### Enquiry drawer

Right-hand drawer on desktop, bottom sheet on mobile (a thumb reaches the bottom of a phone more easily than the side). Delivers via prefilled WhatsApp with a mailto fallback, matching `/contact` — so every enquiry route behaves identically and needs no backend.

Fields use `field-emboss`. Neumorphism usually fails accessibility, so it keeps a real 1px border and a full-contrast focus ring rather than relying on shadow to say "this is an input".

### Open/close motion

Both the drawer and the mobile menu animate with CSS **transitions**, not keyframes. A one-shot keyframe only plays on enter, so closing snapped; a transition eases both directions and can be interrupted if the user taps twice.

Neither uses `hidden`, which is binary and cannot animate. They use **`inert`** while closed — same effect on the tab order and the accessibility tree, but the element stays animatable.

- **Drawer** — `transition-transform`, translating `translate-y-full → 0` on mobile and `translate-x-full → 0` at `sm+`. Note Tailwind v4 compiles translate utilities to the CSS `translate` property, not `transform`; `transition-transform` covers both, but read `getComputedStyle(el).translate` when debugging, not `.transform`.
- **Mobile menu** — `grid-template-rows: 0fr → 1fr`, which eases to the content's natural height without a hardcoded `max-height` that would clip or lag. The submenus use the same technique.

Measured curve (ease-out-expo, ~420ms to settle): `100% → 50% → 15% → 6% → 1.6% → 0`.

Under `prefers-reduced-motion` the global block in `globals.css` collapses these durations, so both snap open instantly rather than animating slowly.

Verify it with `node scripts/shoot-drawer.mjs out.png [w] [h]` — that script opens the drawer, checks validation fires, confirms the composed `wa.me` link, and asserts Escape closes it and returns focus to the trigger.


---

## Adding content

**A new article:** drop a `.md` file in `content/blog/`. Required frontmatter: `title`, `description`, `date`, `answer`. Optional: `metaTitle`, `updated`, `keywords`, `related`. The route, sitemap entry, reading time and schema all follow automatically; a missing required field fails the build with the filename in the error rather than shipping a broken page.

Keep `answer` a **complete, self-contained sentence**. It renders as the "Short answer" block and is the part answer engines quote.

**A new city:** add an entry to `src/content/cities.ts`. Only add a city you can write about *specifically* — real commercial districts, the local retail mix, a genuine operational note. Ten templated pages are doorway pages and are penalised; six real ones rank. If you cannot write it specifically, leave it out — `areaServed` in the Organization schema already covers the whole country.

**A new comparison:** add an entry to `src/content/comparisons.ts`. **Give the competing option some winning rows.** A table where one column takes every point reads as an advert and gets discounted by readers and by AI summarisers alike.

Anything new should also go in the relevant `footerLinks` group in `src/lib/site.ts` — pages linked from nowhere get crawled slowly regardless of the sitemap.
