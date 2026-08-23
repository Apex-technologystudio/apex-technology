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
} from '@/components/svg/Icons'

/**
 * Apex POS feature copy.
 *
 * Every entry here describes behaviour observed in the product walkthrough
 * (see docs/PLAN.md §1). Nothing is aspirational — if a capability could not be
 * confirmed on screen it is not claimed, because a POS buyer will test these
 * during the demo and a wrong claim costs the sale.
 */
export type Feature = {
  icon: typeof BarcodeIcon
  title: string
  description: string
}

export const POS_FEATURES: Feature[] = [
  {
    icon: BarcodeIcon,
    title: 'Fast barcode billing',
    description:
      'Scan or search, set quantity, and the item is in the cart. The running subtotal and your profit on that sale both stay visible while you bill.',
  },
  {
    icon: InventoryIcon,
    title: 'Inventory that matches reality',
    description:
      'Track items by unit or by kilogram, with purchase price, selling price and profit per item. Low-stock and out-of-stock counts sit on the dashboard.',
  },
  {
    icon: UdhaarIcon,
    title: 'Udhaar without the register',
    description:
      'Every customer balance in one list — who owes what, since when, and the total outstanding. Mark as paid when they settle.',
  },
  {
    icon: ProfitIcon,
    title: 'Your real profit, not just sales',
    description:
      'Rent, salaries, electricity and internet are entered once as fixed expenses, then subtracted automatically to show true net profit for the month.',
  },
  {
    icon: SplitPaymentIcon,
    title: 'Cash, JazzCash, EasyPaisa, bank, card',
    description:
      'Take one payment or split a single sale across several methods. Every transaction is logged with its reference so the day reconciles.',
  },
  {
    icon: ReceiptIcon,
    title: 'Thermal receipts, saved',
    description:
      'Print to a thermal printer and keep every bill. Search saved receipts by date, customer or product, reprint any of them, or export to CSV.',
  },
  {
    icon: RolesIcon,
    title: 'Staff see sales, not margins',
    description:
      'Worker accounts run the counter while purchase prices, profit and financial reports stay behind a separate password only you have.',
  },
  {
    icon: BackupIcon,
    title: 'Backs itself up',
    description:
      'The database is copied to a folder you choose, automatically, every two hours. Restoring from a backup file takes one click.',
  },
  {
    icon: OfflineIcon,
    title: 'No internet, no problem',
    description:
      'Apex POS is installed on your own computer, not rented from a website. Load-shedding and dead connections do not stop you from billing.',
  },
]

/** The dashboard figures the software surfaces at a glance. */
export const DASHBOARD_METRICS = [
  'Today’s sales and revenue',
  'Stock cost vs stock worth',
  'Low stock and out of stock counts',
  'Revenue over the last 7 days',
  'Sales split by payment method',
  'Today’s, expected and weekly profit',
] as const

/** The four steps a sale actually passes through, used by the flow diagram. */
export const POS_FLOW = [
  {
    step: '01',
    title: 'Scan',
    description: 'Scan the barcode or type the name. Stock and price come up instantly.',
  },
  {
    step: '02',
    title: 'Bill',
    description: 'Add to cart, take cash or a wallet payment, split it if needed.',
  },
  {
    step: '03',
    title: 'Print',
    description: 'Thermal receipt for the customer, saved copy for your records.',
  },
  {
    step: '04',
    title: 'Backed up',
    description: 'Stock, profit and expenses update, and the database copies itself.',
  },
] as const

export const WHY_APEX = [
  {
    icon: OfflineIcon,
    title: 'Works offline',
    description: 'Installed on your PC. Bills through load-shedding and dead internet.',
  },
  {
    icon: GearIcon,
    title: 'One-time price',
    description: 'Pay once from PKR 30,000. No monthly rent for your own till.',
  },
  {
    icon: BackupIcon,
    title: 'Your data stays yours',
    description: 'The database sits on your machine and backs up to your folder.',
  },
] as const
