import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/sections/PageHero'
import { ContactCTA } from '@/components/sections/Grids'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ArrowRightIcon } from '@/components/svg/Icons'
import { getArticles } from '@/lib/blog'
import { site } from '@/lib/site'
import { breadcrumbSchema, graph, jsonLdProps } from '@/lib/schema'

export const metadata: Metadata = pageMeta({
  title: 'POS & Business Software Guides for Pakistani Shops',
  description:
    'Plain-language guides on POS pricing, udhaar, offline software and shop hardware in Pakistan — written for shopkeepers, not for search engines.',
  path: '/blog',
  keywords: [
    'POS guides Pakistan',
    'POS system price in Pakistan',
    'kiryana store software',
    'udhaar management software',
  ],
})

const BREADCRUMB = [{ name: 'Guides', path: '/blog' }]

/** Formatted on the server with a fixed locale so it cannot differ per visitor. */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogIndexPage() {
  const articles = await getArticles()

  return (
    <>
      <PageHero
        eyebrow="Guides"
        breadcrumb={BREADCRUMB}
        title="Straight answers about shop software"
        description="What things cost, what actually matters when choosing, and what vendors leave out of a quote. Written for people running a counter, not for search engines."
      />

      <Section tone="white">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {articles.map((article, i) => (
              <Reveal key={article.slug} delay={Math.min(i * 0.05, 0.2)}>
                <article>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group flex flex-col rounded-2xl border border-navy-100 p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40 hover:shadow-xl"
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.12em] text-navy-400">
                      <time dateTime={article.date}>{formatDate(article.date)}</time>
                      <span aria-hidden="true">·</span>
                      <span>{article.readingMinutes} min read</span>
                    </div>

                    <h2 className="mt-3 text-h3 text-navy transition-colors group-hover:text-cyan-700">
                      {article.title}
                    </h2>
                    <p className="mt-3 text-[0.975rem] leading-relaxed text-navy-600">
                      {article.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700">
                      Read the guide
                      <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <ContactCTA title="Still not sure what fits your shop?" />

      <script
        {...jsonLdProps(
          graph(
            {
              '@type': 'Blog',
              '@id': `${site.url}/blog/#blog`,
              name: `${site.name} guides`,
              description:
                'Guides on POS software, pricing, udhaar and shop hardware for businesses in Pakistan.',
              url: new URL('/blog', site.url).toString(),
              inLanguage: 'en-PK',
              publisher: { '@id': `${site.url}/#organization` },
              blogPost: articles.map((a) => ({
                '@type': 'BlogPosting',
                headline: a.title,
                description: a.description,
                datePublished: a.date,
                dateModified: a.updated ?? a.date,
                url: new URL(`/blog/${a.slug}`, site.url).toString(),
              })),
            },
            breadcrumbSchema(BREADCRUMB),
          ),
        )}
      />
    </>
  )
}
