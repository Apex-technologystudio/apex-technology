import { VideoFeature } from '@/components/sections/VideoFeature'

/**
 * The two footage-led sections.
 *
 * Every bullet below describes behaviour verified in the product walkthrough
 * (docs/PLAN.md §1). The footage is stock b-roll used thematically, so the copy
 * carries the specifics rather than letting the imagery imply anything.
 */

export function CounterSpeed() {
  return (
    <VideoFeature
      tone="mist"
      eyebrow="At the counter"
      title="Fast enough for a queue on a Saturday"
      description="Billing is the one thing that cannot be slow. Everything on the sales screen is reachable from the keyboard, so a sale takes seconds and the customer behind does not start looking at their watch."
      points={[
        'Scan the barcode, or type a few letters — stock and price come up instantly',
        'Scan → Enter → Qty → Enter → Price → Enter, and the item is in the cart',
        'Subtotal and your profit on the sale both update as you build it',
        'Take one payment or split it across cash, card, bank, JazzCash or EasyPaisa',
        'Print a thermal receipt and the bill is saved for later',
      ]}
      src="/media/counter-clip.mp4"
      poster="/media/counter-clip-poster.webp"
      alt="A shop assistant tapping items on a touchscreen point of sale terminal"
    />
  )
}

export function KnowYourNumbers() {
  return (
    <VideoFeature
      tone="white"
      reverse
      eyebrow="Know your numbers"
      title="Close the day knowing what you actually made"
      description="Takings are not profit. Apex POS keeps purchase price against selling price on every item, subtracts what the shop costs you to run, and shows the figure that is genuinely yours."
      points={[
        'Revenue, profit, transactions and items sold over any date range',
        'Break sales down by product, by category, or day by day',
        'Rent, salaries, electricity and internet entered once as fixed expenses',
        'Net profit for the month after those expenses — not just sales',
        'Export any report to CSV for your accountant',
        'Purchase prices and profit sit behind a separate password from your staff',
      ]}
      src="/media/reports-clip.mp4"
      poster="/media/reports-clip-poster.webp"
      alt="A business owner reviewing sales charts and figures"
      footnote={
        <>
          Apex POS is a Windows application that runs on the shop&apos;s own PC or laptop. The
          reports above are read on that machine — there is no separate tablet or phone app.
        </>
      }
    />
  )
}
