import type { Metadata } from 'next'
import { site } from './site'

/**
 * SEO copy, centralised.
 *
 * Written for click-through, not just ranking — a page that ranks but does not
 * get clicked produces no leads. Three rules applied to every entry:
 *
 *  1. **Price in the title where intent is commercial.** Pakistani POS buyers
 *     search on price, and competitors who show a figure in the SERP get the
 *     click. It also pre-qualifies: someone who will not spend PKR 30,000 does
 *     not click, which keeps the WhatsApp enquiries worth answering.
 *  2. **The differentiator in the title.** Every competitor found in research
 *     sells a monthly subscription (roughly PKR 1,500-2,000/month). "One-time"
 *     and "no monthly fee" are the words that separate this product, so they
 *     appear where they will be read.
 *  3. **A phone number and a next step in the description.** On mobile SERPs
 *     the description is where a lead decides to act. Local format (0335…) is
 *     what Pakistani users recognise and can dial.
 *
 * Titles target ~60 characters and descriptions ~155, which is roughly where
 * Google truncates. Anything past that is written to be safe to cut.
 */

/** Local dialling format — more familiar in-country than +92 in SERP copy. */
export const PHONE_LOCAL = '0335 7583554'

/**
 * Keyword clusters.
 *
 * Grouped by search intent rather than by page, because intent is what decides
 * which page should target a term. Commercial-intent terms (price, buy, best)
 * belong on pages with a clear next step; informational terms belong in the FAQ.
 */
export const KEYWORDS = {
  /** Highest commercial intent — these are people ready to buy. */
  core: [
    'POS system in Pakistan',
    'POS software Pakistan',
    'POS system price in Pakistan',
    'POS software price in Pakistan',
    'best POS software in Pakistan',
    'best POS system Pakistan',
    'buy POS software Pakistan',
    'POS software with no monthly fee',
    'one-time POS software Pakistan',
    'offline POS software Pakistan',
    'POS software for small business Pakistan',
  ],
  /** How shopkeepers describe their own problem. */
  problem: [
    'billing software Pakistan',
    'inventory management software Pakistan',
    'udhaar management software',
    'khata software Pakistan',
    'dukan ka software',
    'shop management software Pakistan',
    'stock management software Pakistan',
    'profit and expense software Pakistan',
  ],
  /** Trade-specific — the highest-converting long tail. */
  trades: [
    'kiryana store software',
    'general store billing software Pakistan',
    'grocery store POS Pakistan',
    'restaurant POS software Pakistan',
    'cafe billing software Pakistan',
    'pharmacy POS software Pakistan',
    'medical store software Pakistan',
    'supermarket billing software Pakistan',
    'mobile shop software Pakistan',
    'electronics shop POS with IMEI',
    'garments shop software Pakistan',
    'bakery POS software Pakistan',
  ],
  /** Payment-method terms buyers search by name. */
  payments: [
    'JazzCash EasyPaisa POS software',
    'POS software with split payment',
    'thermal receipt printing software Pakistan',
  ],
  gym: [
    'gym management software Pakistan',
    'gym software Pakistan price',
    'gym attendance software',
    'gym member management system Pakistan',
    'fitness centre software Pakistan',
  ],
  services: [
    'web development company Pakistan',
    'website design company Pakistan',
    'mobile app development Pakistan',
    'Android app development Pakistan',
    'custom software development Pakistan',
    'software house in Pakistan',
  ],
} as const

/** Cities appended to keyword sets so city-qualified searches can match. */
export const CITY_KEYWORDS = site.areaServed.flatMap((city) => [
  `POS system in ${city}`,
  `POS software ${city}`,
])

/**
 * Builds a Metadata object with canonical, OpenGraph and Twitter all consistent.
 *
 * Passing the same title/description into all three is deliberate: divergent
 * social and search copy is a common source of a page looking wrong when shared.
 */
export function pageMeta({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string
  description: string
  path: string
  keywords?: readonly string[]
}): Metadata {
  return {
    title,
    description,
    keywords: [...keywords],
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
