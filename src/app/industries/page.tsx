import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/sections/PageHero'
import { ContactCTA, IndustriesGrid } from '@/components/sections/Grids'
import { CostComparison } from '@/components/sections/CostComparison'
import { breadcrumbSchema, graph, jsonLdProps, posProductSchema } from '@/lib/schema'
import { PRICE_RANGE } from '@/content/pricing'
import { INDUSTRIES } from '@/content/industries'

export const metadata: Metadata = pageMeta({
  title: 'POS Software by Trade in Pakistan — Retail, Cafe, Pharmacy',
  description:
    'Apex POS set up for your trade: kiryana and retail, restaurants and cafes, pharmacies and supermarkets. One-time PKR 30,000, works offline. Demo: 0335 7583554',
  path: '/industries',
  keywords: INDUSTRIES.flatMap((industry) => industry.keywords),
})

const BREADCRUMB = [{ name: 'Industries', path: '/industries' }]

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="By trade"
        breadcrumb={BREADCRUMB}
        title="POS software set up for your kind of shop"
        description="The same software underneath, configured around what each trade deals with daily — and the same one-time price whichever one you are."
      />
      <IndustriesGrid />
      <CostComparison tone="white" />
      <ContactCTA title="Not sure which setup fits your shop?" />

      <script
        {...jsonLdProps(
          graph(
            posProductSchema({ lowPrice: PRICE_RANGE.low, highPrice: PRICE_RANGE.high }),
            breadcrumbSchema(BREADCRUMB),
          ),
        )}
      />
    </>
  )
}
