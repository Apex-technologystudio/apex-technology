#!/usr/bin/env node
/**
 * Horizontal-overflow audit.
 *
 * A page must never scroll sideways. This loads each route at a narrow mobile
 * width and reports every element wider than the viewport, so the actual
 * offender is named instead of guessed at.
 *
 * Usage: node scripts/audit-layout.mjs [baseUrl] [width]
 */
import puppeteer from 'puppeteer-core'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = process.argv[2] ?? 'http://localhost:3210'
const WIDTH = Number(process.argv[3] ?? 390)

const ROUTES = process.env.ROUTES?.split(',') ?? ['/']

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars'],
})

let failures = 0

for (const route of ROUTES) {
  const page = await browser.newPage()
  await page.setViewport({ width: WIDTH, height: 844, deviceScaleFactor: 1 })
  await page.goto(`${BASE}${route}`, { waitUntil: 'load', timeout: 45_000 })

  const result = await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth
    const offenders = []

    for (const el of document.querySelectorAll('body *')) {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) continue
      // Only flag what actually extends past the viewport edge.
      if (rect.right > docWidth + 1 || rect.left < -1) {
        const style = getComputedStyle(el)
        // Elements clipped by an ancestor are not real overflow.
        let clipped = false
        for (let p = el.parentElement; p; p = p.parentElement) {
          const ov = getComputedStyle(p).overflowX
          if (ov === 'hidden' || ov === 'clip' || ov === 'auto' || ov === 'scroll') {
            clipped = true
            break
          }
        }
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.getAttribute('class') ?? '').slice(0, 90),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          position: style.position,
          clipped,
        })
      }
    }

    return {
      docWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      offenders: offenders.slice(0, 25),
    }
  })

  const scrolls = result.scrollWidth > result.docWidth + 1
  if (scrolls) failures++

  console.log(`\n${route}  viewport=${result.docWidth}  scrollWidth=${result.scrollWidth}  ${scrolls ? '✗ SCROLLS' : '✓ ok'}`)
  for (const o of result.offenders) {
    console.log(
      `   ${o.clipped ? '·' : '!'} <${o.tag}> ${o.left}..${o.right} (w=${o.width}) [${o.position}] ${o.cls}`,
    )
  }
  await page.close()
}

await browser.close()
console.log(`\n${failures === 0 ? 'PASS' : `FAIL (${failures} route(s) scroll horizontally)`}`)
process.exit(failures === 0 ? 0 : 1)
