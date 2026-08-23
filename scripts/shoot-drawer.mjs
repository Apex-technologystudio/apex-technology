#!/usr/bin/env node
/**
 * Opens the floating enquiry drawer and captures it, then exercises the form.
 *
 * Verifies the parts a static screenshot cannot: that the trigger opens the
 * dialog, that validation fires, that submitting composes the right wa.me link,
 * and that Escape closes it and returns focus to the trigger.
 *
 * Usage: node scripts/shoot-drawer.mjs <out.png> [width] [height]
 */
import puppeteer from 'puppeteer-core'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = process.env.BASE_URL ?? 'http://localhost:3400'
const [out = 'drawer.png', width = '1440', height = '1000'] = process.argv.slice(2)

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars'],
})
const page = await browser.newPage()
await page.setViewport({
  width: Number(width),
  height: Number(height),
  isMobile: Number(width) < 768,
  hasTouch: Number(width) < 768,
})

const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

await page.goto(BASE, { waitUntil: 'load' })
// Let the preloader finish so it is not covering the trigger.
await new Promise((r) => setTimeout(r, 2200))

await page.evaluate(() => {
  window.__opened = null
  window.open = (u) => {
    window.__opened = u
    return null
  }
})

await page.click('button[aria-haspopup="dialog"]')
await new Promise((r) => setTimeout(r, 700))

const dialogVisible = await page.$eval('[role="dialog"]', (n) => !n.hidden).catch(() => false)
console.log('dialog opened:', dialogVisible)

await page.screenshot({ path: out })
console.log('saved', out)

// --- validation
await page.click('[role="dialog"] button[type="submit"]')
await new Promise((r) => setTimeout(r, 500))
const errs = await page.$$eval('[role="dialog"] p.text-red-600', (ns) => ns.map((n) => n.textContent))
console.log('validation errors:', errs.length ? errs : 'NONE (unexpected)')

// --- happy path
await page.type('#cd-name', 'Bilal Ahmed')
await page.type('#cd-business', 'Bilal Mobile Centre')
await page.type('#cd-phone', '0321 4567890')
await page.type('#cd-location', 'Faisalabad')
await page.select('#cd-need', 'Full POS with udhaar and reports')
await page.select('#cd-budget', 'PKR 50,000 – 80,000')
await page.click('[role="dialog"] button[type="submit"]')
await new Promise((r) => setTimeout(r, 700))

const opened = await page.evaluate(() => window.__opened)
if (opened) {
  const u = new URL(opened)
  console.log('\nwa.me number:', u.pathname.slice(1))
  console.log('message:')
  console.log(
    decodeURIComponent(u.searchParams.get('text'))
      .split('\n')
      .map((l) => '    ' + l)
      .join('\n'),
  )
} else {
  console.log('\n✗ no wa.me link produced')
}

// --- escape closes and restores focus to the trigger
await page.keyboard.press('Escape')
// The panel is kept mounted so it can animate out, so "closed" means inert
// and translated off-screen — not `hidden`.
await new Promise((r) => setTimeout(r, 600))
const closed = await page
  .$eval('[role="dialog"]', (n) => n.hasAttribute('inert'))
  .catch(() => null)
const offscreen = await page
  .$eval('[role="dialog"] > div', (n) => getComputedStyle(n).translate !== '0px')
  .catch(() => null)
const refocused = await page.evaluate(
  () => document.activeElement?.getAttribute('aria-haspopup') === 'dialog',
)
console.log(
  '\nescape → inert:', closed,
  '| translated off-screen:', offscreen,
  '| focus returned:', refocused,
)

console.log(errors.length ? `\n${errors.length} console error(s): ${errors[0]}` : '\nno console errors')
await browser.close()
