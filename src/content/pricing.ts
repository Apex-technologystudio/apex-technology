/**
 * Apex POS packages.
 *
 * DRAFT PACKAGING — the PKR 30,000-80,000 band is confirmed by the client, but
 * which features sit in which tier is a commercial decision they still need to
 * sign off (see docs/PLAN.md §13). The feature strings themselves are all
 * verified capabilities; only their distribution across tiers is provisional.
 */

export type Tier = {
  id: string
  name: string
  price: number
  tagline: string
  bestFor: string
  featured?: boolean
  includes: string[]
  /** Shown struck through / as context, not charged. */
  note?: string
}

export const SUPPORT_FEE = 8_000

export const TIERS: Tier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 30_000,
    tagline: 'For a single counter',
    bestFor: 'Kiryana stores, mobile shops and small retail counters',
    includes: [
      'Barcode and search billing',
      'Inventory with purchase and selling price',
      'Thermal receipt printing and saved bills',
      'Dashboard with daily sales and stock value',
      'Cash and single-method payments',
      'Automatic local backup every 2 hours',
      'Remote installation and one training session',
      'First year of support included',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    price: 55_000,
    tagline: 'For shops that run on credit',
    bestFor: 'Established retail, pharmacies, restaurants and mini marts',
    featured: true,
    includes: [
      'Everything in Starter',
      'Udhaar ledger with outstanding balances',
      'Fixed expenses and true net profit',
      'Full reports — by product, category and day',
      'JazzCash, EasyPaisa, bank transfer and card',
      'Split a sale across multiple payment methods',
      'Worker accounts with password-locked financials',
      'CSV export for sales, stock and receipts',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 80_000,
    tagline: 'For high-volume floors',
    bestFor: 'Supermarkets, electronics retailers and multi-counter shops',
    includes: [
      'Everything in Business',
      'Per-kilogram products alongside unit items',
      'IMEI tracking for mobile and electronics',
      'Receipt branded with your shop name',
      'Migration of your existing product and stock data',
      'On-site installation and staff training',
      'Priority same-day support',
    ],
  },
]

export const PRICE_RANGE = {
  low: Math.min(...TIERS.map((t) => t.price)),
  high: Math.max(...TIERS.map((t) => t.price)),
}

export const PRICING_NOTES = [
  'One-time licence — you own it, there is no monthly fee.',
  'The first year of support and updates is included with every package.',
  `After year one, support and updates are optional at PKR ${SUPPORT_FEE.toLocaleString('en-PK')} per year.`,
  'Prices are for one shop. Ask us about rates for additional branches.',
] as const
