# APEX TECHNOLOGY — Website Build Plan

Version 2.1 · 23 Aug 2026 · *v2 revised after inspecting the product footage; v2.1 records build status*

## 0. Brand facts (locked from APEX-Technology-Brand-Guidelines.docx)

- Name: **APEX TECHNOLOGY** (singular)
- Line: "Technology, elevated."
- Colors: Apex Navy `#071A2E` · Electric Cyan `#18B7E8` · Pure White `#FFFFFF` · Studio Ink `#0D2036` · Signal Mist `#EAF8FD`
- Ratio: 60% white/navy, 30% neutral, 10% cyan. Cyan = actions/active states only.
- Type: Inter (ExtraBold display 48–72px, Bold headings 28–40px, SemiBold 18–24px, Regular body 16–18px/1.5, Medium caption 12–14px + tracking)
- Voice: Clear, Confident, Human, Efficient. No hype words.
- Logo rules: horizontal lockup ≥180px wide; below that use symbol only; reversed logo on dark; clear space = A-crossbar height; never stretch/rotate/shadow.

## 1. Products (confirmed from footage)

### Apex POS — flagship
White-label builds ship per client (the demo build is branded "SmartValue", company field "RehmanWare"). Public marketing name is **Apex POS**.

**Critical technical fact: this is a Windows desktop application (`.exe`, 38.4 MB), not a cloud/web app.** All messaging must reflect offline-first, local database, local automatic backup. This is a *selling point* in Pakistan — works through load-shedding and dead internet, no monthly fees, data never leaves the shop's PC.

Modules (sidebar): Dashboard · Inventory · Sales · Returns · Reports · Receipts · Payments · Settings

| Module | Verified capabilities |
|---|---|
| Dashboard | Total products, today sales, today revenue, stock cost, stock worth, low stock, out of stock, categories, week revenue; Revenue/Sales-count/Payment-method charts (last 7 days) |
| Financial Overview | Today profit, expected profit, week profit, revenue-vs-profit chart — **password-locked**, "Lock Financial Overview" |
| Inventory | Unit **and Per-KG** products, purchasing price, selling price, auto profit/item, qty, **IMEI number**, categories + add category, low-stock threshold, archived products, CSV export, bulk edit/delete |
| Sales | Barcode scan or search, product picker w/ live stock, qty, unit price, cart, edit/delete/clear, customer name + phone, **split payment across methods**, live Subtotal **and live Profit** in header, recent sales |
| Payments | **Cash · Bank Transfer · JazzCash · EasyPaisa · Card**, total collected, breakdown by method, transaction log w/ reference, date filters, CSV export |
| Returns | Manage sales & returns, view sale items, return item, edit items, delete entire sale |
| Reports | Date-range/custom filters, total revenue, total profit, transactions, items sold, avg transaction; today/month expense, fixed monthly expenses, **net profit**; tabs: Sales Details, By Category, By Product, Daily Summary, Expenses; export |
| Receipts | Saved bills, search + date filter, thermal receipt preview, view/print/delete, CSV export |
| Settings | Low-stock threshold, login password, **reports/financial password**, worker account password, reset sales history, fixed expenses (rent/salary/electricity/internet), **auto backup every 2 hours**, choose backup folders, restore from backup |
| Roles | Admin / Worker separation |

### Apex Gym — second product
Gym management software (member management, attendance marking, daily check-in stats, dues/reports) — confirmed in clip 1. Gets its own page at `/gym-management`.

## 2. Stack

- Next.js 16 (App Router, TypeScript strict, Turbopack)
- React 19 + Tailwind CSS v4 (CSS-first `@theme` tokens)
- `motion` (Framer Motion v12) for orchestration; native SVG/CSS for path animation
- `react-hook-form` + `zod` for form validation
- `next/font` Inter (self-hosted, subset)
- Deploy target Vercel

## 3. Media pipeline (`scripts/prepare-media.mjs`, uses `ffmpeg-static`)

**Sources:** `Media22.mp4` (1920×1080, 149s, 44.6MB — full POS screen recording) + 6 AI-generated cinematic marketing clips (478×850 portrait, 10–27s).

**Clip inventory:**

| Clip | Content | Use |
|---|---|---|
| 1 | Gym dashboard, attendance marked | `/gym-management` hero |
| 2 | Kiryana shopkeeper in Apex-branded cap/polo scanning biscuits | Retail industry page |
| 3 | Older shopkeeper with paper *khata* ledger | "Before Apex" story beat — strongest emotional hook |
| 4 | iMac showing sales/inventory/billing analytics | Reports feature section |
| 5 | Pharmacy barcode scan with light-trail VFX | Pharmacy industry page |
| 6 | Customer in store | Ambient / CTA background |

**Outputs:**

| Output | Source | Spec | Target |
|---|---|---|---|
| `hero-loop.mp4` / `.webm` | best ~10s **in-app** segment of Media22 (t>25s) | 1280×720, CRF 28/34, silent, +faststart | ~1.5 MB / 0.9 MB |
| `hero-poster.webp` | segment frame 0 | 1920×1080 → webp q80 | ~120 KB |
| `pos-demo.mp4` | Media22 **trimmed from ~22s** | 1280×720 CRF 26, AAC 96k, +faststart | ~13 MB |
| `clip-01..06.mp4/.webm` | 6 clips | 430×764, CRF 30, silent | ~0.6 MB ea |
| `*-poster.webp` | frame per asset | | ~40 KB ea |

**Demo trim:** first ~22s (Windows desktop + login) is cut — it exposes personal files including a folder named `credentials`. In-app tables retained per client confirmation that records are dummy data.

**Loading strategy** (protects Core Web Vitals + Pakistani mobile data):

- Poster image is the LCP element; video fades in only on `canplay`
- Hero video NOT fetched below 768px viewport — poster only
- Not fetched when `prefers-reduced-motion: reduce`
- Demo + clips lazy, IntersectionObserver-gated, `preload="none"`, click-to-play
- Duplicate `Media22 (1).mp4` ignored

**Housekeeping:** raw mp4s + logo files → `_source-media/`; Next app → `apex-technology/`.

## 4. Design system

Tailwind v4 `@theme` tokens: `--color-navy`, `--color-cyan`, `--color-ink`, `--color-mist`. Navy sections alternating with white/mist to hold the 60/30/10 ratio. Reusable: Button (primary/ghost/whatsapp), Section, Card, Badge, Accordion, Reveal, Container. Breakpoints 360/768/1024/1440. WCAG AA on every cyan-on-navy pairing.

## 5. Site architecture

```
/                        Home
/pos-system              PILLAR PAGE — main SEO target
/gym-management          Second product
/pricing                 One-time licence + yearly support
/services                + web-development, mobile-app-development, custom-software
/industries/             retail · restaurant · pharmacy · supermarket
/about  /contact  /privacy  /terms
sitemap.xml · robots.txt · manifest · opengraph-image
```

**Home sections:** Hero (video + circuit SVG) → trust strip → *khata*-to-digital story → POS features → demo video → 6 clips in device frames → how-it-works → pricing preview → industries → Apex Gym → services → FAQ → contact.

## 6. Messaging pillars (derived from the product, not invented)

1. **No monthly fee** — one-time licence, yours forever
2. **Works offline** — no internet, no problem; runs through load-shedding
3. **Know your real profit** — live profit per sale, expenses feed net profit
4. **Built for Pakistani payments** — JazzCash, EasyPaisa, bank transfer, card, cash, split payments
5. **Your data stays yours** — local database, auto-backup every 2 hours
6. **Staff can't see your margins** — worker accounts, password-locked financials

## 7. SEO strategy (Pakistan, nationwide)

**Primary:** `POS system in Pakistan`, `POS software Pakistan`, `best POS system Pakistan`, `POS system price in Pakistan`, `offline POS software Pakistan`, `POS software without monthly fee`

**Secondary:** `restaurant POS software Pakistan`, `retail POS system Pakistan`, `pharmacy POS software`, `supermarket billing software Pakistan`, `karyana store software`, `inventory management software Pakistan`, `JazzCash EasyPaisa POS integration`, `mobile shop POS with IMEI tracking`

**Gym:** `gym management software Pakistan`, `gym attendance software`, `gym member management system`

**Services:** `web development company Pakistan`, `mobile app development Pakistan`, `custom software company Pakistan`

**Long tail / Roman-Urdu in FAQ:** `POS system ki qeemat`, `POS system for small shop in Pakistan`, `dukan ka software`

Cities in copy + `areaServed` schema (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar).

**Technical:** per-route Metadata API w/ canonical + OG; JSON-LD Organization, LocalBusiness, SoftwareApplication + Offer (PKR 30000–80000), FAQPage, BreadcrumbList, VideoObject, WebSite; dynamic OG via `next/og`; `sitemap.ts` + `robots.ts`; LCP < 2.5s, CLS < 0.1.

## 8. SVG animation inventory

1. Apex logo mark — stroke draw-on + pulsing circuit nodes
2. Hero circuit-trace overlay — dasharray traces w/ travelling cyan pulses
3. Section dividers — scroll-driven `stroke-dashoffset` draw
4. Feature icons — barcode scan beam, receipt printing, cash drawer, rising bars, **backup shield** (not cloud), IMEI tag, split-payment fork
5. Stat rings — animated arc + counter
6. How-it-works flow — **scan → bill → print → auto-backup** (pulse travels the path; *not* cloud sync)
7. Animated WhatsApp CTA icon
8. Ambient mesh/isometric grid backgrounds
9. Nav underline sweep, button shine

All behind a global `prefers-reduced-motion` guard.

## 9. Pricing

One-time licence + optional yearly support/updates. Three tiers spanning PKR 30,000–80,000; middle tier flagged "Most popular". Support-plan line on each tier. Exact tier names/inclusions drafted from verified feature list, for client review.

## 10. Git & deployment

**Remote:** `https://github.com/Apex-technologystudio/website.git` (empty, branch `main`). Local dir needs `git init`.

**Raw video must NOT be committed** — 8 source mp4s total ~114 MB; git keeps every blob forever.

- `.gitignore` excludes `_source-media/`, `node_modules/`, `.next/`, `.env*.local`
- Only compressed `public/media/` outputs committed (~20 MB) — Vercel needs them at build
- `docs/MEDIA-SOURCES.md` maps source → output for reproducibility

**Push sequence** (not without client say-so): `git init` → `.gitignore` → commit → `git branch -M main` → `git remote add origin …` → `git push -u origin main`

**Deploy:** Vercel; `NEXT_PUBLIC_SITE_URL` as env var.

## 11. Verification gates

- `scripts/check-links.mjs` crawls built site; zero dead internal links
- CTAs resolve: `wa.me/923357583554` prefilled, `tel:+923357583554`, `mailto:apextechnologies2125@gmail.com`
- Contact form: zod-validated → prefilled WhatsApp + mailto fallback (no backend)
- `next build`, `tsc --noEmit`, ESLint all clean
- Every video plays with poster + fallback
- Responsive + keyboard-nav + focus-visible
- Dev server run and screenshotted before handoff

## 12. Build phases

- **P0** Scaffold + media pipeline
- **P1** Design tokens + Header/Footer/MobileNav
- **P2** Home page
- **P3** POS pillar + pricing + 4 industry pages
- **P4** Gym page + services ×3 + about + contact + legal
- **P5** SEO infra
- **P6** QA

## 13. Open items

1. **Domain** — using `NEXT_PUBLIC_SITE_URL`, placeholder `apextechnology.pk`. Needs real value.
2. **FBR POS integration** — no claim made anywhere until confirmed true. Top Pakistani search term; false claim is a legal/trust risk.
3. **No invented testimonials, client logos, or client-count stats.** Components ship with marked placeholder slots for real content.
4. **Gym product feature list** unverified beyond one frame — page ships with conservative copy pending detail.
5. About-page history/team copy is placeholder.


---

## 14. Build status — 23 Aug 2026

**Delivered.** All 24 routes build and prerender as static HTML.

| Gate | Result |
|---|---|
| `next build` | ✓ 24/24 routes prerendered |
| `tsc --noEmit` | ✓ clean |
| `eslint .` | ✓ clean |
| `check-links.mjs` | ✓ 16 pages crawled, zero dead links, all `wa.me`/`tel:`/`mailto:` well-formed |
| `audit-layout.mjs` @360px | ✓ 16/16 routes, no horizontal scroll |
| JSON-LD | ✓ parses on every page; correct types per route |
| Contact form | ✓ validation + `wa.me` composition verified end-to-end in a real browser |
| `sitemap.xml` / `robots.txt` | ✓ 16 URLs, sitemap + host declared |
| OG image | ✓ renders with vendored Inter |
| Console errors | ✓ none on any route screenshotted |

**Media:** 114 MB of masters → **~10 MB** committed. Hero loop 350 KB (mp4) / 260 KB (webm); demo 4.4 MB click-to-play.

### Bugs found and fixed during the build

1. **`tailwind-merge` silently stripped every heading size.** It classified the custom `text-h2`/`text-h3`/`text-display` tokens as *text colour*, so `cn('text-h2','text-white')` resolved to just `text-white`. Every `SectionHeading` was rendering at body size. Fixed by registering the tokens under the `font-size` class group in `src/lib/utils.ts`.
2. **Hero poster did not match the video's first frame.** Fast-seeking the master landed on a different screen, producing a visible jump on fade-in. Poster is now extracted from frame 0 of the encoded loop.
3. **WebM was larger than H.264 on all six showcase clips** (1.6–1.9×). Since browsers take the first supported source, WebM was dropped for clips.
4. **`items-start` on the hero's flex column** made children size to max-content, risking overflow on narrow viewports.
5. **`setState` inside an effect** in the header (route-change menu close) caused cascading renders; replaced with React's render-phase state adjustment.

### Still outstanding for the client

1. **`NEXT_PUBLIC_SITE_URL`** must be set to the real domain before deploy.
2. **Package contents are provisional.** The PKR 30/55/80k prices are confirmed; which features sit in which tier needs commercial sign-off.
3. **No FBR POS integration is claimed.** High-volume search term — add only if genuinely true.
4. **No testimonials, client logos or client-count statistics.** None were invented; supply real ones to add them.
5. **Apex Gym copy is conservative**, covering only what was verifiable from one frame of footage.
6. **Nothing has been pushed to GitHub** — awaiting client instruction.


---

## 15. SEO pass — 23 Aug 2026

Keyword and metadata rework, grounded in competitor research rather than assumption.

**What the research showed.** Effectively every POS sold in Pakistan is a monthly subscription, commonly advertised at PKR 1,500-2,000/month; one competitor puts "PKR 2,000/Month" directly in its page title. Competitors lead on FBR integration, Urdu support and free trials.

**What changed.**

- New `src/lib/seo.ts`: keyword clusters grouped by *intent* (core commercial, problem, trade, payments, gym, services) plus a `pageMeta()` helper keeping canonical/OG/Twitter consistent.
- Every title rewritten to lead with the keyword and carry the price where intent is commercial.
- Every description rewritten to ~150 chars ending in the phone number in local format.
- Trade keyword coverage widened: mobile shop/IMEI, garments, bakery, chemist, departmental store, fast food, weight-based billing.
- City-qualified keywords generated for all 10 service cities.
- `priceRange` and `knowsLanguage` added to Organization schema.
- **Title template removed.** `| APEX TECHNOLOGY` was pushing 10 of 14 titles past Google's truncation point.
- New `CostComparison` section on `/`, `/pos-system` and `/pricing` — the rent-vs-own arithmetic, which is the sharpest differentiator this product has.
- New `scripts/audit-seo.mjs` gate: title/description length, canonical and OG presence, duplicate detection. **Currently PASS with zero warnings across all 14 routes.**

**Deliberately not done:** no FBR integration claim (still unverified), no free-trial claim (the product is a paid licence with a free demo), no competitor named in the comparison, and no invented review or rating markup.


---

## 16. Interface pass — 23 Aug 2026

Added: intro preloader, floating enquiry drawer, glassy mobile bottom navigation, and an `/industries` index page.

**Delivered**

- `Preloader` — Apex mark drawing itself in cyan with pulsing circuit nodes, over navy with a grid and glow. Session-scoped, 1050ms minimum, 1700ms cap, skipped under reduced motion, never server-rendered.
- `ContactDrawer` — floating CTA with expanding SVG rings; right drawer on desktop, bottom sheet on mobile. Fields: name, business, phone, city (datalist of the 10 service cities), what they need, budget band. Embossed inputs, focus trap, Escape to close, focus returned to the trigger.
- `BottomNav` — floating glass pill: Home, Apex POS, Pricing, Trades, Contact. Cyan lit pill plus a glowing notch on the active item, safe-area inset for iOS.
- `/industries` index — the bottom bar needed a target and the child pages had no parent, which was a real SEO gap; breadcrumbs now resolve to it properly.

**Problems found and fixed while building**

1. **Glass at 72% was unusable** — page text scrolling behind stayed fully legible and collided with the nav labels. Raised to 88% with heavier blur, plus a `@supports` fallback for browsers without `backdrop-filter`.
2. **Bottom-bar icons were wrong** — Home used a storefront and Trades a gear that read as settings. Added a proper `HomeIcon`; Trades now uses the storefront.
3. **Preloader flashed** — on a fast connection `load` fires almost immediately, so it appeared and vanished within a frame or two. Added `MIN_MS`.
4. **The mark never finished drawing** — its animation ran ~1.65s against an 800ms display window, so the completed logo was never seen. Compressed the animation to ~0.95s and raised `MIN_MS` to 1050ms.
5. **`setState` inside an effect** (same React rule as the header). Replaced with `useSyncExternalStore`, whose server snapshot returns `false` — which is also what keeps the overlay out of the server HTML.

**Verification**

`next build` (25 routes), `tsc`, `eslint` all clean. Links pass. SEO audit passes with `/industries` added. No horizontal overflow at **360, 390, 414 and 768px**. Drawer verified end-to-end in a real browser: validation fires, the composed `wa.me` message carries every field, Escape closes and restores focus, no console errors.


---

## 17. Open/close motion — 23 Aug 2026

The drawer and the mobile menu both snapped rather than eased. Two separate causes:

1. **The drawer had an entrance keyframe only.** `animate-[apex-sheet-in]` plays once on mount, so opening animated but closing jumped. Replaced with a `transition-transform` between translate states, which eases both directions and survives being interrupted mid-flight.
2. **The mobile menu had no animation at all.** It used `hidden`, which is binary and cannot be transitioned. Replaced with a `grid-template-rows: 0fr → 1fr` transition — this eases to the content's natural height with no hardcoded `max-height` to clip or lag behind it. Submenus use the same technique.

Both now use **`inert`** while closed instead of `hidden`: identical effect on tab order and the accessibility tree, but the element remains animatable.

**Verified by measurement**, not by eye — frame-sampled in a real browser:

- Mobile sheet: `100% → 50.4% → 15.5% → 6.0% → 1.6% → 0.29% → 0` (settles ~420ms)
- Desktop drawer: `100% → 39.8% → 12.3% → 3.7% → 0.88% → 0` (same curve)
- Mobile menu height: `1px → 339 → 458 → 483 → 492 → 493`, and closing passes through 64px rather than jumping

**Reduced motion re-checked:** preloader skipped entirely, menu at full height within 50ms, drawer already at translate 0 — they snap rather than animating slowly.

**Gotcha worth recording:** Tailwind v4 compiles `translate-y-full` to the CSS `translate` property, not `transform`. `transition-transform` does cover it (`transition-property: transform, translate, scale, rotate`), but an initial debug pass read `getComputedStyle(el).transform`, saw `none`, and wrongly concluded the animation was dead. Read `.translate` when debugging these.


---

## 18. Hero replacement + two footage sections — 23 Aug 2026

Client supplied two stock clips and reported the hero video stuttering.

**Diagnosis of the stutter.** Not the file — 350 KB decodes trivially. Two per-frame GPU costs were stacked over it:

1. `blur-[2px]` on a full-viewport `<video>`. The browser re-blurred the frame at viewport size every frame. This was self-inflicted: the old hero was a *screen recording* whose dense UI text fought the headline, and blur was the workaround.
2. `apex-pulse-node` animated the SVG `r` attribute. `r` is geometry, so every frame re-rasterised the entire full-viewport CircuitTraces SVG instead of staying on the compositor.

**Fixes**

- Hero swapped to `counter-master.mp4` (4K, a shop assistant working a touchscreen POS terminal) — on-message, and its natural depth of field means **no blur is needed at all**, removing the root cause rather than masking it.
- `apex-pulse-node` now animates `opacity` + `transform: scale()` with `transform-box: fill-box`.
- Hero scrim rebalanced: it was a flat wash tuned to suppress a busy screen recording and buried the new footage. Now a horizontal ramp — near-opaque under the headline, thinning to the right so the terminal stays visible — plus a vertical pass for the top/bottom edges. Held dark across the full width below `lg`, where text spans the viewport.
- Encodes gained `-g 50` (keyframe every ~2s) so the loop restart does not stall.

**Two new sections** (`VideoFeature` + `NewSections.tsx`), on `/` and `/pos-system`:

- **"At the counter"** — `counter-clip`, a later beat of the hero footage, framed bright instead of scrimmed.
- **"Know your numbers"** — `reports-clip`, hands reviewing charts.

Both clips are `preload="none"` and IntersectionObserver-gated, so they cost nothing until scrolled to.

**Honesty note:** the reports footage shows a *tablet*, and Apex POS is Windows-desktop only. Rather than let the imagery imply a tablet app, that section carries an explicit footnote stating it runs on the shop's own PC and there is no separate tablet or phone app.

**Also found:** the hero WebM was now *larger* than the MP4 (810 KB vs 690 KB) because the content changed from screen recording to live action — the same trap already fixed for the showcase clips. Hero WebM dropped.

**Verified:** build (25 routes), `tsc`, `eslint`, links, SEO audit all clean; no horizontal overflow at 360/390/768. Media total ~11 MB.
