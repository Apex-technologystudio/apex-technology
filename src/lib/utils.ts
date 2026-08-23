import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge has no view of our `@theme`, so it classifies the custom type
 * scale (`text-display`, `text-h1`…) as *text colour* — the same group as
 * `text-white`. `cn('text-h2', 'text-white')` therefore silently returned just
 * `text-white`, stripping the size from every heading that passed through cn().
 *
 * Registering them under `font-size` puts each in the right conflict group, so
 * a size and a colour can coexist. Any new `--text-*` token added to
 * globals.css must be listed here too.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-display', 'text-h1', 'text-h2', 'text-h3'],
    },
  },
})

/** Merge conditional classes, letting later Tailwind utilities win conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a PKR amount the way Pakistani buyers read it.
 *
 * `en-PK` groups by the lakh/crore system (2,50,000 not 250,000), which is what
 * a shopkeeper here expects to see on a price. Rendered as "PKR 30,000" rather
 * than the "Rs" symbol to stay consistent with the app's own receipts.
 */
export function formatPKR(amount: number): string {
  return `PKR ${new Intl.NumberFormat('en-PK').format(amount)}`
}
