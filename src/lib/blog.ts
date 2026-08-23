import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

/**
 * Blog loader.
 *
 * Articles are markdown files in `content/blog/`, read at build time. Markdown
 * rather than MDX deliberately: MDX needs bundler configuration that can drift
 * with Turbopack, and nothing here needs to execute JSX. Plain markdown also
 * means an article can be written and reviewed by someone who does not code.
 *
 * Every route that uses these is statically generated, so this filesystem
 * access happens during `next build` and never on a request.
 */
export type Article = {
  slug: string
  title: string
  /** <title> and OG title — may differ from the on-page H1. */
  metaTitle: string
  description: string
  /** ISO date. Fixed in frontmatter, never generated, so it stays stable. */
  date: string
  updated?: string
  readingMinutes: number
  keywords: string[]
  /** One-sentence answer to the article's question, for the summary block. */
  answer: string
  related: string[]
  body: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

/** ~200 wpm, rounded up — a hint, not a promise. */
function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function parse(slug: string, raw: string): Article {
  const { data, content } = matter(raw)

  for (const field of ['title', 'description', 'date', 'answer'] as const) {
    if (!data[field]) {
      throw new Error(`content/blog/${slug}.md is missing required frontmatter: ${field}`)
    }
  }

  return {
    slug,
    title: data.title,
    metaTitle: data.metaTitle ?? data.title,
    description: data.description,
    date: data.date,
    updated: data.updated,
    readingMinutes: readingTime(content),
    keywords: data.keywords ?? [],
    answer: data.answer,
    related: data.related ?? [],
    body: content,
  }
}

export async function getArticles(): Promise<Article[]> {
  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith('.md'))

  const articles = await Promise.all(
    files.map(async (file) => {
      const slug = path.basename(file, '.md')
      return parse(slug, await readFile(path.join(BLOG_DIR, file), 'utf8'))
    }),
  )

  // Newest first. Dates come from frontmatter so ordering is deterministic
  // across builds rather than dependent on filesystem order.
  return articles.sort((a, b) => b.date.localeCompare(a.date))
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  return (await getArticles()).find((a) => a.slug === slug)
}

/**
 * Related articles for the footer of a post.
 *
 * Honours explicit `related` slugs from frontmatter first, then fills any
 * remaining slots with the most recent other articles — so a new post is never
 * left with a dead-end and no onward links.
 */
export async function getRelated(article: Article, limit = 3): Promise<Article[]> {
  const all = await getArticles()
  const picked = article.related
    .map((slug) => all.find((a) => a.slug === slug))
    .filter((a): a is Article => Boolean(a))

  const filler = all.filter(
    (a) => a.slug !== article.slug && !picked.some((p) => p.slug === a.slug),
  )

  return [...picked, ...filler].slice(0, limit)
}
