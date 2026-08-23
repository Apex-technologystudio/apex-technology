import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Container, Section } from '@/components/ui/Section'
import { site } from '@/lib/site'
import { breadcrumbSchema, graph, jsonLdProps } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.name} handles the information you send us through this website.`,
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

const BREADCRUMB = [{ name: 'Privacy Policy', path: '/privacy' }]

/**
 * NOTE FOR MAINTAINERS: this policy describes the site as actually built — no
 * server-side form handling, no cookies, no advertising trackers, and exactly
 * one measurement tool: Vercel Speed Insights (see "Page speed measurement").
 * If another script, pixel, or a server-side contact endpoint is ever added,
 * this page must be updated in the SAME change. An inaccurate privacy policy is
 * worse than none.
 */
const SECTIONS = [
  {
    title: 'The short version',
    body: [
      `This website sets no cookies and runs no advertising or cross-site trackers. It has no server that stores what you type: contact forms open WhatsApp or your email app with a message already written, and nothing reaches us until you press send in that app.`,
      `We do measure page speed — how quickly pages load and respond — so we can keep the site fast on mobile connections. That measurement is described below and does not identify you.`,
    ],
  },
  {
    title: 'Information you send us',
    body: [
      `When you contact us by WhatsApp, phone or email, we receive whatever you choose to share — typically your name, business name, phone number and what you are looking for. We use it only to answer you, prepare a quote, and provide support if you become a customer.`,
      `We do not sell, rent or share your contact details with anyone for marketing.`,
    ],
  },
  {
    title: 'The contact form',
    body: [
      `The enquiry form on this site runs entirely in your browser. When you submit it, it assembles your answers into a message and opens WhatsApp (or your email app) with that message prefilled. The details are not transmitted to this website or stored on any server we control.`,
      `Once you send that message, it is handled by WhatsApp or your email provider under their own privacy terms.`,
    ],
  },
  {
    title: 'Page speed measurement',
    body: [
      `We use Vercel Speed Insights to record how this site performs for real visitors — how long a page takes to show its main content, how quickly it responds to a tap, and whether the layout shifts while loading.`,
      `It sets no cookies and does not create an identifier for you or follow you across other websites. What is recorded is the page address, a performance timing, and coarse technical context such as browser, device type, connection speed and country. That is not enough to identify a person, and we cannot use it to.`,
      `We look at it for one reason: most of our visitors arrive on mobile data, and a page that is slow for them is a page that fails them. If you would rather not be measured, a browser with tracking protection or an ad blocker will stop it, and the site works exactly the same without it.`,
    ],
  },
  {
    title: 'Hosting and server logs',
    body: [
      `This site is served by a hosting provider that may keep standard technical logs, such as IP addresses and request times, for security and reliability. We do not use those logs to identify or profile visitors.`,
    ],
  },
  {
    title: 'Data inside Apex POS',
    body: [
      `Apex POS is installed on your own computer. Your sales, stock, customer and financial records stay on that machine and in the backup folder you choose. We do not have access to your business data, and the software does not send it to us.`,
      `If you ask us for support and we connect remotely to help, we only see what is on screen during that session, at your invitation.`,
    ],
  },
  {
    title: 'Keeping your information',
    body: [
      `We keep enquiry conversations for as long as needed to answer you and to support you as a customer. You can ask us at any time to delete your contact details and we will do so, except where we are required to keep records for tax or legal reasons.`,
    ],
  },
  {
    title: 'Your choices',
    body: [
      `You can ask us what contact information we hold about you, ask us to correct it, or ask us to delete it. Write to ${site.email} or message ${site.phoneDisplay} and we will action it.`,
    ],
  },
  {
    title: 'Changes to this policy',
    body: [
      `If we change how this site or our business handles information, we will update this page. Material changes will be reflected here before they take effect.`,
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        breadcrumb={BREADCRUMB}
        title="Privacy Policy"
        description="What happens to the information you send us — written plainly, and describing this website exactly as it is built."
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
              <h2 className="text-h3 text-navy">Contact us about privacy</h2>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-navy-600">
                Questions about this policy? Email{' '}
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
