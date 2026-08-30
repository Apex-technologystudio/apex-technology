import { site } from './site'

/**
 * JSON-LD builders.
 *
 * Everything Google reads about the business comes from here, so each field
 * must describe something that is actually true on the page it ships with.
 * Deliberately absent: aggregateRating and review. Those require real,
 * verifiable customer reviews — fabricating them is both a policy violation
 * and a manual-action risk, so no rating markup ships until real reviews exist.
 */

const absolute = (path: string) => new URL(path, site.url).toString()

export const ORGANIZATION_ID = `${site.url}/#organization`
export const WEBSITE_ID = `${site.url}/#website`

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: site.name,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      url: absolute('/brand/logo-primary.png'),
      width: 640,
      height: 156,
    },
    image: absolute('/brand/symbol-512.png'),
    description: site.description,
    slogan: site.tagline,
    // A stated price band helps Google qualify the business and pre-qualifies
    // the visitor before they ever click through.
    priceRange: 'PKR 30,000 - PKR 80,000',
    knowsLanguage: ['en', 'ur'],
    // Links this site to the same business's social profiles. Search engines
    // use it to consolidate an entity, so brand signals are not split across
    // separate unconnected properties.
    sameAs: site.socials.map((s) => s.url),
    email: site.email,
    telephone: site.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PK',
    },
    areaServed: site.areaServed.map((name) => ({
      '@type': 'City',
      name,
    })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: site.phoneDisplay,
        email: site.email,
        contactType: 'sales',
        areaServed: 'PK',
        availableLanguage: ['en', 'ur'],
      },
    ],
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: 'en-PK',
    publisher: { '@id': ORGANIZATION_ID },
  }
}

/**
 * Apex POS as a SoftwareApplication.
 *
 * `operatingSystem: Windows` is stated explicitly because the product is a
 * desktop .exe, not a web app — claiming otherwise would mislead buyers who
 * search specifically for offline software.
 */
export function posProductSchema({
  lowPrice,
  highPrice,
}: {
  lowPrice: number
  highPrice: number
}) {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${site.url}/pos-system/#software`,
    name: 'Apex POS',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Point of Sale Software',
    operatingSystem: 'Windows 10, Windows 11',
    url: absolute('/pos-system'),
    description:
      'Offline point of sale software for Pakistani retail shops, restaurants, pharmacies and supermarkets. Billing, inventory, udhaar tracking, expenses and profit reporting with no monthly fee.',
    inLanguage: 'en-PK',
    publisher: { '@id': ORGANIZATION_ID },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: site.currency,
      lowPrice,
      highPrice,
      offerCount: 3,
      availability: 'https://schema.org/InStock',
      seller: { '@id': ORGANIZATION_ID },
    },
    featureList: [
      'Barcode billing',
      'Inventory management',
      'Udhaar / customer credit tracking',
      'Expense tracking',
      'Profit and loss reporting',
      'JazzCash, EasyPaisa, bank transfer and card payments',
      'Split payments',
      'Thermal receipt printing',
      'Automatic local backup',
      'Admin and worker accounts',
    ],
  }
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  }
}

export function faqSchema(faqs: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

/**
 * VideoObject for the POS walkthrough. `uploadDate` is required by Google for
 * video rich results, so it is passed in rather than generated at render time
 * (a build-time `new Date()` would silently change on every deploy).
 */
export function videoSchema({
  name,
  description,
  thumbnail,
  contentUrl,
  uploadDate,
  duration,
}: {
  name: string
  description: string
  thumbnail: string
  contentUrl: string
  uploadDate: string
  duration: string
}) {
  return {
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: absolute(thumbnail),
    contentUrl: absolute(contentUrl),
    uploadDate,
    duration,
    publisher: { '@id': ORGANIZATION_ID },
  }
}

/** Wraps nodes in a single @graph so one script tag carries the whole page. */
export function graph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}

/**
 * Renders JSON-LD. Serialised with a `<` escape so a stray character in copy
 * can never break out of the script tag.
 */
export function jsonLdProps(data: object) {
  return {
    type: 'application/ld+json' as const,
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, '\\u003c'),
    },
  }
}
