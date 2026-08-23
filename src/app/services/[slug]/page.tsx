import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/sections/PageHero'
import { ContactCTA, ServicesGrid } from '@/components/sections/Grids'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonAnchor } from '@/components/ui/Button'
import { CheckIcon, WhatsAppIcon } from '@/components/svg/Icons'
import { SERVICES, serviceBySlug } from '@/content/services'
import { whatsappLink } from '@/lib/site'
import { breadcrumbSchema, graph, jsonLdProps } from '@/lib/schema'

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = serviceBySlug(slug)
  if (!service) return {}

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = serviceBySlug(slug)
  if (!service) notFound()

  const breadcrumb = [
    { name: 'Services', path: '/services' },
    { name: service.title, path: `/services/${service.slug}` },
  ]

  const message = `Assalam o Alaikum! I'm interested in ${service.title} for my business. Can we discuss?`

  return (
    <>
      <PageHero
        eyebrow="Services"
        breadcrumb={breadcrumb}
        title={service.title}
        description={service.intro}
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
          Discuss your project
        </ButtonAnchor>
      </PageHero>

      <Section tone="white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="What we deliver"
                title="What this covers"
              />
              <ul className="mt-10 flex flex-col gap-4">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
                    <span className="text-[0.975rem] leading-relaxed text-navy-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <SectionHeading align="left" eyebrow="How we work" title="From first call to handover" />
              <ol className="mt-10 flex flex-col gap-8">
                {service.process.map((step, i) => (
                  <li key={step.title} className="flex gap-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mist text-sm font-extrabold text-navy">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-semibold text-navy">{step.title}</h3>
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-navy-600">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      <ServicesGrid tone="mist" />
      <ContactCTA title={`Let's talk about your ${service.title.toLowerCase()} project`} message={message} />

      <script {...jsonLdProps(graph(breadcrumbSchema(breadcrumb)))} />
    </>
  )
}
