import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/sections/PageHero'
import { ContactCTA, IndustriesGrid } from '@/components/sections/Grids'
import { PricingCards } from '@/components/sections/PricingCards'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { PhoneFrame } from '@/components/media/Players'
import { ButtonAnchor } from '@/components/ui/Button'
import { ArrowRightIcon, WhatsAppIcon } from '@/components/svg/Icons'
import { INDUSTRIES, industryBySlug } from '@/content/industries'
import { PRICE_RANGE } from '@/content/pricing'
import { whatsappLink, whatsappMessages } from '@/lib/site'
import { breadcrumbSchema, graph, jsonLdProps, posProductSchema } from '@/lib/schema'

/** Every industry page is known at build time, so all four prerender. */
export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = industryBySlug(slug)
  if (!industry) return {}

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    keywords: industry.keywords,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
      url: `/industries/${industry.slug}`,
    },
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = industryBySlug(slug)
  if (!industry) notFound()

  const breadcrumb = [
    { name: 'Industries', path: '/industries' },
    { name: industry.name, path: `/industries/${industry.slug}` },
  ]

  return (
    <>
      <PageHero
        eyebrow={industry.name}
        breadcrumb={breadcrumb}
        title={industry.headline}
        description={industry.intro}
      >
        <ButtonAnchor
          href={whatsappLink(whatsappMessages.industry(industry.name.toLowerCase()))}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="lg"
          shine
        >
          <WhatsAppIcon className="h-5 w-5" />
          Get a free demo
        </ButtonAnchor>
      </PageHero>

      <Section tone="white">
        <Container>
          <div className="grid items-start gap-14 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <SectionHeading
                align="left"
                eyebrow="The daily problem"
                title="What this trade actually struggles with"
                description="Four problems we hear repeatedly, and exactly which part of Apex POS answers each one."
              />

              <ol className="mt-12 flex flex-col gap-10">
                {industry.problems.map((item, i) => (
                  <Reveal key={item.problem} delay={i * 0.06}>
                    <li className="border-l-2 border-navy-100 pl-6">
                      <h3 className="text-h3 text-navy">{item.problem}</h3>
                      <p className="mt-3 flex items-start gap-2.5 text-[0.975rem] leading-relaxed text-navy-600">
                        <ArrowRightIcon className="mt-1 h-4 w-4 shrink-0 text-cyan" />
                        {item.solution}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>

            <Reveal direction="left" className="mx-auto w-full max-w-[280px] lg:sticky lg:top-28">
              <PhoneFrame
                src={industry.clip}
                poster={industry.clipPoster}
                alt={industry.clipAlt}
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title="Same packages, whatever you sell"
            description="Apex POS is priced by what the shop needs, not by trade. Every package is a one-time purchase."
          />
          <div className="mt-14">
            <PricingCards />
          </div>
        </Container>
      </Section>

      <IndustriesGrid />

      <ContactCTA
        title={`See Apex POS set up for your ${industry.navLabel.toLowerCase()}`}
        message={whatsappMessages.industry(industry.name.toLowerCase())}
      />

      <script
        {...jsonLdProps(
          graph(
            posProductSchema({ lowPrice: PRICE_RANGE.low, highPrice: PRICE_RANGE.high }),
            breadcrumbSchema(breadcrumb),
          ),
        )}
      />
    </>
  )
}
