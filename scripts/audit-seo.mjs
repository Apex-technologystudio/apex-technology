#!/usr/bin/env node
/**
 * SEO metadata audit.
 *
 * Reports the title, description and canonical of every route, and flags
 * anything Google would truncate. Truncated copy is wasted copy: if the phone
 * number or the price falls off the end of a description, the lead never sees
 * the reason to click.
 *
 * Limits are approximate — Google measures pixels, not characters — so these
 * are treated as warnings, not build failures.
 *
 * Usage: node scripts/audit-seo.mjs [baseUrl]
 */
const BASE = process.argv[2] ?? 'http://localhost:3400'

const TITLE_MAX = 60
const DESC_MIN = 120
const DESC_MAX = 160

const ROUTES = [
  '/',
  '/pos-system',
  '/pricing',
  '/gym-management',
  '/industries',
  '/services',
  '/services/web-development',
  '/services/mobile-app-development',
  '/services/custom-software',
  '/industries/retail',
  '/industries/restaurant',
  '/industries/pharmacy',
  '/industries/supermarket',
  '/blog',
  '/blog/pos-system-price-in-pakistan',
  '/blog/offline-vs-cloud-pos-pakistan',
  '/blog/udhaar-management-for-shops',
  '/blog/kiryana-store-pos-checklist',
  '/blog/pos-hardware-for-a-small-shop',
  '/blog/one-time-vs-monthly-pos-cost',
  '/blog/website-on-a-low-budget-pakistan',
  '/compare/one-time-vs-monthly-pos-cost',
  '/compare/offline-vs-cloud-pos',
  '/pos-system/lahore',
  '/pos-system/karachi',
  '/pos-system/islamabad-rawalpindi',
  '/pos-system/faisalabad',
  '/pos-system/multan',
  '/pos-system/peshawar',
  '/about',
  '/contact',
]

const pick = (html, re) => html.match(re)?.[1]?.trim().replace(/&amp;/g, '&') ?? null

let warnings = 0
const seenTitles = new Map()
const seenDescs = new Map()

for (const route of ROUTES) {
  const html = await (await fetch(`${BASE}${route}`)).text()

  const title = pick(html, /<title>([^<]*)<\/title>/)
  const desc = pick(html, /<meta name="description" content="([^"]*)"/)
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/)
  const ogTitle = pick(html, /<meta property="og:title" content="([^"]*)"/)
  const keywords = pick(html, /<meta name="keywords" content="([^"]*)"/)

  const flags = []
  if (!title) flags.push('NO TITLE')
  else if (title.length > TITLE_MAX) flags.push(`title ${title.length}>${TITLE_MAX}`)
  if (!desc) flags.push('NO DESCRIPTION')
  else if (desc.length > DESC_MAX) flags.push(`desc ${desc.length}>${DESC_MAX}`)
  else if (desc.length < DESC_MIN) flags.push(`desc ${desc.length}<${DESC_MIN} (short)`)
  if (!canonical) flags.push('NO CANONICAL')
  if (!ogTitle) flags.push('NO OG:TITLE')

  // Duplicate titles/descriptions split ranking signal between pages.
  if (title) {
    if (seenTitles.has(title)) flags.push(`DUPLICATE title with ${seenTitles.get(title)}`)
    else seenTitles.set(title, route)
  }
  if (desc) {
    if (seenDescs.has(desc)) flags.push(`DUPLICATE desc with ${seenDescs.get(desc)}`)
    else seenDescs.set(desc, route)
  }

  if (flags.length) warnings += flags.length

  console.log(`\n${flags.length ? '⚠' : '✓'} ${route}`)
  console.log(`   title (${title?.length ?? 0})  ${title}`)
  console.log(`   desc  (${desc?.length ?? 0})  ${desc}`)
  console.log(`   kw            ${keywords ? keywords.split(',').length + ' terms' : 'none'}`)
  if (flags.length) console.log(`   ⚠ ${flags.join(' · ')}`)
}

console.log(`\n${warnings === 0 ? 'PASS — no metadata warnings.' : `${warnings} warning(s).`}`)
