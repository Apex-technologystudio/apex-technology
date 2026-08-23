import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/sections/PageHero'
import { ContactCTA } from '@/components/sections/Grids'
import { Container, Section } from '@/components/ui/Section'
import { Markdown } from '@/components/ui/Markdown'
import { Reveal } from '@/components/ui/Reveal'
import { ArrowRightIcon } from '@/components/svg/Icons'
import { getArticle, getArticles, getRelated } from '@/lib/blog'
import { pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'
import { breadcrumbSchema, graph, jsonLdProps } from '@/lib/schema'

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return {}

  const meta = pageMeta({
    title: article.metaTitle,
    description: article.description,
    path: `/blog/${article.slug}`,
    keywords: article.keywords,
  })

  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
    },
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const related = await getRelated(article)
  const breadcrumb = [
    { name: 'Guides', path: '/blog' },
    { name: article.title, path: `/blog/${article.slug}` },
  ]

  return (
    <>
      <PageHero eyebrow="Guide" breadcrumb={breadcrumb} title={article.title}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-navy-300">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingMinutes} min read</span>
        </div>
      </PageHero>

      <Section tone="white">
        <Container>
          <article className="mx-auto max-w-3xl">
            {/*
              The short answer, stated before the article body.
              Two reasons: a reader who only wants the answer gets it without
              scrolling, and answer engines quote a direct, self-contained
              statement far more readily than a paragraph that needs context.
            */}
            <div className="rounded-2xl border border-cyan/25 bg-cyan-50 p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
                Short answer
              </h2>
              <p className="mt-3 text-[1.05rem] font-medium leading-relaxed text-navy">
                {article.answer}
              </p>
            </div>

            <div className="mt-12">
              <Markdown>{article.body}</Markdown>
            </div>
          </article>

          {related.length > 0 && (
            <div className="mx-auto mt-16 max-w-3xl border-t border-navy-100 pt-10">
              <h2 className="text-h3 text-navy">Read next</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {related.map((r) => (
                  <Reveal key={r.slug}>
                    <li>
                      <Link
                        href={`/blog/${r.slug}`}
                        className="group flex items-start justify-between gap-6 rounded-xl border border-navy-100 p-5 transition-colors hover:border-cyan/40 hover:bg-mist"
                      >
                        <span>
                          <span className="block font-semibold text-navy transition-colors group-hover:text-cyan-700">
                            {r.title}
                          </span>
                          <span className="mt-1 block text-sm text-navy-500">
                            {r.description}
                          </span>
                        </span>
                        <ArrowRightIcon className="mt-1 h-4 w-4 shrink-0 text-cyan transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      <ContactCTA title="Want this walked through for your shop?" />

      <script
        {...jsonLdProps(
          graph(
            {
              '@type': 'BlogPosting',
              '@id': `${site.url}/blog/${article.slug}/#article`,
              headline: article.title,
              description: article.description,
              // Google requires both; dateModified falls back to publication
              // rather than being generated, so it never drifts per build.
              datePublished: article.date,
              dateModified: article.updated ?? article.date,
              inLanguage: 'en-PK',
              mainEntityOfPage: new URL(`/blog/${article.slug}`, site.url).toString(),
              author: { '@id': `${site.url}/#organization` },
              publisher: { '@id': `${site.url}/#organization` },
              keywords: article.keywords.join(', '),
              wordCount: article.body.trim().split(/\s+/).length,
            },
            breadcrumbSchema(breadcrumb),
          ),
        )}
      />
    </>
  )
}
