import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/sections/PageHero'
import { ContactForm } from '@/components/sections/ContactForm'
import { FAQ } from '@/components/sections/FAQ'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { MailIcon, PhoneIcon, WhatsAppIcon, LocationIcon } from '@/components/svg/Icons'
import { COMPANY_FAQS } from '@/content/faq'
import { site, whatsappLink, whatsappMessages } from '@/lib/site'
import { breadcrumbSchema, faqSchema, graph, jsonLdProps } from '@/lib/schema'

export const metadata: Metadata = pageMeta({
  title: 'Free POS Demo in Pakistan — WhatsApp 0335 7583554',
  description:
    'Free demo of Apex POS for your shop — WhatsApp or call 0335 7583554, or email apextechnologies2125@gmail.com. Nationwide across Pakistan, no charge.',
  path: '/contact',
  keywords: [
    'POS software demo Pakistan',
    'free POS demo Pakistan',
    'POS software support Pakistan',
    'POS company in Pakistan',
  ],
})

const BREADCRUMB = [{ name: 'Contact', path: '/contact' }]

const CHANNELS = [
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    value: site.phoneDisplay,
    href: whatsappLink(whatsappMessages.general),
    external: true,
    note: 'Fastest — usually answered same day',
  },
  {
    icon: PhoneIcon,
    label: 'Phone',
    value: site.phoneDisplay,
    href: site.phoneHref,
    external: false,
    note: 'Call during business hours',
  },
  {
    icon: MailIcon,
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
    note: 'For detailed requirements and quotes',
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        breadcrumb={BREADCRUMB}
        title="Talk to us about your shop"
        description="Tell us what you sell and how you work now. We will show you the software on a screen share, answer your questions, and give you a straight price. The demo is free."
      />

      <Section tone="white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <h2 className="text-h2 text-navy">Send us your details</h2>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-navy-600">
                Fill this in and it opens WhatsApp with everything already written out — you
                just press send.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>

            <Reveal delay={0.1} direction="left">
              <div className="rounded-2xl border border-navy-100 bg-mist p-8">
                <h2 className="text-h3 text-navy">Or reach us directly</h2>
                <ul className="mt-6 flex flex-col gap-6">
                  {CHANNELS.map((channel) => (
                    <li key={channel.label}>
                      <a
                        href={channel.href}
                        {...(channel.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="group flex items-start gap-4"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-cyan transition-colors group-hover:bg-cyan group-hover:text-navy">
                          <channel.icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy-500">
                            {channel.label}
                          </span>
                          <span className="mt-0.5 block break-all font-semibold text-navy transition-colors group-hover:text-cyan-700">
                            {channel.value}
                          </span>
                          <span className="mt-0.5 block text-sm text-navy-500">
                            {channel.note}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                  <li className="flex items-start gap-4 border-t border-navy-200 pt-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-cyan">
                      <LocationIcon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy-500">
                        Service area
                      </span>
                      <span className="mt-0.5 block font-semibold text-navy">
                        All of {site.country}
                      </span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-navy-500">
                        Remote installation, training and support nationwide.
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FAQ faqs={COMPANY_FAQS} title="Before you get in touch" eyebrow="Good to know" />

      <script {...jsonLdProps(graph(faqSchema(COMPANY_FAQS), breadcrumbSchema(BREADCRUMB)))} />
    </>
  )
}
