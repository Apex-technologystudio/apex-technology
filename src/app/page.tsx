import type { Metadata } from 'next'
import { KEYWORDS, pageMeta } from '@/lib/seo'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { CounterSpeed, KnowYourNumbers } from '@/components/sections/NewSections'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Demo } from '@/components/sections/Demo'
import { KhataStory } from '@/components/sections/KhataStory'
import { Showcase } from '@/components/sections/Showcase'
import { FAQ } from '@/components/sections/FAQ'
import { PricingCards } from '@/components/sections/PricingCards'
import { CostComparison } from '@/components/sections/CostComparison'
import {
  ContactCTA,
  GymTeaser,
  IndustriesGrid,
  PricingPreview,
  ServicesGrid,
  TrustStrip,
} from '@/components/sections/Grids'
import { POS_FAQS } from '@/content/faq'
import { PRICE_RANGE } from '@/content/pricing'
import { faqSchema, graph, jsonLdProps, posProductSchema, videoSchema } from '@/lib/schema'

export const metadata: Metadata = pageMeta({
  // Home carries no brand name: the keyword and the price do more work in a
  // SERP than a company nobody is searching for yet.
  title: 'POS Software Pakistan — PKR 30,000 One-Time, No Monthly Fee',
  description:
    'Offline POS software for Pakistani shops: billing, inventory, udhaar and real daily profit. One-time PKR 30,000, no monthly fee. Free demo: 0335 7583554',
  path: '/',
  keywords: [...KEYWORDS.core, ...KEYWORDS.problem, ...KEYWORDS.trades],
})

/** The FAQ block is trimmed on the home page; the full set lives on /pos-system. */
const HOME_FAQS = POS_FAQS.slice(0, 6)

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <KhataStory />
      <Features />
      <CounterSpeed />
      <Demo />
      <HowItWorks />
      <KnowYourNumbers />
      <Showcase />
      <PricingPreview>
        <PricingCards />
      </PricingPreview>
      <CostComparison />
      <IndustriesGrid />
      <GymTeaser />
      <ServicesGrid />
      <FAQ
        faqs={HOME_FAQS}
        description="The things shopkeepers ask us most. There are more answers on the Apex POS page."
      />
      <ContactCTA />

      <script
        {...jsonLdProps(
          graph(
            posProductSchema({ lowPrice: PRICE_RANGE.low, highPrice: PRICE_RANGE.high }),
            faqSchema(HOME_FAQS),
            videoSchema({
              name: 'Apex POS — full software walkthrough',
              description:
                'A complete walkthrough of Apex POS: billing a sale, managing inventory, taking split payments, tracking udhaar, and reading daily profit reports.',
              thumbnail: '/media/pos-demo-poster.webp',
              contentUrl: '/media/pos-demo.mp4',
              uploadDate: '2026-08-23',
              duration: 'PT2M7S',
            }),
          ),
        )}
      />
    </>
  )
}
