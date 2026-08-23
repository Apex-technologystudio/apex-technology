import type { Metadata } from 'next'
import { KEYWORDS, pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/sections/PageHero'
import { ContactCTA, ServicesGrid } from '@/components/sections/Grids'
import { breadcrumbSchema, graph, jsonLdProps } from '@/lib/schema'

export const metadata: Metadata = pageMeta({
  title: 'Software House in Pakistan — Web, Apps & Custom Software',
  description:
    'Websites, Android and iOS apps, and custom business software built in Pakistan. Fixed scope and fixed price, agreed before we start. Talk to us: 0335 7583554',
  path: '/services',
  keywords: [...KEYWORDS.services],
})

const BREADCRUMB = [{ name: 'Services', path: '/services' }]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        breadcrumb={BREADCRUMB}
        title="Software built around how your business already works"
        description="Apex POS is our product. Alongside it we build websites, mobile apps and custom systems for businesses that have outgrown spreadsheets and off-the-shelf tools."
      />
      <ServicesGrid />
      <ContactCTA title="Tell us what you need built" />
      <script {...jsonLdProps(graph(breadcrumbSchema(BREADCRUMB)))} />
    </>
  )
}
