/**
 * City landing pages.
 *
 * DOORWAY-PAGE WARNING. A set of near-identical pages differing only by a
 * find-and-replace on the city name is exactly what Google classifies as
 * doorway pages, and it is penalised — it would cost ranking rather than earn
 * it. Every entry below therefore carries genuinely city-specific substance:
 * the actual commercial districts, the retail mix that dominates there, and a
 * note about what that mix means for the software.
 *
 * If a city cannot be written about specifically, it does not get a page. Six
 * real pages are worth more than ten thin ones. `areaServed` in the
 * Organization schema still covers the rest of the country.
 */
export type City = {
  slug: string
  name: string
  /** For "serving X and surrounding areas" copy. */
  region: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  headline: string
  intro: string
  /** Real commercial districts. Specific enough to be useful, not decorative. */
  areas: string[]
  /** What that city's retail actually looks like, and why it matters here. */
  trades: Array<{ trade: string; note: string }>
  /** One genuinely local observation — the part that makes the page not a template. */
  localNote: string
}

export const CITIES: City[] = [
  {
    slug: 'lahore',
    name: 'Lahore',
    region: 'Punjab',
    metaTitle: 'POS System in Lahore — Offline Billing Software, PKR 30,000',
    metaDescription:
      'POS software for shops in Lahore: Anarkali, Liberty, Hall Road, Shah Alam. Offline billing, inventory and udhaar. One-time PKR 30,000. Demo: 0335 7583554',
    keywords: [
      'POS system in Lahore',
      'POS software Lahore',
      'billing software Lahore',
      'kiryana store software Lahore',
    ],
    headline: 'POS software for shops in Lahore',
    intro:
      'Lahore runs on a mix of old bazaar trade and new suburban retail, and the two need different things from the same software. We install and support Apex POS across the city.',
    areas: [
      'Anarkali and Shah Alam Market',
      'Hall Road and Beadon Road',
      'Liberty Market and Main Boulevard Gulberg',
      'Johar Town, Wapda Town and Township',
      'DHA and Cantt',
      'Model Town and Faisal Town',
    ],
    trades: [
      {
        trade: 'Electronics and mobile shops on Hall Road',
        note: 'IMEI tracking per handset matters here more than anywhere else in the city — it is how a shop proves which unit it sold and to whom.',
      },
      {
        trade: 'Wholesale in Shah Alam Market',
        note: 'High line counts per bill and long-standing credit relationships, so fast billing and a proper udhaar ledger do the heavy lifting.',
      },
      {
        trade: 'Kiryana across Johar Town, Township and Wapda Town',
        note: 'Per-kilogram items alongside packaged goods, and regular customers who settle weekly or monthly.',
      },
      {
        trade: 'Restaurants and cafes around Gulberg and DHA',
        note: 'Split payments are routine — one table paying part card, part cash, part wallet.',
      },
    ],
    localNote:
      'Lahore has the widest spread we see between shops that already use a computer and shops moving straight from a paper khata. Both are fine — the second group usually needs a longer first training session, and we plan for that rather than rushing it.',
  },
  {
    slug: 'karachi',
    name: 'Karachi',
    region: 'Sindh',
    metaTitle: 'POS System in Karachi — Offline Retail Billing Software',
    metaDescription:
      'POS software for Karachi shops: Saddar, Tariq Road, Jodia Bazar, Gulshan, DHA. Offline billing, inventory, udhaar. One-time PKR 30,000. Demo: 0335 7583554',
    keywords: [
      'POS system in Karachi',
      'POS software Karachi',
      'billing software Karachi',
      'supermarket software Karachi',
    ],
    headline: 'POS software for shops in Karachi',
    intro:
      'Karachi has the country’s densest retail and its longest queues. Counter speed is not a nice-to-have here — it is the whole job.',
    areas: [
      'Saddar and Empress Market',
      'Tariq Road and Bahadurabad',
      'Jodia Bazar and Bolton Market',
      'Gulshan-e-Iqbal and Gulistan-e-Johar',
      'DHA and Clifton',
      'North Nazimabad and Nazimabad',
    ],
    trades: [
      {
        trade: 'Supermarkets and mini marts in Gulshan and North Nazimabad',
        note: 'Multiple counters and high basket counts, with loose goods sold by weight beside packaged stock.',
      },
      {
        trade: 'Wholesale in Jodia Bazar',
        note: 'Margins are thin and volumes large, so per-item purchase-versus-selling price is what tells you whether a line is worth carrying.',
      },
      {
        trade: 'Pharmacies and medical stores citywide',
        note: 'Thousands of SKUs where finding one item quickly decides the queue length.',
      },
      {
        trade: 'Garment and fabric retail on Tariq Road',
        note: 'Seasonal stock that must be reviewed by category, so dead lines show up before the season ends.',
      },
    ],
    localNote:
      'Karachi shops ask about power more than any other city. Apex POS runs on a laptop, so a battery carries the counter through an outage — no UPS needed for the software itself, though your printer will still want one.',
  },
  {
    slug: 'islamabad-rawalpindi',
    name: 'Islamabad & Rawalpindi',
    region: 'the twin cities',
    metaTitle: 'POS System in Islamabad & Rawalpindi — Billing Software',
    metaDescription:
      'POS software for the twin cities: Blue Area, F-10, Raja Bazar, Saddar. Offline billing, inventory and udhaar. One-time PKR 30,000. Demo: 0335 7583554',
    keywords: [
      'POS system in Islamabad',
      'POS software Rawalpindi',
      'billing software Islamabad',
      'restaurant POS Islamabad',
    ],
    headline: 'POS software for the twin cities',
    intro:
      'Islamabad and Rawalpindi are one market with two very different halves — planned sector retail on one side, dense traditional bazaar on the other. We work across both.',
    areas: [
      'Blue Area and Jinnah Avenue',
      'F-10, F-11 and G-11 markaz',
      'Raja Bazar and Moti Bazar, Rawalpindi',
      'Saddar and Bank Road, Rawalpindi',
      'Bahria Town and DHA Islamabad',
      'Satellite Town and Chandni Chowk',
    ],
    trades: [
      {
        trade: 'Cafes and restaurants across the Islamabad sectors',
        note: 'Card payment is more common here than in most of the country, so a payments breakdown that separates card from cash actually gets read.',
      },
      {
        trade: 'Traditional retail in Raja Bazar',
        note: 'Long credit relationships and negotiated prices — an udhaar ledger with a running total is the feature that pays for itself.',
      },
      {
        trade: 'Pharmacies and general stores in the markaz areas',
        note: 'Steady repeat customers, so low-stock thresholds keep regulars from finding an empty shelf.',
      },
      {
        trade: 'Mobile and computer shops in Saddar',
        note: 'IMEI and serial tracking, plus warranty questions that need an old receipt found quickly.',
      },
    ],
    localNote:
      'Twin-cities shops more often already have a PC at the counter, which usually means installation is a same-day job — we can set the software up, import your product list and train staff without the shop closing.',
  },
  {
    slug: 'faisalabad',
    name: 'Faisalabad',
    region: 'Punjab',
    metaTitle: 'POS System in Faisalabad — Shop & Cloth Market Billing',
    metaDescription:
      'POS software for Faisalabad: the eight bazaars, cloth market and suburban retail. Offline billing, inventory and udhaar. One-time PKR 30,000. Call 0335 7583554',
    keywords: [
      'POS system in Faisalabad',
      'POS software Faisalabad',
      'cloth shop software Pakistan',
      'billing software Faisalabad',
    ],
    headline: 'POS software for shops in Faisalabad',
    intro:
      'Faisalabad trade is shaped by textiles, and textile retail has its own habits — bulk buyers, negotiated rates and credit that runs on trust.',
    areas: [
      'The eight bazaars around Ghanta Ghar',
      'Rail Bazar and Katchery Bazar',
      'Susan Road and Kohinoor City',
      'Peoples Colony and Madina Town',
      'Jaranwala Road',
    ],
    trades: [
      {
        trade: 'Cloth and textile retail around the clock tower bazaars',
        note: 'Bulk buyers who pay across several visits, which is exactly what a customer balance with an age on it is for.',
      },
      {
        trade: 'Wholesale supply to smaller towns nearby',
        note: 'Large bills with many lines, so keyboard billing beats anything mouse-driven.',
      },
      {
        trade: 'Kiryana and general stores in Madina Town and Peoples Colony',
        note: 'Weight-based staples alongside packaged goods, and weekly settling customers.',
      },
      {
        trade: 'Hardware and industrial supply',
        note: 'Long catalogues where searching by a few letters of the name is faster than any barcode.',
      },
    ],
    localNote:
      'A common Faisalabad question is whether one licence covers a shop and its adjoining godown. It does, if they run on the same machine — separate counters need separate licences, and we would rather say that up front than at invoice time.',
  },
  {
    slug: 'multan',
    name: 'Multan',
    region: 'south Punjab',
    metaTitle: 'POS System in Multan — Retail & Pharmacy Billing Software',
    metaDescription:
      'POS software for Multan shops: Hussain Agahi, Cantt, Bosan Road. Offline billing, inventory and udhaar management. One-time PKR 30,000. Call 0335 7583554',
    keywords: [
      'POS system in Multan',
      'POS software Multan',
      'billing software Multan',
      'medical store software Multan',
    ],
    headline: 'POS software for shops in Multan',
    intro:
      'Multan serves both its own retail and a wide surrounding agricultural belt, which makes seasonal cash flow and customer credit central to how shops here operate.',
    areas: [
      'Hussain Agahi and Chowk Bazar',
      'Multan Cantt and Abdali Road',
      'Bosan Road and Gulgasht Colony',
      'Shah Rukn-e-Alam Colony',
      'Vehari Road',
    ],
    trades: [
      {
        trade: 'General stores serving surrounding rural customers',
        note: 'Credit that follows the harvest cycle — balances sit longer here, which makes the age of each one worth watching.',
      },
      {
        trade: 'Pharmacies and medical stores',
        note: 'Large catalogues with thin margins, where per-item profit is the only way to see what actually earns.',
      },
      {
        trade: 'Agricultural and hardware supply',
        note: 'Seasonal demand, so reports by product across a date range show what to stock before the season starts.',
      },
      {
        trade: 'Sweet shops and food retail near Chowk Bazar',
        note: 'Weight-based selling with prices that move, so per-kilogram items and quick price edits matter.',
      },
    ],
    localNote:
      'Because credit here often runs on a seasonal cycle rather than a monthly one, we usually suggest reviewing the udhaar list monthly instead of weekly — the same discipline, matched to how money actually arrives.',
  },
  {
    slug: 'peshawar',
    name: 'Peshawar',
    region: 'Khyber Pakhtunkhwa',
    metaTitle: 'POS System in Peshawar — Shop Billing & Inventory Software',
    metaDescription:
      'POS software for Peshawar: Qissa Khwani, Karkhano, University Road. Offline billing, inventory and udhaar. One-time PKR 30,000. Call 0335 7583554',
    keywords: [
      'POS system in Peshawar',
      'POS software Peshawar',
      'billing software Peshawar',
      'general store software Peshawar',
    ],
    headline: 'POS software for shops in Peshawar',
    intro:
      'Peshawar retail mixes long-established bazaar trade with fast-growing suburban shops, and a good deal of high-turnover imported stock.',
    areas: [
      'Qissa Khwani Bazaar and Chowk Yadgar',
      'Karkhano Market',
      'Saddar and Cinema Road',
      'University Road and Hayatabad',
      'Ring Road commercial areas',
    ],
    trades: [
      {
        trade: 'Imported goods and electronics in Karkhano',
        note: 'Stock arrives in batches at varying cost, so purchase price stored per item is what keeps margin honest.',
      },
      {
        trade: 'Traditional retail in Qissa Khwani',
        note: 'Regular customers and negotiated prices, where a running credit total prevents awkward conversations later.',
      },
      {
        trade: 'Kiryana and general stores in Hayatabad',
        note: 'Suburban weekly shopping patterns, with weight-based staples alongside packaged goods.',
      },
      {
        trade: 'Mobile shops across Saddar',
        note: 'IMEI tracking per handset, and old receipts that need finding when a warranty question arrives.',
      },
    ],
    localNote:
      'Where stock arrives in batches at different costs, we set the software up so purchase price is updated per intake rather than left at the first value entered. It takes a minute at delivery and keeps every profit figure afterwards truthful.',
  },
]

export const cityBySlug = (slug: string) => CITIES.find((c) => c.slug === slug)
