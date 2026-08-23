import {
  PharmacyIcon,
  RestaurantIcon,
  StoreIcon,
  SupermarketIcon,
} from '@/components/svg/Icons'

/**
 * Industry landing pages.
 *
 * These exist for search intent: someone looking for "restaurant POS software
 * Pakistan" will not convert on a generic POS page. Each page therefore leads
 * with that trade's actual problem, then maps it to a real Apex POS feature.
 */
export type Industry = {
  slug: string
  name: string
  navLabel: string
  icon: typeof StoreIcon
  /** <title> — carries the keyword the page targets. */
  metaTitle: string
  metaDescription: string
  headline: string
  intro: string
  /** Trade-specific problems, each answered by `solutions[i]`. */
  problems: Array<{ problem: string; solution: string }>
  clip: string
  clipPoster: string
  clipAlt: string
  keywords: string[]
}

export const INDUSTRIES: Industry[] = [
  {
    slug: 'retail',
    name: 'Retail & Kiryana Stores',
    navLabel: 'Retail & Kiryana',
    icon: StoreIcon,
    metaTitle: 'Kiryana & Retail Store POS Software Pakistan — PKR 30,000',
    metaDescription:
      'Billing, stock alerts and udhaar khata for kiryana and general stores. Works offline, one-time PKR 30,000, no monthly fee. Free demo: 0335 7583554',
    headline: 'POS software for kiryana and general stores',
    intro:
      'A general store lives on small margins, long stock lists and customers who pay later. Apex POS keeps all three straight without adding work at the counter.',
    problems: [
      {
        problem: 'The udhaar register never matches what people actually owe.',
        solution:
          'Every credit sale attaches to a customer with a phone number. One screen shows who owes what, since when, and the total outstanding.',
      },
      {
        problem: 'Fast-moving items run out before anyone notices.',
        solution:
          'Set a low-stock threshold and the dashboard counts items below it, so reordering happens before the shelf is empty.',
      },
      {
        problem: 'Daily sales look healthy but the cash never adds up.',
        solution:
          'Rent, salaries and bills are entered once as fixed expenses and subtracted from revenue to show real net profit, not just takings.',
      },
      {
        problem: 'Staff can see what you paid for stock.',
        solution:
          'Worker accounts bill normally while purchase prices, margins and reports stay behind a separate password.',
      },
    ],
    clip: '/media/clip-02.mp4',
    clipPoster: '/media/clip-02-poster.webp',
    clipAlt: 'A shopkeeper scanning a packet at the counter of a Pakistani general store',
    keywords: [
      'kiryana store software',
      'kiryana store software Pakistan',
      'general store billing software Pakistan',
      'grocery store POS Pakistan',
      'POS system for retail shop Pakistan',
      'udhaar khata software',
      'khata software Pakistan',
      'dukan ka software',
      'retail billing software price Pakistan',
    ],
  },
  {
    slug: 'restaurant',
    name: 'Restaurants & Cafes',
    navLabel: 'Restaurants & Cafes',
    icon: RestaurantIcon,
    metaTitle: 'Restaurant POS Software Pakistan — Cafe Billing, PKR 30,000',
    metaDescription:
      'Fast order billing, thermal receipts, split payments and real food-cost profit for restaurants and cafes. Offline, one-time PKR 30,000. Demo: 0335 7583554',
    headline: 'POS software for restaurants and cafes',
    intro:
      'Service moves faster than paperwork. Apex POS keeps billing quick at the counter and still leaves you with numbers worth reading at closing time.',
    problems: [
      {
        problem: 'Orders slow down when billing is fiddly.',
        solution:
          'Search an item, set quantity, add to cart — all from the keyboard. The subtotal and profit update as the order is built.',
      },
      {
        problem: 'One table pays half by card and half in cash.',
        solution:
          'Split a single bill across cash, card, bank transfer, JazzCash or EasyPaisa, and every part is recorded against that sale.',
      },
      {
        problem: 'Food cost is invisible until the month is over.',
        solution:
          'Purchase and selling price per item give you margin on every sale, while fixed monthly costs feed the net profit figure.',
      },
      {
        problem: 'Customers come back to query an old bill.',
        solution:
          'Saved receipts are searchable by date, customer or product, and any bill can be previewed and reprinted.',
      },
    ],
    clip: '/media/clip-06.mp4',
    clipPoster: '/media/clip-06-poster.webp',
    clipAlt: 'A customer being served at a counter',
    keywords: [
      'restaurant POS software Pakistan',
      'restaurant billing software Pakistan',
      'cafe billing software Pakistan',
      'restaurant POS system price Pakistan',
      'fast food POS software Pakistan',
      'bakery POS software Pakistan',
      'hotel billing software Pakistan',
    ],
  },
  {
    slug: 'pharmacy',
    name: 'Pharmacies',
    navLabel: 'Pharmacies',
    icon: PharmacyIcon,
    metaTitle: 'Medical Store & Pharmacy Software Pakistan — PKR 30,000',
    metaDescription:
      'Pharmacy POS for Pakistani medical stores: fast billing across thousands of items, stock alerts and per-item margins. One-time PKR 30,000. Demo: 0335 7583554',
    headline: 'POS software for pharmacies and medical stores',
    intro:
      'A medical store carries thousands of items with thin margins on most of them. Apex POS makes the catalogue searchable and the margins visible.',
    problems: [
      {
        problem: 'Finding one item among thousands takes too long.',
        solution:
          'Scan the barcode or type a few letters of the name — the product, its stock and its price come up immediately.',
      },
      {
        problem: 'Slow-moving stock ties up money quietly.',
        solution:
          'Stock cost and stock worth sit on the dashboard, and reports break sales down by product and category so dead stock shows up.',
      },
      {
        problem: 'Margins differ wildly between items.',
        solution:
          'Purchase and selling price are stored per item, so profit is calculated per line and totalled per sale.',
      },
      {
        problem: 'Records must survive a computer failure.',
        solution:
          'The database backs itself up to a folder you choose every two hours, and restores from a backup file in one click.',
      },
    ],
    clip: '/media/clip-05.mp4',
    clipPoster: '/media/clip-05-poster.webp',
    clipAlt: 'A pharmacy assistant scanning a product with a barcode scanner',
    keywords: [
      'medical store software Pakistan',
      'pharmacy POS software Pakistan',
      'medical store billing software Pakistan',
      'pharmacy software price in Pakistan',
      'chemist shop software Pakistan',
      'pharmacy inventory software Pakistan',
    ],
  },
  {
    slug: 'supermarket',
    name: 'Supermarkets',
    navLabel: 'Supermarkets',
    icon: SupermarketIcon,
    metaTitle: 'Supermarket Billing Software Pakistan — POS from PKR 30,000',
    metaDescription:
      'Supermarket POS for Pakistan: per-kilogram and unit items, fast barcode counters, JazzCash and EasyPaisa totals, net profit. One-time price. Demo: 0335 7583554',
    headline: 'POS software for supermarkets and mini marts',
    intro:
      'High volume punishes small inefficiencies. Apex POS is built to keep a busy counter moving and still close the day with numbers that reconcile.',
    problems: [
      {
        problem: 'Loose goods are sold by weight, not by unit.',
        solution:
          'Products can be set up per kilogram or per unit, so rice, pulses and produce bill correctly alongside packaged items.',
      },
      {
        problem: 'The day’s takings arrive through five different channels.',
        solution:
          'A payments screen totals cash, bank transfer, JazzCash, EasyPaisa and card separately, with every transaction listed and exportable.',
      },
      {
        problem: 'Returns and corrections turn into arguments.',
        solution:
          'Any sale can be opened, its items reviewed, a single line returned or the whole sale removed — with the record kept.',
      },
      {
        problem: 'Nobody agrees on what actually sold this week.',
        solution:
          'Run a report over any date range for revenue, profit, transactions, items sold and average transaction value.',
      },
    ],
    clip: '/media/clip-04.mp4',
    clipPoster: '/media/clip-04-poster.webp',
    clipAlt: 'A business owner reviewing sales and inventory analytics on a desktop computer',
    keywords: [
      'supermarket billing software Pakistan',
      'supermarket POS system Pakistan',
      'mini mart POS software Pakistan',
      'departmental store software Pakistan',
      'grocery billing software Pakistan',
      'weight based billing software Pakistan',
    ],
  },
]

export const industryBySlug = (slug: string) => INDUSTRIES.find((i) => i.slug === slug)
