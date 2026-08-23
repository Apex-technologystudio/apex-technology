import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/sections/PageHero'
import { PricingCards } from '@/components/sections/PricingCards'
import { ContactCTA, IndustriesGrid } from '@/components/sections/Grids'
import { CostComparison } from '@/components/sections/CostComparison'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonAnchor } from '@/components/ui/Button'
import { LocationIcon, WhatsAppIcon } from '@/components/svg/Icons'
import { CITIES, cityBySlug } from '@/content/cities'
import { PRICE_RANGE } from '@/content/pricing'
import { site, whatsappLink } from '@/lib/site'
import { pageMeta } from '@/lib/seo'
import { breadcrumbSchema, graph, jsonLdProps, posProductSchema } from '@/lib/schema'

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city: slug } = await params
  const city = cityBySlug(slug)
  if (!city) return {}
  return pageMeta({
    title: city.metaTitle,
    description: city.metaDescription,
    path: `/pos-system/${city.slug}`,
    keywords: city.keywords,
  })
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city: slug } = await params
  const city = cityBySlug(slug)
  if (!city) notFound()

  const breadcrumb = [
    { name: 'Apex POS', path: '/pos-system' },
    { name: city.name, path: `/pos-system/${city.slug}` },
  ]

  const message = `Assalam o Alaikum! I have a shop in ${city.name} and I'd like a demo of Apex POS.`

  return (
    <>
      <PageHero
        eyebrow={city.name}
        breadcrumb={breadcrumb}
        title={city.headline}
        description={city.intro}
      >
        <ButtonAnchor
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="lg"
          shine
        >
          <WhatsAppIcon className="h-5 w-5" />
          Get a demo in {city.name}
        </ButtonAnchor>
      </PageHero>

      <Section tone="white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <SectionHeading
                align="left"
                eyebrow={`Retail in ${city.name}`}
                title="Set up for how shops here actually trade"
                description={`What we see most across ${city.name}, and which part of Apex POS matters for each.`}
              />

              <ul className="mt-10 flex flex-col gap-8">
                {city.trades.map((t, i) => (
                  <Reveal key={t.trade} delay={i * 0.06}>
                    <li className="border-l-2 border-navy-100 pl-6">
                      <h3 className="text-h3 text-navy">{t.trade}</h3>
                      <p className="mt-2 text-[0.975rem] leading-relaxed text-navy-600">
                        {t.note}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ul>

              <Reveal>
                <p className="mt-10 rounded-2xl border border-cyan/25 bg-cyan-50 p-7 text-[1.02rem] leading-relaxed text-navy-700">
                  {city.localNote}
                </p>
              </Reveal>
            </div>

            <Reveal direction="left" className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-navy-100 bg-mist p-8">
                <h2 className="flex items-center gap-2.5 text-h3 text-navy">
                  <LocationIcon className="h-5 w-5 text-cyan-700" />
                  Areas we cover
                </h2>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {city.areas.map((area) => (
                    <li
                      key={area}
                      className="flex items-start gap-2.5 text-[0.95rem] text-navy-700"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan"
                      />
                      {area}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-navy-200 pt-5 text-sm leading-relaxed text-navy-500">
                  Installation, training and support are delivered remotely across{' '}
                  {city.region}, so where your shop sits does not change what you pay or how
                  quickly we can help.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title={`Same price in ${city.name} as everywhere else`}
            description="One-time licence, no monthly fee, first year of support included. Remote setup means no travel charges."
          />
          <div className="mt-14">
            <PricingCards />
          </div>
        </Container>
      </Section>

      <CostComparison tone="white" />
      <IndustriesGrid />

      <ContactCTA title={`Book a free demo for your ${city.name} shop`} message={message} />

      <script
        {...jsonLdProps(
          graph(
            posProductSchema({ lowPrice: PRICE_RANGE.low, highPrice: PRICE_RANGE.high }),
            breadcrumbSchema(breadcrumb),
            {
              // Service rather than LocalBusiness: we have no branch address in
              // this city, and claiming a physical presence we do not have
              // would be false and is a common cause of manual actions.
              '@type': 'Service',
              name: `Apex POS installation and support in ${city.name}`,
              serviceType: 'Point of sale software installation and support',
              provider: { '@id': `${site.url}/#organization` },
              areaServed: { '@type': 'City', name: city.name },
              availableChannel: {
                '@type': 'ServiceChannel',
                serviceUrl: new URL(`/pos-system/${city.slug}`, site.url).toString(),
                servicePhone: site.phoneDisplay,
              },
            },
          ),
        )}
      />
    </>
  )
}
