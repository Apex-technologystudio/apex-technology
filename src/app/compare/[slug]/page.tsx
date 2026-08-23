import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/sections/PageHero'
import { FAQ } from '@/components/sections/FAQ'
import { ContactCTA } from '@/components/sections/Grids'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CheckIcon } from '@/components/svg/Icons'
import { COMPARISONS, comparisonBySlug } from '@/content/comparisons'
import { pageMeta } from '@/lib/seo'
import { breadcrumbSchema, faqSchema, graph, jsonLdProps } from '@/lib/schema'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const c = comparisonBySlug(slug)
  if (!c) return {}
  return pageMeta({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/compare/${c.slug}`,
    keywords: c.keywords,
  })
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const c = comparisonBySlug(slug)
  if (!c) notFound()

  const breadcrumb = [{ name: c.title, path: `/compare/${c.slug}` }]

  return (
    <>
      <PageHero eyebrow={c.eyebrow} breadcrumb={breadcrumb} title={c.title} description={c.intro} />

      <Section tone="white">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-4xl overflow-x-auto rounded-2xl border border-navy-100">
              <table className="w-full min-w-[38rem] border-collapse text-left">
                <caption className="sr-only">
                  {c.optionA} compared with {c.optionB}, criterion by criterion.
                </caption>
                <thead>
                  <tr className="bg-mist/70">
                    <th scope="col" className="p-5 text-sm font-semibold text-navy">
                      Criterion
                    </th>
                    <th scope="col" className="p-5 text-sm font-semibold text-navy">
                      {c.optionA}
                    </th>
                    <th scope="col" className="p-5 text-sm font-semibold text-cyan-700">
                      {c.optionB}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map((row) => (
                    <tr key={row.criterion} className="border-t border-navy-100">
                      <th scope="row" className="p-5 text-sm font-semibold text-navy">
                        {row.criterion}
                      </th>
                      {/*
                        The winning cell is highlighted per row, including rows
                        the other option wins. A table where one column takes
                        every point reads as advertising and gets discounted.
                      */}
                      <td
                        className={cn(
                          'p-5 text-[0.95rem]',
                          row.winner === 'a'
                            ? 'font-semibold text-navy'
                            : 'text-navy-500',
                        )}
                      >
                        {row.winner === 'a' && (
                          <CheckIcon className="mr-1.5 inline h-4 w-4 text-cyan-600" />
                        )}
                        {row.a}
                      </td>
                      <td
                        className={cn(
                          'p-5 text-[0.95rem]',
                          row.winner === 'b'
                            ? 'font-semibold text-navy'
                            : 'text-navy-500',
                        )}
                      >
                        {row.winner === 'b' && (
                          <CheckIcon className="mr-1.5 inline h-4 w-4 text-cyan-600" />
                        )}
                        {row.b}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
            <Reveal>
              <SectionHeading align="left" eyebrow="Verdict" title={c.verdictTitle} />
              <div className="mt-6 flex flex-col gap-4">
                {c.verdict.map((p) => (
                  <p key={p.slice(0, 40)} className="text-[1.02rem] leading-relaxed text-navy-700">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-navy-200 bg-white p-8">
                <h2 className="text-h3 text-navy">{c.chooseOther.title}</h2>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {c.chooseOther.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-300"
                      />
                      <span className="text-[0.95rem] leading-relaxed text-navy-600">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FAQ faqs={c.faqs} title="Questions about this choice" eyebrow="FAQ" />
      <ContactCTA title="Tell us your situation and we'll say which fits" />

      <script {...jsonLdProps(graph(faqSchema(c.faqs), breadcrumbSchema(breadcrumb)))} />
    </>
  )
}
