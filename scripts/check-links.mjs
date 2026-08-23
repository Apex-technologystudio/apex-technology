#!/usr/bin/env node
/**
 * Crawls the running site and verifies every link resolves.
 *
 * Internal links are followed and must return 2xx. External http(s) links are
 * checked once each. tel:, mailto: and wa.me links are validated by shape
 * rather than by request — hitting wa.me repeatedly from a build script is
 * rude, and a malformed number is the only failure mode that matters there.
 *
 * Usage: node scripts/check-links.mjs [baseUrl]
 */
const BASE = process.argv[2] ?? 'http://localhost:3210'

const seen = new Set()
const queue = ['/']
const problems = []
const externalChecked = new Map()

/** wa.me needs bare digits with country code — no +, spaces or dashes. */
const WA_RE = /^https:\/\/wa\.me\/(\d{7,15})(\?text=.*)?$/
const TEL_RE = /^tel:\+?\d{7,15}$/
const MAILTO_RE = /^mailto:[^@\s]+@[^@\s]+\.[a-z]{2,}(\?.*)?$/i

function extractLinks(html) {
  return [...html.matchAll(/<a\b[^>]*?href=["']([^"']+)["']/gi)].map((m) => m[1])
}

async function checkExternal(url) {
  if (externalChecked.has(url)) return externalChecked.get(url)
  let ok = true
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' })
    ok = res.status < 400
  } catch {
    ok = false
  }
  externalChecked.set(url, ok)
  return ok
}

while (queue.length) {
  const path = queue.shift()
  if (seen.has(path)) continue
  seen.add(path)

  let res
  try {
    res = await fetch(`${BASE}${path}`)
  } catch (err) {
    problems.push(`${path} — request failed: ${err.message}`)
    continue
  }

  if (!res.ok) {
    problems.push(`${path} — HTTP ${res.status}`)
    continue
  }

  const html = await res.text()

  for (const href of extractLinks(html)) {
    if (href.startsWith('#')) continue

    if (href.startsWith('tel:')) {
      if (!TEL_RE.test(href)) problems.push(`${path} — malformed tel: ${href}`)
      continue
    }
    if (href.startsWith('mailto:')) {
      if (!MAILTO_RE.test(href)) problems.push(`${path} — malformed mailto: ${href}`)
      continue
    }
    if (href.includes('wa.me')) {
      if (!WA_RE.test(href)) problems.push(`${path} — malformed WhatsApp link: ${href.slice(0, 80)}`)
      continue
    }
    if (/^https?:\/\//.test(href)) {
      if (!(await checkExternal(href))) problems.push(`${path} — dead external link: ${href}`)
      continue
    }
    if (href.startsWith('/')) {
      const clean = href.split('#')[0].split('?')[0]
      if (!seen.has(clean)) queue.push(clean)
      continue
    }

    problems.push(`${path} — unrecognised href: ${href}`)
  }
}

console.log(`Crawled ${seen.size} pages:`)
for (const path of [...seen].sort()) console.log(`  ${path}`)
console.log(`\nExternal links checked: ${externalChecked.size}`)

if (problems.length) {
  console.log(`\n${problems.length} problem(s):`)
  for (const problem of problems) console.log(`  ✗ ${problem}`)
  process.exit(1)
}
console.log('\nPASS — every link resolves.')
