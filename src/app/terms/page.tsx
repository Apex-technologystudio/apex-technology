import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Container, Section } from '@/components/ui/Section'
import { site } from '@/lib/site'
import { formatPKR } from '@/lib/utils'
import { SUPPORT_FEE } from '@/content/pricing'
import { breadcrumbSchema, graph, jsonLdProps } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `The terms that apply to software, licences and services supplied by ${site.name}.`,
  alternates: { canonical: '/terms' },
}

const BREADCRUMB = [{ name: 'Terms of Service', path: '/terms' }]

/**
 * NOTE FOR MAINTAINERS: these terms describe the commercial arrangement as
 * currently stated on the pricing page (one-time licence, first year of support
 * included, optional renewal). If the pricing model changes, change this too.
 * This is a plain-language summary, not a substitute for legal advice — APEX
 * TECHNOLOGY should have a lawyer review it before relying on it in a dispute.
 */
const SECTIONS = [
  {
    title: 'Who these terms are between',
    body: [
      `These terms apply between ${site.name} and any person or business that purchases software, licences or development services from us. They take effect when you place an order or accept a quote.`,
    ],
  },
  {
    title: 'Software licence',
    body: [
      `Apex POS and Apex Gym are licensed, not sold. When you buy a package you receive a perpetual licence to use that software for the business and location agreed in your order. The licence does not expire.`,
      `You may not resell, sublicense, redistribute or reverse engineer the software, and you may not remove or alter any branding within it, without our written permission.`,
      `Additional shops, branches or locations require additional licences.`,
    ],
  },
  {
    title: 'Price and payment',
    body: [
      `Package prices are quoted in Pakistani Rupees and are one-time payments. The price you are quoted in writing is the price you pay for the scope agreed in that quote.`,
      `Work outside an agreed scope — additional features, extra locations, or migration beyond what was quoted — is priced separately and agreed in writing before it starts.`,
    ],
  },
  {
    title: 'Installation, training and support',
    body: [
      `Every package includes installation and an initial training session, delivered remotely unless your package or quote states otherwise.`,
      `The first year of support and updates is included from the date of installation. After that, support and updates are optional at ${formatPKR(SUPPORT_FEE)} per year. If you choose not to renew, your software continues to work — you simply stop receiving updates and support.`,
      `Support covers the software itself. It does not cover your hardware, your internet connection, your printer, or problems caused by other software on your computer, although we will help where we reasonably can.`,
    ],
  },
  {
    title: 'Your data and backups',
    body: [
      `Your business data is stored on your own computer. You are responsible for keeping the automatic backup enabled, choosing a sensible backup location, and verifying that backups are being made.`,
      `We are not able to recover data that was never backed up. We strongly recommend pointing the backup folder at a separate drive or a synced cloud folder.`,
    ],
  },
  {
    title: 'Development services',
    body: [
      `Websites, mobile apps and custom software are delivered against a written scope, price and timeline agreed before work begins. Changes to that scope are agreed in writing and may affect price and timeline.`,
      `On full payment, ownership of the delivered custom work passes to you, except for any third-party components and any pre-existing tools or libraries of ours used to build it, which remain ours and are licensed to you for use within that deliverable.`,
    ],
  },
  {
    title: 'Limits of responsibility',
    body: [
      `We take reliability seriously, but no software is guaranteed to be error-free. To the extent permitted by law, our total liability in connection with any product or service is limited to the amount you paid us for it.`,
      `We are not liable for indirect or consequential losses, including lost profits or lost business, arising from use of the software.`,
    ],
  },
  {
    title: 'Refunds',
    body: [
      `Because a demo is offered free and before purchase, we ask you to confirm the software fits your business before paying. If something we committed to in writing does not work as described and we cannot put it right, contact us and we will resolve it fairly.`,
    ],
  },
  {
    title: 'Governing law',
    body: [
      `These terms are governed by the laws of the Islamic Republic of Pakistan, and the courts of Pakistan have jurisdiction over any dispute arising from them.`,
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        breadcrumb={BREADCRUMB}
        title="Terms of Service"
        description="The terms that apply when you buy software or services from us, written in plain language."
      />

      <Section tone="white">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col gap-10">
            {SECTIONS.map((section) => (
              <section key={section.title}>
                <h2 className="text-h3 text-navy">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-4 text-[1.02rem] leading-relaxed text-navy-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <section className="rounded-2xl border border-navy-100 bg-mist p-8">
              <h2 className="text-h3 text-navy">Questions about these terms</h2>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-navy-600">
                Email{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-cyan-700 underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>{' '}
                or message{' '}
                <a
                  href={site.phoneHref}
                  className="font-medium text-cyan-700 underline-offset-4 hover:underline"
                >
                  {site.phoneDisplay}
                </a>
                .
              </p>
            </section>
          </div>
        </Container>
      </Section>

      <script {...jsonLdProps(graph(breadcrumbSchema(BREADCRUMB)))} />
    </>
  )
}
