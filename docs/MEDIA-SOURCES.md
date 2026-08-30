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
| `demo-english-master.mp4` | `WhatsApp Video 2026-08-30 at 9.30.06 PM.mp4` | 1280×720 | 0:58 | 12.2 MB |
| `demo-urdu-master.mp4` | `WhatsApp Video 2026-08-30 at 9.38.40 PM.mp4` | 2560×1440 | 0:58 | 65.4 MB |
| `story-mobileshop-master.mp4` | `WhatsApp Video 2026-08-30 at 9.25.00 PM.mp4` | 478×850 | 0:24 | 5.5 MB |
| `story-gym-master.mp4` | `WhatsApp Video 2026-08-30 at 9.25.46 PM.mp4` | 848×478 | 0:40 | 8.5 MB |

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
| `demo-english.mp4` | `demo-english-master.mp4` | H.264 **1280×650** CRF 26 + **AAC 128k** | 2.5 MB | Demo player, English |
| `demo-urdu.mp4` | `demo-urdu-master.mp4` | H.264 **1280×650** CRF 26 + **AAC 128k** | 2.5 MB | Demo player, Urdu |
| `demo-*-poster.webp` | frame @ 20s of each **encoded** file | 1280 wide | 60 KB | Posters, VideoObject thumbnails |
| `story-mobileshop.mp4` | `story-mobileshop-master.mp4` | H.264 430 wide CRF 30, silent | 1.1 MB | Problems section |
| `story-gym.mp4` | `story-gym-master.mp4` | H.264 860 wide CRF 30, silent | 2.3 MB | `/gym-management` |
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


---

## The narrated demos (30 Aug 2026)

Two recordings of the same 59-second walkthrough, one narrated in English and one in Urdu. They replaced a 127-second silent screen recording: shorter, explained out loud, higher-resolution source, and they open in a spreadsheet rather than on a Windows desktop.

**Audio is kept on these two files and nowhere else.** The old demo's audio measured −43.5 dB — inaudible room noise — and was stripped. This is narration and is the entire point of the file. **Do not add `-an` to the demo encode.** The player passes `muted={false}` for the same reason.

**Both are cropped to 1280×650**, removing the bottom 70px. That strip held the Windows taskbar *and* a "created with ElevenLabs" watermark that the narration tool burned into the bottom-right corner. A first attempt cropping 52px left a visible sliver of taskbar icons; 70px cuts cleanly at the application's own status bar. Height is cropped but **never width**, so no part of the UI is lost — and `NarratedDemo` sets `aspect-[128/65]` so the frame is never stretched back into a 16:9 box.

Posters are taken from the **encoded, cropped** output, so the watermark cannot reappear in a thumbnail.

If the watermark is removed at source later (a paid ElevenLabs plan), re-record and the crop can be reduced or dropped — change `crop=1280:650:0:0` and the matching `aspect-[128/65]` together.

### Files deliberately left unused

Three clips from 30 Aug sit in `_source-media/video/unused/`. They show a dashboard UI that is **not Apex POS** — different design, and amounts denominated in **US dollars** (`$234.55`, `$5,506`, `$518.00`). Presenting them as the product would be a fabricated screenshot, and dollar figures would mislead Pakistani buyers.
