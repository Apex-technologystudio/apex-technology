import type { Metadata } from 'next'
import { KEYWORDS, pageMeta } from '@/lib/seo'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Demo } from '@/components/sections/Demo'
import { Showcase } from '@/components/sections/Showcase'
import { FAQ } from '@/components/sections/FAQ'
import { PricingCards } from '@/components/sections/PricingCards'
import {
  AlsoFromApex,
  BuiltForPakistan,
  BusinessTypes,
  DemoNudge,
  Problems,
  TrustProof,
} from '@/components/sections/ContentSections'
import { ContactCTA, PricingPreview, TrustStrip } from '@/components/sections/Grids'
import { POS_FAQS } from '@/content/faq'
import { PRICE_RANGE } from '@/content/pricing'
import { faqSchema, graph, jsonLdProps, posProductSchema, videoSchema } from '@/lib/schema'

export const metadata: Metadata = pageMeta({
  // Home carries no brand name: the keyword and the price do more work in a
  // SERP than a company nobody is searching for yet.
  title: 'POS Software Pakistan — PKR 30,000 One-Time, No Monthly Fee',
  description:
    'Complete POS software for Pakistani businesses: billing, stock, udhaar, staff and daily profit. Works offline. One-time PKR 30,000. Free demo: 0335 7583554',
  path: '/',
  keywords: [...KEYWORDS.core, ...KEYWORDS.problem, ...KEYWORDS.trades],
})

/** Home shows the most-asked questions; the full set lives on /pos-system. */
const HOME_FAQS = POS_FAQS.slice(0, 8)

/**
 * Home page.
 *
 * Ordered as one argument rather than a list of sections:
 *
 *   problem → solution → proof it is real → who it is for → price → trust →
 *   questions → ask for the demo
 *
 * Three sections were removed from this page rather than rewritten. "At the
 * counter" and "Know your numbers" repeated points Features already makes, and
 * now live on /pos-system where that depth belongs. The rent-vs-own comparison
 * moved to /pricing and /compare for the same reason — "no monthly fee" was
 * being made five separate times on one page.
 *
 * The Gym and Services blocks were two full sections; they are one compact
 * block now. The information is true and worth keeping, but it is not what
 * this page is arguing.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />

      {/* Problem before solution — a visitor who recognises their own shop
          here reads everything below it differently. */}
      <Problems />
      <Features />

      {/* Proof the product is real, before asking for anything. */}
      <Demo />
      <HowItWorks />

      <BuiltForPakistan />
      <Showcase />

      {/* "Is it suitable for my business?" — answered directly, then the first
          ask, placed at the natural decision point. */}
      <BusinessTypes />
      <DemoNudge />

      <PricingPreview>
        <PricingCards />
      </PricingPreview>

      <TrustProof />
      <AlsoFromApex />

      <FAQ
        tone="mist"
        faqs={HOME_FAQS}
        title="Questions shop owners ask us"
        description="More answers are on the Apex POS page."
      />
      <ContactCTA />

      <script
        {...jsonLdProps(
          graph(
            posProductSchema({ lowPrice: PRICE_RANGE.low, highPrice: PRICE_RANGE.high }),
            faqSchema(HOME_FAQS),
            // One VideoObject per narration language. Same recording, but
            // `inLanguage` differs, and an Urdu-language result is worth
            // surfacing separately in this market.
            videoSchema({
              name: 'Apex POS walkthrough (English)',
              description:
                'A narrated walkthrough of Apex POS in English: billing a sale, adding stock, checking stock levels and reading daily profit reports.',
              thumbnail: '/media/demo-english-poster.webp',
              contentUrl: '/media/demo-english.mp4',
              uploadDate: '2026-08-30',
              duration: 'PT58S',
              inLanguage: 'en-PK',
            }),
            videoSchema({
              name: 'Apex POS walkthrough (Urdu)',
              description:
                'Apex POS ka mukammal walkthrough Urdu mein: billing, stock, aur rozana profit reports.',
              thumbnail: '/media/demo-urdu-poster.webp',
              contentUrl: '/media/demo-urdu.mp4',
              uploadDate: '2026-08-30',
              duration: 'PT58S',
              inLanguage: 'ur-PK',
            }),
          ),
        )}
      />
    </>
  )
}
