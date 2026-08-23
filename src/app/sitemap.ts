import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { INDUSTRIES } from '@/content/industries'
import { SERVICES } from '@/content/services'
import { CITIES } from '@/content/cities'
import { COMPARISONS } from '@/content/comparisons'
import { getArticles } from '@/lib/blog'

/**
 * Sitemap.
 *
 * Routes are derived from the same content arrays that generate the pages, so
 * adding an industry or service cannot leave the sitemap stale.
 *
 * `lastModified` is stamped at build time. That is intentional — every static
 * page is genuinely regenerated on each deploy, and the alternative (a
 * hardcoded date) would go stale silently.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const url = (path: string) => new URL(path, site.url).toString()

  const core: MetadataRoute.Sitemap = [
    { url: url('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: url('/pos-system'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/pricing'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/gym-management'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/industries'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/blog'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: url('/services'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/about'), lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: url('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: url('/privacy'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: url('/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const industries: MetadataRoute.Sitemap = INDUSTRIES.map((industry) => ({
    url: url(`/industries/${industry.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const services: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: url(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const cities: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: url(`/pos-system/${city.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const comparisons: MetadataRoute.Sitemap = COMPARISONS.map((c) => ({
    url: url(`/compare/${c.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Articles carry their own dates, so lastModified is real here rather than
  // the build timestamp — which is what tells a crawler an old post changed.
  const articles: MetadataRoute.Sitemap = (await getArticles()).map((a) => ({
    url: url(`/blog/${a.slug}`),
    lastModified: new Date(a.updated ?? a.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...core, ...industries, ...services, ...cities, ...comparisons, ...articles]
}
