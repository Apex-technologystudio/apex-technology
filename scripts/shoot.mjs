#!/usr/bin/env node
/**
 * Screenshot helper for visual checks during development.
 *
 * Uses puppeteer-core against the installed Chrome, so the viewport is the real
 * CSS layout viewport. (Chrome's `--screenshot` CLI flag does not reliably
 * apply `--window-size` to layout, which silently produces shots at a different
 * width than requested.)
 *
 * Usage:
 *   node scripts/shoot.mjs <route> <out.png> [width] [height] [--full]
 */
import puppeteer from 'puppeteer-core'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = process.env.BASE_URL ?? 'http://localhost:3210'

const [route = '/', out = 'shot.png', width = '1440', height = '1000'] = process.argv.slice(2)
const fullPage = process.argv.includes('--full')

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars'],
})

const page = await browser.newPage()
await page.setViewport({
  width: Number(width),
  height: Number(height),
  deviceScaleFactor: 1,
  isMobile: Number(width) < 768,
  hasTouch: Number(width) < 768,
})

const errors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})
page.on('pageerror', (err) => errors.push(String(err)))

await page.goto(`${BASE}${route}`, { waitUntil: 'load', timeout: 45_000 })

// Let in-view reveal animations settle before capturing.
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await new Promise((r) => setTimeout(r, 700))
await page.evaluate(() => window.scrollTo(0, 0))
await new Promise((r) => setTimeout(r, 400))

await page.screenshot({ path: out, fullPage })
await browser.close()

console.log(`saved ${out} @ ${width}x${height}${fullPage ? ' (full page)' : ''}`)
if (errors.length) {
  console.log(`\n${errors.length} console error(s):`)
  for (const e of errors.slice(0, 10)) console.log(`  ✗ ${e}`)
} else {
  console.log('no console errors')
}
