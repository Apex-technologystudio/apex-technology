import type { Metadata } from 'next'
import { KEYWORDS, pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/sections/PageHero'
import { PricingCards } from '@/components/sections/PricingCards'
import { CostComparison } from '@/components/sections/CostComparison'
import { FAQ } from '@/components/sections/FAQ'
import { ContactCTA } from '@/components/sections/Grids'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CheckIcon } from '@/components/svg/Icons'
import { POS_FAQS } from '@/content/faq'
import { PRICE_RANGE } from '@/content/pricing'
import { breadcrumbSchema, faqSchema, graph, jsonLdProps, posProductSchema } from '@/lib/schema'

export const metadata: Metadata = pageMeta({
  title: 'POS System Price in Pakistan — PKR 30,000 to 80,000 One-Time',
  description:
    'Apex POS price list: three one-time packages, PKR 30,000 to 80,000. No monthly fee, first year support free. Compare packages or get a quote: 0335 7583554',
  path: '/pricing',
  keywords: [
    'POS system price in Pakistan',
    'POS software price in Pakistan',
    'POS software cost in Pakistan',
    'cheap POS software Pakistan',
    'POS system ki qeemat',
    ...KEYWORDS.core,
  ],
})

const BREADCRUMB = [{ name: 'Pricing', path: '/pricing' }]

/** Costs buyers expect to be hidden — stated up front instead. */
const NO_SURPRISES = [
  'No monthly or per-counter licence fee',
  'No charge for the demo or the quote',
  'Remote installation and training included in every package',
  'Support and updates included for the first year',
]

const PRICING_FAQS = POS_FAQS.filter((faq) =>
  /price|qeemat|monthly|yearly|fee/i.test(faq.question),
)

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        breadcrumb={BREADCRUMB}
        title="POS system price in Pakistan"
        description="Three packages, one payment. Apex POS costs between PKR 30,000 and PKR 80,000 depending on what your shop needs — and there is no monthly fee on any of them."
      />

      <Section tone="white">
        <Container>
          <PricingCards />
        </Container>
      </Section>

      <CostComparison />

      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="No surprises"
            title="What you will not be charged for"
            description="Software pricing in this market is often quoted low and topped up later. Here is what is already in the number above."
          />
          <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            {NO_SURPRISES.map((item, i) => (
              <Reveal key={item} delay={i * 0.06}>
                <li className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-5">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
                  <span className="text-[0.95rem] leading-snug text-navy-700">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <FAQ
        faqs={PRICING_FAQS}
        title="Questions about price"
        eyebrow="Pricing FAQ"
      />
      <ContactCTA
        title="Not sure which package fits?"
        description="Tell us what you sell and how busy the counter gets, and we will tell you which package covers it — including if that is the cheapest one."
      />

      <script
        {...jsonLdProps(
          graph(
            posProductSchema({ lowPrice: PRICE_RANGE.low, highPrice: PRICE_RANGE.high }),
            faqSchema(PRICING_FAQS),
            breadcrumbSchema(BREADCRUMB),
          ),
        )}
      />
    </>
  )
}
