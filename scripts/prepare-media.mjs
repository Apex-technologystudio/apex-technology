#!/usr/bin/env node
/**
 * APEX TECHNOLOGY — media pipeline
 *
 * Transcodes the raw masters in ../_source-media/video into web-ready assets
 * in public/media. Raw masters are gitignored; these outputs are committed
 * because Vercel needs them at build time.
 *
 * Usage:  node scripts/prepare-media.mjs [hero|demo|clips|sections|all]
 */
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpegPath from 'ffmpeg-static'

const run = promisify(execFile)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC = path.resolve(ROOT, '..', '_source-media', 'video')
const OUT = path.join(ROOT, 'public', 'media')

/**
 * Hero loop: a shop assistant working a touchscreen POS terminal.
 *
 * Replaced the old screen-recording hero. Two reasons, one of them a bug fix:
 * a dense UI recording competes with the headline for attention, which forced a
 * CSS blur over the whole viewport — and blurring a full-screen video every
 * frame was the cause of the reported stutter. Cinematic footage carries its own
 * shallow depth of field, so it needs no blur and the GPU cost disappears.
 *
 * The camera is static across this segment, so the loop cut reads as the
 * subject repeating a movement rather than the shot jumping.
 */
const HERO = { file: 'counter-master.mp4', start: 2, duration: 10 }

/** Section clips: ambient loops, muted, shown in framed cards. */
const SECTION_CLIPS = [
  // Same shoot as the hero but a later beat, framed bright instead of scrimmed.
  { id: 'counter-clip', file: 'counter-master.mp4', start: 12, duration: 6, width: 960 },
  // Hands reviewing charts on a tablet, card reader on the desk.
  { id: 'reports-clip', file: 'reports-master.mp4', start: 3, duration: 9, width: 960 },
]

/**
 * Narrated product walkthrough, recorded twice: once in English, once in Urdu.
 *
 * These replaced a 127-second silent screen recording. Shorter, explained out
 * loud, higher-resolution source, and it opens in a spreadsheet rather than on
 * a Windows desktop, so nothing personal is on screen.
 *
 * AUDIO IS KEPT HERE, unlike everywhere else in this pipeline. The old demo's
 * audio was inaudible room noise and was stripped; this is narration and is the
 * entire point of the file. Do not add `-an` to these.
 */
const DEMOS = [
  { id: 'demo-english', file: 'demo-english-master.mp4', poster: 20 },
  { id: 'demo-urdu', file: 'demo-urdu-master.mp4', poster: 20 },
]

/** Short story clips: the problem, then the product. Silent, used as b-roll. */
const STORY_CLIPS = [
  { id: 'story-mobileshop', file: 'story-mobileshop-master.mp4', width: 430 },
  { id: 'story-gym', file: 'story-gym-master.mp4', width: 860 },
]

const ff = (args) => run(ffmpegPath, ['-y', '-hide_banner', '-loglevel', 'error', ...args])

const label = (s) => `  ${s}`
async function report(file) {
  try {
    const { size } = await stat(file)
    console.log(label(`✓ ${path.basename(file)}  ${(size / 1048576).toFixed(2)} MB`))
  } catch {
    console.log(label(`✗ ${path.basename(file)}  MISSING`))
  }
}

async function poster(src, at, out, width) {
  await ff(['-ss', String(at), '-i', src, '-frames:v', '1', '-vf', `scale=${width}:-2`, '-quality', '80', out])
  await report(out)
}

async function buildHero() {
  console.log('\n▸ Hero loop')
  const src = path.join(SRC, HERO.file)
  const seek = ['-ss', String(HERO.start), '-t', String(HERO.duration), '-i', src]

  // -g 50 puts a keyframe every ~2s so looping back to the start does not
  // stall waiting for one. -movflags +faststart lets playback begin before the
  // whole file has arrived.
  await ff([...seek, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '30',
    '-g', '50', '-vf', 'scale=1280:-2', '-pix_fmt', 'yuv420p', '-profile:v', 'main',
    '-movflags', '+faststart', path.join(OUT, 'hero-loop.mp4')])
  await report(path.join(OUT, 'hero-loop.mp4'))

  // No webm. When the hero was a screen recording VP9 won (260KB vs 350KB);
  // now that it is live-action footage VP9 measured LARGER than x264 (810KB vs
  // 690KB), exactly like the showcase clips. Browsers take the first source
  // they support, so shipping it would hand Chrome and Firefox the bigger file.

  // Poster is taken from the ENCODED loop, not the master. Fast-seeking the
  // master lands on the nearest prior keyframe, which is a different screen —
  // that mismatch shows as a visible jump when the video fades in over the
  // poster. Frame 0 of the output is the only frame guaranteed to match.
  const loop = path.join(OUT, 'hero-loop.mp4')
  await poster(loop, 0, path.join(OUT, 'hero-poster.webp'), 1280)
  await ff(['-i', loop, '-frames:v', '1', '-q:v', '4', path.join(OUT, 'hero-poster.jpg')])
  await report(path.join(OUT, 'hero-poster.jpg'))
}

async function buildDemo() {
  console.log('\n▸ Narrated walkthroughs')
  for (const demo of DEMOS) {
    const src = path.join(SRC, demo.file)
    const out = path.join(OUT, `${demo.id}.mp4`)

    // Scale to 1280 wide first, then crop the bottom 52px. That strip is the
    // Windows taskbar (plus a few pixels of its top edge), and the recorder
    // "created with" watermark into the same corner. Neither belongs on a
    // product demo, and cropping is lossless for the software itself — the
    // app's own status bar sits above the cut.
    //
    // Cropping height only, never width, so no part of the UI is lost. The
    // result is 1280x650; NarratedDemo sets a matching aspect ratio so the
    // frame is never stretched to fit a 16:9 box.
    //
    // Audio deliberately retained — this is narration. AAC 128k because a
    // voice track at 96k on a 1440p downscale picked up noticeable artefacts.
    await ff(['-i', src,
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '26',
      '-vf', 'scale=1280:-2,crop=1280:650:0:0',
      '-pix_fmt', 'yuv420p', '-profile:v', 'main',
      '-c:a', 'aac', '-b:a', '128k', '-ac', '2',
      '-movflags', '+faststart', out])
    await report(out)

    // Poster from the cropped output, so the still matches frame-for-frame
    // and the watermark cannot reappear in the thumbnail.
    await ff(['-ss', String(demo.poster), '-i', out, '-frames:v', '1',
      '-quality', '80', path.join(OUT, `${demo.id}-poster.webp`)])
    await report(path.join(OUT, `${demo.id}-poster.webp`))
  }
}

async function buildStory() {
  console.log('\n▸ Story clips')
  for (const clip of STORY_CLIPS) {
    const src = path.join(SRC, clip.file)
    const out = path.join(OUT, `${clip.id}.mp4`)

    // Silent: these run as ambient loops behind copy, and a second audio track
    // competing with the narrated demo would be hostile.
    await ff(['-i', src, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '30',
      '-g', '50', '-vf', `scale=${clip.width}:-2`, '-pix_fmt', 'yuv420p',
      '-profile:v', 'main', '-movflags', '+faststart', out])
    await report(out)

    await poster(out, 0, path.join(OUT, `${clip.id}-poster.webp`), clip.width)
  }
}

async function buildClips() {
  console.log('\n▸ Showcase clips')
  const files = (await readdir(SRC)).filter((f) => /^clip-\d+\.mp4$/.test(f)).sort()

  for (const file of files) {
    const id = path.basename(file, '.mp4')
    const src = path.join(SRC, file)

    // H.264 only, deliberately. VP9 was measured 1.6-1.9x LARGER than x264 on
    // every one of these live-action clips, and browsers take the first source
    // they support — shipping webm here would send the bigger file to Chrome
    // and Firefox. The hero is now live-action too and dropped its webm for
    // the same reason.
    await ff(['-i', src, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '30',
      '-vf', 'scale=430:-2', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
      path.join(OUT, `${id}.mp4`)])
    await report(path.join(OUT, `${id}.mp4`))

    await poster(src, 3, path.join(OUT, `${id}-poster.webp`), 430)
  }
}

async function buildSections() {
  console.log('\n▸ Section clips')
  for (const clip of SECTION_CLIPS) {
    const src = path.join(SRC, clip.file)
    const seek = ['-ss', String(clip.start), '-t', String(clip.duration), '-i', src]
    const out = path.join(OUT, `${clip.id}.mp4`)

    await ff([...seek, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '31',
      '-g', '50', '-vf', `scale=${clip.width}:-2`, '-pix_fmt', 'yuv420p',
      '-profile:v', 'main', '-movflags', '+faststart', out])
    await report(out)

    // Poster from frame 0 of the ENCODED clip, so the still and the first
    // frame of video are identical and nothing jumps on play.
    await poster(out, 0, path.join(OUT, `${clip.id}-poster.webp`), clip.width)
  }
}

const TASKS = { hero: buildHero, demo: buildDemo, clips: buildClips, sections: buildSections, story: buildStory }

async function main() {
  const which = process.argv[2] ?? 'all'
  await mkdir(OUT, { recursive: true })
  console.log(`ffmpeg: ${ffmpegPath}`)
  console.log(`source: ${SRC}`)
  console.log(`output: ${OUT}`)

  const jobs = which === 'all' ? Object.values(TASKS) : [TASKS[which]]
  if (!jobs[0]) {
    console.error(`Unknown task "${which}". Use: hero | demo | clips | sections | story | all`)
    process.exit(1)
  }
  for (const job of jobs) await job()
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err.stderr || err)
  process.exit(1)
})
