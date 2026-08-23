/**
 * Head-to-head comparison pages.
 *
 * These target queries phrased as a choice ("offline vs cloud POS"), which is
 * both high commercial intent and the shape answer engines quote most readily:
 * a clear question, a table of concrete differences, and a stated verdict.
 *
 * Each page names a winner per row, including rows the competing option wins.
 * A comparison that awards every point to us reads as an advertisement and gets
 * discounted by readers and by the engines summarising them.
 */
export type Comparison = {
  slug: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  eyebrow: string
  title: string
  intro: string
  optionA: string
  optionB: string
  /** `winner` says which column wins that row — sometimes it is A. */
  rows: Array<{ criterion: string; a: string; b: string; winner: 'a' | 'b' | 'tie' }>
  verdictTitle: string
  verdict: string[]
  /** When the other option genuinely is the better choice. */
  chooseOther: { title: string; points: string[] }
  faqs: Array<{ question: string; answer: string }>
}

export const COMPARISONS: Comparison[] = [
  {
    slug: 'one-time-vs-monthly-pos-cost',
    metaTitle: 'One-Time vs Monthly POS in Pakistan — Real 5-Year Cost',
    metaDescription:
      'Monthly POS costs less in year one, more from year two. The arithmetic, the 15-month crossover, and which fits your shop. From PKR 30,000 one-time.',
    keywords: [
      'POS software without monthly fee',
      'one-time POS software Pakistan',
      'POS subscription cost Pakistan',
      'POS system price in Pakistan',
    ],
    eyebrow: 'Rent vs own',
    title: 'One-time licence vs monthly subscription',
    intro:
      'Nearly every POS sold in Pakistan is rented monthly. Apex POS is bought once. Here is the honest comparison, including the year where renting genuinely wins.',
    optionA: 'Monthly subscription',
    optionB: 'One-time licence',
    rows: [
      {
        criterion: 'Cost in year one',
        a: 'PKR 24,000 at 2,000/month',
        b: 'PKR 30,000',
        winner: 'a',
      },
      {
        criterion: 'Cost over three years',
        a: 'PKR 72,000',
        b: 'PKR 30,000',
        winner: 'b',
      },
      {
        criterion: 'Cost over five years',
        a: 'PKR 120,000',
        b: 'PKR 30,000',
        winner: 'b',
      },
      {
        criterion: 'Upfront outlay',
        a: 'Low — spreads the cost',
        b: 'Higher — paid once',
        winner: 'a',
      },
      {
        criterion: 'If you stop paying',
        a: 'Access ends',
        b: 'Software keeps working',
        winner: 'b',
      },
      {
        criterion: 'Price rises over time',
        a: 'Vendor can raise the monthly fee',
        b: 'Already paid — cannot rise',
        winner: 'b',
      },
      {
        criterion: 'Trying it briefly',
        a: 'Cheap to start and stop',
        b: 'Poor fit for a short trial',
        winner: 'a',
      },
      {
        criterion: 'Where your data lives',
        a: 'Vendor’s servers',
        b: 'Your own computer',
        winner: 'b',
      },
    ],
    verdictTitle: 'The crossover is about 15 months',
    verdict: [
      'At PKR 2,000 a month against a PKR 30,000 one-time licence, renting is cheaper for roughly the first fifteen months. After that the gap widens every month and never closes — about PKR 90,000 apart at the five-year mark.',
      'So the question is not which is cheaper in the abstract. It is how long you expect the shop to keep trading. Beyond about eighteen months, buying costs less.',
    ],
    chooseOther: {
      title: 'When a subscription is the better choice',
      points: [
        'You are testing whether POS software suits you at all — a few months of rent is a cheaper experiment than a licence',
        'The business is new and you are not yet sure it will still be running next year',
        'You genuinely need live multi-branch access and are willing to pay for the infrastructure behind it',
        'You would rather someone else be responsible for backups than maintain your own',
      ],
    },
    faqs: [
      {
        question: 'What happens to Apex POS if I stop paying for support?',
        answer:
          'The software keeps working. The licence is perpetual — the optional PKR 8,000 per year covers support and updates only. If you do not renew, you simply stop receiving updates; billing, inventory, reports and your data all continue as normal.',
      },
      {
        question: 'Is a one-time POS licence cheaper than monthly in Pakistan?',
        answer:
          'After roughly fifteen months, yes. A PKR 2,000 per month subscription costs PKR 24,000 in year one against a PKR 30,000 one-time licence, so renting is cheaper at first. By three years it is PKR 72,000 against PKR 30,000, and by five years PKR 120,000 against PKR 30,000.',
      },
      {
        question: 'Can I move my data if I leave a subscription POS?',
        answer:
          'Ask that vendor directly, and ask for the export format in writing before you buy. It is the question that determines whether you can ever leave. Apex POS stores your database on your own machine and exports sales, stock and receipts to CSV.',
      },
    ],
  },
  {
    slug: 'offline-vs-cloud-pos',
    metaTitle: 'Offline vs Cloud POS in Pakistan — Which Is Better?',
    metaDescription:
      'Cloud POS needs constant internet; offline POS runs on your own PC. How each behaves during load-shedding, and which suits your shop.',
    keywords: [
      'offline POS software Pakistan',
      'cloud POS Pakistan',
      'POS software without internet',
      'best POS system Pakistan',
    ],
    eyebrow: 'Offline vs cloud',
    title: 'Offline POS vs cloud POS',
    intro:
      'The choice comes down to one question: if the connection dies mid-queue, can you still take the sale? Here is what each model actually gives you.',
    optionA: 'Cloud POS',
    optionB: 'Offline POS',
    rows: [
      {
        criterion: 'Internet goes down',
        a: 'Billing stops, or runs limited',
        b: 'No effect at all',
        winner: 'b',
      },
      {
        criterion: 'During load-shedding',
        a: 'Router down with the power',
        b: 'Runs on a laptop battery',
        winner: 'b',
      },
      {
        criterion: 'Multiple branches, one live view',
        a: 'Built for it',
        b: 'Harder — each shop is separate',
        winner: 'a',
      },
      {
        criterion: 'Checking sales from home',
        a: 'Any browser, anywhere',
        b: 'Only at the shop machine',
        winner: 'a',
      },
      {
        criterion: 'Speed of everyday use',
        a: 'Depends on connection quality',
        b: 'Local — instant',
        winner: 'b',
      },
      {
        criterion: 'Who holds your data',
        a: 'The provider',
        b: 'You',
        winner: 'b',
      },
      {
        criterion: 'Responsibility for backups',
        a: 'The provider handles it',
        b: 'Yours to configure and check',
        winner: 'a',
      },
      {
        criterion: 'Ongoing cost',
        a: 'Monthly, indefinitely',
        b: 'One-time',
        winner: 'b',
      },
    ],
    verdictTitle: 'For most Pakistani shops, offline',
    verdict: [
      'Where connections are unreliable and load-shedding is routine, the ability to keep billing is worth more than remote access. A shop cannot ask a queue to wait for a router.',
      'Cloud is not the wrong answer everywhere — it is the wrong answer when an outage means you cannot serve the person in front of you.',
    ],
    chooseOther: {
      title: 'When cloud is the better choice',
      points: [
        'You run several branches and need one live view of stock and sales across all of them',
        'You need to check figures from home or while travelling, routinely',
        'Your connection is genuinely reliable and you have backup power',
        'Nobody at the shop will maintain a backup routine, and you would rather that be someone else’s job',
      ],
    },
    faqs: [
      {
        question: 'Does offline POS software work completely without internet?',
        answer:
          'Yes. Apex POS is a Windows application installed on the shop computer. Billing, inventory, receipts, udhaar and reports all run with no internet connection at all. A connection is only needed if you want us to help remotely.',
      },
      {
        question: 'What is the risk of offline POS?',
        answer:
          'Backups become your responsibility. If the hard disk fails and no copy exists, the data is gone. Apex POS copies its database to a folder you choose every two hours; we recommend pointing that at a USB drive or a synced cloud folder so a copy exists off the machine.',
      },
      {
        question: 'Can offline POS handle more than one shop?',
        answer:
          'Each shop runs its own installation with its own licence, and you compare exported reports between them. If you need a single live view across branches, cloud software fits that need better and we will say so.',
      },
    ],
  },
]

export const comparisonBySlug = (slug: string) => COMPARISONS.find((c) => c.slug === slug)
