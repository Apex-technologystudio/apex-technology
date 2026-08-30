import type { Metadata } from 'next'
import { KEYWORDS, pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/sections/PageHero'
import { Features } from '@/components/sections/Features'
import { CounterSpeed, KnowYourNumbers } from '@/components/sections/NewSections'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Demo } from '@/components/sections/Demo'
import { FAQ } from '@/components/sections/FAQ'
import { PricingCards } from '@/components/sections/PricingCards'
import { CostComparison } from '@/components/sections/CostComparison'
import { ContactCTA, IndustriesGrid, PricingPreview } from '@/components/sections/Grids'
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button'
import { ArrowRightIcon, WhatsAppIcon } from '@/components/svg/Icons'
import { POS_FAQS } from '@/content/faq'
import { PRICE_RANGE } from '@/content/pricing'
import { whatsappLink, whatsappMessages } from '@/lib/site'
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  jsonLdProps,
  posProductSchema,
  videoSchema,
} from '@/lib/schema'

export const metadata: Metadata = pageMeta({
  title: 'Best POS Software in Pakistan — Offline, One-Time PKR 30,000',
  description:
    'Offline POS for shops in Pakistan — a POS application on your own PC. Barcode billing, stock, udhaar and profit. One-time from PKR 30,000. Call 0335 7583554',
  path: '/pos-system',
  keywords: [...KEYWORDS.core, ...KEYWORDS.problem, ...KEYWORDS.payments, ...KEYWORDS.trades],
})

const BREADCRUMB = [{ name: 'Apex POS', path: '/pos-system' }]

export default function PosSystemPage() {
  return (
    <>
      <PageHero
        eyebrow="Apex POS"
        breadcrumb={BREADCRUMB}
        title="POS software for Pakistani shops, built to run offline"
        description="Apex POS is offline POS software for shops in Pakistan — a POS application installed on your own Windows PC. Billing, stock, udhaar, expenses and profit. Buy it once from PKR 30,000 and it keeps working whether or not the internet does."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonAnchor
            href={whatsappLink(whatsappMessages.pos)}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            shine
          >
            <WhatsAppIcon className="h-5 w-5" />
            Get a free demo
          </ButtonAnchor>
          <ButtonLink
            href="/pricing"
            size="lg"
            className="border border-white/25 bg-white/5 text-white hover:border-cyan/60 hover:bg-white/10"
          >
            See pricing
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </PageHero>

      <Features />
      <CounterSpeed />
      <Demo />
      <HowItWorks />
      <KnowYourNumbers />
      <PricingPreview>
        <PricingCards />
      </PricingPreview>
      <CostComparison />
      <IndustriesGrid />
      <FAQ
        faqs={POS_FAQS}
        title="Everything people ask about Apex POS"
        description="Prices, hardware, offline use, data safety and support — answered plainly."
      />
      <ContactCTA
        title="See it with your own products in it"
        message={whatsappMessages.pos}
      />

      <script
        {...jsonLdProps(
          graph(
            posProductSchema({ lowPrice: PRICE_RANGE.low, highPrice: PRICE_RANGE.high }),
            faqSchema(POS_FAQS),
            breadcrumbSchema(BREADCRUMB),
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
