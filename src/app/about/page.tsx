import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/sections/PageHero'
import { ContactCTA } from '@/components/sections/Grids'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { site } from '@/lib/site'
import { breadcrumbSchema, graph, jsonLdProps } from '@/lib/schema'

export const metadata: Metadata = pageMeta({
  title: 'About APEX TECHNOLOGY — Software House in Pakistan',
  description:
    'A Pakistani software studio building Apex POS, Apex Gym and custom business software — built here, for how shops here actually work. Talk to us: 0335 7583554',
  path: '/about',
  keywords: ['software house in Pakistan', 'software company Pakistan', 'APEX TECHNOLOGY'],
})

const BREADCRUMB = [{ name: 'About', path: '/about' }]

/** The four personality traits defined in the brand guidelines. */
const PRINCIPLES = [
  {
    title: 'Precise',
    description:
      'Structured, intentional and detail-aware. Software that handles money should be exact about it, and so should the people who build it.',
  },
  {
    title: 'Forward-looking',
    description:
      'Curious about what technology makes possible — without pushing a business into tools it does not need yet.',
  },
  {
    title: 'Dependable',
    description:
      'Calm, credible and consistent. A POS system that fails at 8pm on a Saturday is not a small problem, so ours is built to keep running.',
  },
  {
    title: 'Clear',
    description:
      'Technical expertise explained in language that makes sense to the person making the decision, not only to specialists.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        breadcrumb={BREADCRUMB}
        title="Technology, elevated."
        description={`${site.name} is a Pakistani software studio. We turn complicated business requirements into software that is clear to use and dependable to run — starting with the till.`}
      />

      <Section tone="white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-h2 text-navy">Why we built a POS first</h2>
              <div className="mt-6 flex flex-col gap-5 text-lg leading-relaxed text-navy-600">
                <p>
                  Most point of sale software sold in Pakistan is designed somewhere else. It
                  assumes constant internet, a card terminal on every counter, and customers who
                  never buy on credit. That is not how a kiryana store, a pharmacy or a mobile
                  shop here actually works.
                </p>
                <p>
                  So Apex POS runs on the shopkeeper&apos;s own computer, keeps working when the
                  connection drops, records udhaar as a first-class part of the system rather
                  than an afterthought, and handles JazzCash and EasyPaisa alongside cash. It is
                  sold once, not rented monthly, because a shop should own its own till.
                </p>
                <p>
                  Alongside the products we build websites, mobile apps and custom systems for
                  businesses that have outgrown spreadsheets — with a fixed scope and a fixed
                  price agreed before anything starts.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="Four things we hold ourselves to"
            description="These are the principles the studio is built on, and the standard we would like to be judged against."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 0.07}>
                <article className="h-full rounded-2xl border border-navy-100 bg-white p-8">
                  <h3 className="text-h3 text-navy">{principle.title}</h3>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-navy-600">
                    {principle.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-h2 text-navy">Where we work</h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-600">
              We are based in {site.country} and work with businesses nationwide — including{' '}
              {site.areaServed.slice(0, -1).join(', ')} and {site.areaServed.at(-1)}.
              Installation, training and support are all delivered remotely, so where your shop
              is does not change what you pay or how quickly we can help.
            </p>
          </div>
        </Container>
      </Section>

      <ContactCTA title="Work with us" />

      {/* Organization is emitted globally in the root layout; repeating it here
          would duplicate the same @id node on this page. */}
      <script {...jsonLdProps(graph(breadcrumbSchema(BREADCRUMB)))} />
    </>
  )
}
