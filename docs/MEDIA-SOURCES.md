# Media sources

Maps every file in `public/media/` back to its master, so the pipeline is reproducible on another machine.

Masters live in `../_source-media/video/` — **outside this repo, and gitignored by being outside it.** Keep them backed up separately; they cannot be regenerated from `public/media/`.

Regenerate with `npm run media` (or `npm run media:hero`). Encoder settings live in `scripts/prepare-media.mjs`.

---

## Masters

| File in `_source-media/video/` | Original name | Resolution | Length | Size |
|---|---|---|---|---|
| `pos-demo-master.mp4` | `Media22.mp4` | 1920×1080 | 2:29 | 44.6 MB |
| `pos-demo-master-DUPLICATE.mp4` | `Media22 (1).mp4` | 1920×1080 | 2:29 | 44.6 MB — byte-identical duplicate, unused |
| `clip-01.mp4` | `WhatsApp Video 2026-08-21 at 5.56.34 PM.mp4` | 478×850 | 0:16 | 3.7 MB |
| `clip-02.mp4` | `WhatsApp Video 2026-08-21 at 5.57.06 PM (1).mp4` | 478×850 | 0:10 | 2.1 MB |
| `clip-03.mp4` | `WhatsApp Video 2026-08-21 at 5.57.06 PM.mp4` | 478×850 | 0:24 | 5.5 MB |
| `clip-04.mp4` | `WhatsApp Video 2026-08-21 at 5.57.07 PM.mp4` | 478×850 | 0:18 | 3.8 MB |
| `clip-05.mp4` | `WhatsApp Video 2026-08-21 at 5.57.08 PM (1).mp4` | 478×850 | 0:10 | 2.1 MB |
| `clip-06.mp4` | `WhatsApp Video 2026-08-21 at 5.57.08 PM.mp4` | 478×850 | 0:26 | 5.7 MB |
| `counter-master.mp4` | `4524439-uhd_3840_2160_25fps.mp4` | **3840×2160** | 0:18 | 55.5 MB |
| `reports-master.mp4` | `6602061-hd_1920_1080_30fps.mp4` | **1280×720** — *not* 1920×1080 as the filename claims | 0:23 | 4.4 MB |

---

## Outputs

| Output | Source | Transform | Size | Used by |
|---|---|---|---|---|
| `hero-loop.mp4` | `counter-master.mp4` @ 2s, 10s | H.264 1280×720 CRF 30, `-g 50`, silent | 690 KB | Home hero |
| `counter-clip.mp4` | `counter-master.mp4` @ 12s, 6s | H.264 960 wide CRF 31, silent | 150 KB | "At the counter" section |
| `reports-clip.mp4` | `reports-master.mp4` @ 3s, 9s | H.264 960 wide CRF 31, silent | 260 KB | "Know your numbers" section |
| `counter-clip-poster.webp` / `reports-clip-poster.webp` | frame 0 of each encoded clip | 960 wide | ~15–20 KB | Section posters |
| `hero-poster.webp` | **frame 0 of `hero-loop.mp4`** | 1280 wide | 40 KB | Hero LCP element |
| `hero-poster.jpg` | same | q4 fallback | 90 KB | Fallback |
| `pos-demo.mp4` | `pos-demo-master.mp4` from 22s | H.264 720p CRF 26 + AAC 96k | 4.4 MB | Demo player |
| `pos-demo-poster.webp` | master @ 34s | 1280 wide | 30 KB | Demo poster, VideoObject thumbnail |
| `clip-0N.mp4` | `clip-0N.mp4` | H.264 430 wide CRF 30, silent | 0.3–1.1 MB | Phone frames |
| `clip-0N-poster.webp` | frame @ 3s | 430 wide | ~25 KB | Clip posters |

**Total committed: ~11 MB.**

---

## Decisions worth knowing

**The demo starts at 22 seconds.** The master opens with ~22s of Windows desktop and the login screen, showing personal files including a folder named `credentials`. That is trimmed off and never published. The client confirmed the in-app customer names and phone numbers are dummy test data, so those are retained.

**The hero poster comes from the encoded loop, not the master.** Fast-seeking the master with `-ss` lands on the nearest prior keyframe, which is a different screen (Sales rather than Dashboard). Using the master's frame produced a visible jump when the video faded in over the poster. Frame 0 of the output is the only frame guaranteed to match.

**The hero segment (2s–12s of `counter-master`)** was chosen because the camera is static across it — only the subject moves — so the loop cut reads as her repeating a movement rather than the shot jumping.

**Nothing ships WebM any more.** VP9 measured 1.6–1.9× *larger* than H.264 on every live-action clip, and once the hero became live-action footage it measured larger there too (810 KB vs 690 KB). Browsers take the first source they support, so shipping WebM would hand Chrome and Firefox the bigger file. VP9 only won while the hero was a *screen recording* (260 KB vs 350 KB) — if a screen-recorded hero ever returns, re-test rather than assuming.

**The hero is no longer blurred, and must not be again.** The previous screen-recording hero carried `blur-[2px]` because its dense UI text fought the headline — and blurring a full-viewport video on every frame was the cause of a reported stutter. Cinematic footage has its own shallow depth of field, so the scrim alone suffices. If softening is ever wanted, bake it into the encode; that is free at runtime.

**`-g 50`** on the hero and section clips puts a keyframe every ~2 seconds, so looping back to the start does not stall waiting for one.

**The old screen-recording hero is not lost** — the full walkthrough it came from is still the click-to-play `pos-demo.mp4` in the demo section, where the UI is shown sharp and at full size instead of blurred behind text.

---

## Clip assignments

The six clips are AI-generated marketing footage, portrait 9:16, so they are framed in phone chassis rather than cropped to landscape.

| Clip | Content | Where it appears |
|---|---|---|
| 01 | Gym dashboard, attendance marked | `/gym-management`, home Gym teaser |
| 02 | Shopkeeper in Apex-branded cap scanning at a kiryana counter | `/industries/retail`, home Showcase |
| 03 | Older shopkeeper working a paper khata ledger | Home "From khata to software" |
| 04 | Sales and inventory analytics on an iMac | `/industries/supermarket`, home Showcase |
| 05 | Pharmacy barcode scan | `/industries/pharmacy`, home Showcase |
| 06 | Customer being served in store | `/industries/restaurant` |

## Landscape stock footage

| Source | Content | Where it appears |
|---|---|---|
| `counter-master` | Shop assistant working a touchscreen POS terminal | Home hero, plus "At the counter" (a later beat) |
| `reports-master` | Hands reviewing charts on a tablet, card reader on the desk | "Know your numbers" |

**Caveat on `reports-master`:** it shows a *tablet*, and Apex POS is Windows-desktop only. The section using it carries an explicit footnote saying it runs on the shop's own PC and there is no separate tablet or phone app, so the imagery cannot imply a product capability that does not exist.
