import Link from 'next/link'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonAnchor } from '@/components/ui/Button'
import { ArrowRightIcon, WhatsAppIcon } from '@/components/svg/Icons'
import { INDUSTRIES } from '@/content/industries'
import { SERVICES } from '@/content/services'
import { WHY_APEX } from '@/content/pos'
import { site, whatsappLink, whatsappMessages } from '@/lib/site'

/** Three checkable claims, directly under the hero. */
export function TrustStrip() {
  return (
    <Section tone="mist" className="py-12 md:py-14">
      <Container>
        <ul className="grid gap-8 sm:grid-cols-3">
          {WHY_APEX.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-cyan">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-navy">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-navy-600">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

export function IndustriesGrid() {
  return (
    <Section tone="mist" id="industries">
      <Container>
        <SectionHeading
          eyebrow="By trade"
          title="Set up for your kind of shop"
          description="The same software, configured around what each trade deals with daily — and priced the same either way."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.slug} delay={i * 0.06}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-xl"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-cyan">
                  <industry.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-h3 text-navy">{industry.name}</h3>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-navy-600">
                  {industry.intro}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700">
                  See how it fits
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export function ServicesGrid({ tone = 'white' }: { tone?: 'white' | 'mist' }) {
  return (
    <Section tone={tone} id="services">
      <Container>
        <SectionHeading
          eyebrow="Beyond POS"
          title="The rest of what the studio builds"
          description="APEX TECHNOLOGY is a software studio. Apex POS is what we sell most — it is not all we do."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-xl"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-cyan">
                  <service.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-h3 text-navy">{service.title}</h3>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-navy-600">
                  {service.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700">
                  See what we build
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/** Closing call to action, reused across pages. */
export function ContactCTA({
  title = 'Tell us about your shop',
  description = 'Message us on WhatsApp and we will show you the software, answer your questions and give you a straight price. The demo is free and there is no obligation.',
  message = whatsappMessages.general,
}: {
  title?: string
  description?: string
  message?: string
}) {
  return (
    <Section tone="navy" className="overflow-hidden" id="contact">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.07]" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/20 blur-3xl"
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-h2 text-white">{title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-navy-100">{description}</p>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonAnchor
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              shine
            >
              <WhatsAppIcon className="h-5 w-5" />
              Book a Free Demo
            </ButtonAnchor>
            <ButtonAnchor
              href={site.phoneHref}
              size="lg"
              className="border border-white/25 bg-white/5 text-white hover:border-cyan/60 hover:bg-white/10"
            >
              Call {site.phoneDisplay}
            </ButtonAnchor>
          </div>

          <p className="mt-6 text-sm text-navy-300">
            Prefer email?{' '}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-cyan underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </p>
        </div>
      </Container>
    </Section>
  )
}

/** Home-page pricing preview that links through to the full page. */
export function PricingPreview({ children }: { children: React.ReactNode }) {
  return (
    <Section tone="white" id="pricing">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Pay once. It is yours."
          description="Three packages between PKR 30,000 and PKR 80,000. Installation, training and the first year of support are included in every one."
        />
        <div className="mt-14">{children}</div>
      </Container>
    </Section>
  )
}
