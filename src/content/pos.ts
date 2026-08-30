import {
  BackupIcon,
  BarcodeIcon,
  InventoryIcon,
  OfflineIcon,
  ProfitIcon,
  ReceiptIcon,
  RolesIcon,
  SplitPaymentIcon,
  UdhaarIcon,
  GearIcon,
  StoreIcon,
  SupermarketIcon,
  MobileIcon,
  PharmacyIcon,
  RestaurantIcon,
  CodeIcon,
} from '@/components/svg/Icons'

/**
 * Apex POS content.
 *
 * Two rules govern everything in this file:
 *
 * 1. **Only verified capabilities.** Every claim describes behaviour observed in
 *    the product walkthrough (docs/PLAN.md §1). A POS buyer tests these during
 *    the demo, so a wrong claim costs the sale.
 * 2. **Written for a shopkeeper, not a CMO.** Short sentences, familiar words,
 *    plain business terms. The reader is comfortable in basic to intermediate
 *    English and is reading on a phone.
 *
 * Feature headings state the BENEFIT, not the module name — "Know your stock at
 * a glance", not "Inventory Management". The module name means nothing to
 * someone deciding whether this helps their shop.
 */
export type Feature = {
  icon: typeof BarcodeIcon
  title: string
  description: string
}

export const POS_FEATURES: Feature[] = [
  {
    icon: BarcodeIcon,
    title: 'Bill customers in seconds',
    description:
      'Scan the barcode or type a few letters. The item, price and stock come up straight away, so the queue keeps moving.',
  },
  {
    icon: InventoryIcon,
    title: 'Know your stock at a glance',
    description:
      'See what you have, what is running low and what is finished — without checking shelves or keeping notebooks.',
  },
  {
    icon: UdhaarIcon,
    title: 'Never lose track of udhaar',
    description:
      'Every customer balance in one list: who owes you, how much, and since when. Mark it paid when they settle.',
  },
  {
    icon: ProfitIcon,
    title: 'See your real profit, not just sales',
    description:
      'Rent, salaries and bills are entered once. Apex subtracts them, so the profit you see is money you actually keep.',
  },
  {
    icon: SplitPaymentIcon,
    title: 'Take payment any way customers pay',
    description:
      'Cash, JazzCash, EasyPaisa, bank transfer or card. One sale can even be split across two methods.',
  },
  {
    icon: ReceiptIcon,
    title: 'Print receipts and keep every bill',
    description:
      'Print on a thermal printer and save a copy. Find any old bill later by date, customer or product.',
  },
  {
    icon: RolesIcon,
    title: 'Staff can bill without seeing your margins',
    description:
      'Workers get their own login. Your purchase prices, profit and reports stay behind a separate password.',
  },
  {
    icon: BackupIcon,
    title: 'Your data is saved automatically',
    description:
      'Apex copies your records to a folder you choose every two hours. If the computer fails, you restore in one click.',
  },
  {
    icon: OfflineIcon,
    title: 'Works with no internet',
    description:
      'Apex runs on your own computer. Load-shedding and connection problems do not stop you from serving customers.',
  },
]

/**
 * The problem section.
 *
 * Deliberately describes the shop's day, not the software. A visitor who
 * recognises their own situation here reads the rest of the page differently.
 */
export const SHOP_PROBLEMS = [
  {
    problem: 'Billing by hand takes too long',
    detail: 'Writing every item slows the counter down when the shop is busy.',
  },
  {
    problem: 'Stock records are hard to keep',
    detail: 'Registers go out of date, and you find out an item finished when a customer asks for it.',
  },
  {
    problem: 'Udhaar is difficult to track',
    detail: 'You remember the big names, but the total is hard to know and old balances get forgotten.',
  },
  {
    problem: 'You cannot see your daily profit',
    detail: 'Sales are easy to count. What you actually earned after rent, salaries and bills is not.',
  },
  {
    problem: 'Small staff mistakes cost money',
    detail: 'A wrong price or a missed entry is hard to find later when nothing is recorded properly.',
  },
  {
    problem: 'Online systems stop when internet stops',
    detail: 'If the software needs a connection, a dead router means you cannot bill at all.',
  },
] as const

/**
 * Why the product suits this market specifically.
 *
 * Each point is a real local condition matched to a real capability — not
 * "we understand Pakistan", which any vendor can type.
 */
export const BUILT_FOR_PAKISTAN = [
  {
    icon: OfflineIcon,
    title: 'Built to work offline',
    description:
      'Load-shedding and weak internet are normal here. Apex runs on your own computer, so billing never stops.',
  },
  {
    icon: UdhaarIcon,
    title: 'Udhaar is a proper feature',
    description:
      'Most shops here sell on credit. Apex treats customer balances as a main screen, not something added on later.',
  },
  {
    icon: SplitPaymentIcon,
    title: 'JazzCash and EasyPaisa included',
    description:
      'Record payments the way your customers actually pay, and see how much came in by each method.',
  },
  {
    icon: InventoryIcon,
    title: 'Sell by kilo or by piece',
    description:
      'Rice, pulses and sugar are sold by weight. Apex handles per-kilogram items next to packaged goods.',
  },
  {
    icon: ReceiptIcon,
    title: 'Thermal receipt printing',
    description:
      'Works with the same thermal printers already used in shops across Pakistan.',
  },
  {
    icon: GearIcon,
    title: 'Support in Urdu',
    description:
      'The software is in English, but our training and support are in Urdu — on WhatsApp, when you need it.',
  },
] as const

/**
 * Business types.
 *
 * Everything listed is supported by capabilities we verified: per-unit and
 * per-kilogram items, IMEI tracking, categories, barcode or name search. Types
 * with a dedicated page link to it; the rest link to the product page rather
 * than to thin pages created only to have a link.
 */
export const BUSINESS_TYPES = [
  { icon: StoreIcon, name: 'General stores', note: 'Kiryana shops with long stock lists and udhaar customers.', href: '/industries/retail' },
  { icon: SupermarketIcon, name: 'Super stores', note: 'Busy counters, per-kilo items and several payment methods.', href: '/industries/supermarket' },
  { icon: MobileIcon, name: 'Mobile shops', note: 'IMEI recorded per handset, so every unit is traceable.', href: '/pos-system' },
  { icon: PharmacyIcon, name: 'Pharmacies', note: 'Thousands of items, found by typing a few letters.', href: '/industries/pharmacy' },
  { icon: RestaurantIcon, name: 'Restaurants & cafes', note: 'Quick order billing and split payments at the table.', href: '/industries/restaurant' },
  { icon: InventoryIcon, name: 'Garments', note: 'Stock by category, so you can see what sold this season.', href: '/pos-system' },
  { icon: ReceiptIcon, name: 'Bakeries', note: 'Items sold by weight or by piece, billed the same way.', href: '/pos-system' },
  { icon: GearIcon, name: 'Hardware stores', note: 'Long catalogues searched by name instead of barcode.', href: '/pos-system' },
  { icon: CodeIcon, name: 'Electronics & cosmetics', note: 'Serial numbers, purchase price and profit tracked per item.', href: '/pos-system' },
] as const

/** The dashboard figures the software shows at a glance. */
export const DASHBOARD_METRICS = [
  'Today’s sales and revenue',
  'Stock cost and stock worth',
  'Low stock and finished items',
  'Sales for the last 7 days',
  'How much came in by each payment method',
  'Today’s profit and this month’s profit',
] as const

/** The four steps of a sale, used by the flow diagram. */
export const POS_FLOW = [
  { step: '01', title: 'Scan', description: 'Scan the barcode or type the name. Price and stock appear.' },
  { step: '02', title: 'Bill', description: 'Add to cart and take payment — cash, wallet, bank or card.' },
  { step: '03', title: 'Print', description: 'Print the receipt. A copy is saved for your records.' },
  { step: '04', title: 'Saved', description: 'Stock, profit and expenses update, and your data backs up.' },
] as const

export const WHY_APEX = [
  { icon: OfflineIcon, title: 'Works offline', description: 'Runs on your PC. Keeps billing during load-shedding.' },
  { icon: GearIcon, title: 'Pay once', description: 'From PKR 30,000 one time. No monthly fee, ever.' },
  { icon: BackupIcon, title: 'Your data stays yours', description: 'Everything is stored on your own computer.' },
] as const
