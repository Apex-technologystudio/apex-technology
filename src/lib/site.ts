/**
 * Single source of truth for company identity, contact routes and navigation.
 *
 * Every phone number, email address and WhatsApp link on the site derives from
 * here. Nothing hardcodes a contact detail — one edit updates the whole site,
 * including the JSON-LD emitted for search engines.
 */

/** Digits only, country code first — the format wa.me requires. */
const WHATSAPP_DIGITS = '923357583554'

/** Vercel supplies these as bare hostnames, with no scheme. */
function vercelUrl(host?: string): string | undefined {
  return host ? `https://${host}` : undefined
}

/**
 * Strips a trailing slash and any accidental whitespace.
 *
 * `new URL(path, origin)` treats a trailing slash as significant, so
 * "https://x.pk/" and "https://x.pk" can produce different canonical strings
 * for the same page — enough to split ranking signals between two URLs.
 */
function normaliseOrigin(value: string): string {
  return value.trim().replace(/\/+$/, '')
}

export const site = {
  name: 'APEX TECHNOLOGY',
  /** Used where all-caps would shout, e.g. mid-sentence in body copy. */
  nameCased: 'Apex Technology',
  tagline: 'Technology, elevated.',
  /** Site-wide fallback description. ~155 chars: price, differentiator, phone. */
  description:
    'Offline POS software for Pakistani shops — billing, inventory, udhaar and real profit. One-time PKR 30,000, no monthly fee. Free demo: 0335 7583554',

  /**
   * Canonical origin. Canonicals, the sitemap, robots and every absolute URL
   * in the JSON-LD read from this, so a wrong value here silently points
   * search engines at the wrong site.
   *
   * Resolution order, most to least specific:
   *   1. NEXT_PUBLIC_SITE_URL      - set this to the real domain in production.
   *   2. Vercel's own production URL - injected automatically, so a forgotten
   *      env var still yields THIS deployment rather than a guess.
   *   3. The placeholder domain    - local builds only.
   *
   * Step 2 exists because of a real incident: NEXT_PUBLIC_SITE_URL was set to
   * a `.vercel.app` subdomain that turned out to belong to an unrelated
   * project. Every canonical then pointed at a stranger's site and Google
   * rejected all 17 sitemap URLs as "URL not allowed". Falling back to the
   * deployment's own hostname makes that failure mode impossible.
   */
  url: normaliseOrigin(
    process.env.NEXT_PUBLIC_SITE_URL ||
      vercelUrl(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) ||
      vercelUrl(process.env.NEXT_PUBLIC_VERCEL_URL) ||
      'https://apextechnology.pk',
  ),

  email: 'apextechnologies2125@gmail.com',
  phoneDisplay: '+92 335 7583554',
  phoneHref: 'tel:+923357583554',

  /** Cities named in copy and emitted as `areaServed` in LocalBusiness JSON-LD. */
  areaServed: [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Gujranwala',
    'Sialkot',
    'Quetta',
  ],

  country: 'Pakistan',
  currency: 'PKR',

  /**
   * Official social profiles.
   *
   * These are emitted as `sameAs` in the Organization JSON-LD, which is how a
   * search engine confirms that this website and those profiles are the same
   * business rather than three unrelated things with a similar name. That is
   * worth more than the footer icons.
   *
   * The Instagram URL is stored without its `?igsi=` parameter: that is a
   * share-attribution token from whoever copied the link, and publishing it
   * both looks untidy and gives two URLs for one profile.
   */
  socials: [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/people/Apex-Technologies/61593351534349/',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/apex_technologyy',
    },
  ],
} as const

/**
 * Builds a wa.me deep link with a prefilled message.
 *
 * wa.me needs the text percent-encoded; encodeURIComponent handles the Urdu
 * and punctuation that shows up in real enquiries.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_DIGITS}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Prefilled WhatsApp messages, kept together so their tone stays consistent. */
export const whatsappMessages = {
  general: `Assalam o Alaikum! I found ${site.name} online and I'd like to know more.`,
  pos: `Assalam o Alaikum! I'm interested in Apex POS for my shop. Please share the details and pricing.`,
  demo: `Assalam o Alaikum! I'd like to book a free demo of Apex POS.`,
  gym: `Assalam o Alaikum! I'm interested in Apex Gym management software. Please share the details.`,
  pricing: (tier: string) =>
    `Assalam o Alaikum! I'm interested in the Apex POS ${tier} package. Please share the details.`,
  industry: (industry: string) =>
    `Assalam o Alaikum! I run a ${industry} and I'd like to know how Apex POS can help.`,
} as const

export function mailtoLink(subject: string, body?: string): string {
  const params = new URLSearchParams({ subject, ...(body ? { body } : {}) })
  return `mailto:${site.email}?${params.toString()}`
}

export type NavLink = { href: string; label: string; description?: string }

/** Primary navigation. Children render as a dropdown on desktop. */
export const navigation: Array<NavLink & { children?: NavLink[] }> = [
  {
    href: '/pos-system',
    label: 'Apex POS',
    description: 'Offline billing, inventory and profit tracking',
  },
  {
    href: '/gym-management',
    label: 'Apex Gym',
    description: 'Members, attendance and dues',
  },
  {
    href: '/industries',
    label: 'Industries',
    children: [
      { href: '/industries/retail', label: 'Retail & Kiryana', description: 'General stores and mini marts' },
      { href: '/industries/restaurant', label: 'Restaurants & Cafes', description: 'Dine-in, takeaway and counters' },
      { href: '/industries/pharmacy', label: 'Pharmacies', description: 'Batch-aware medical stores' },
      { href: '/industries/supermarket', label: 'Supermarkets', description: 'Multi-counter, high-volume floors' },
    ],
  },
  {
    href: '/services',
    label: 'Services',
    children: [
      { href: '/services/web-development', label: 'Web Development', description: 'Business sites and web apps' },
      { href: '/services/mobile-app-development', label: 'Mobile Apps', description: 'Android and iOS' },
      { href: '/services/custom-software', label: 'Custom Software', description: 'Built around your workflow' },
    ],
  },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Guides' },
  { href: '/about', label: 'About' },
]

export const footerLinks = {
  products: [
    { href: '/pos-system', label: 'Apex POS' },
    { href: '/gym-management', label: 'Apex Gym' },
    { href: '/pricing', label: 'Pricing' },
  ],
  industries: [
    { href: '/industries', label: 'All Industries' },
    { href: '/industries/retail', label: 'Retail & Kiryana POS' },
    { href: '/industries/restaurant', label: 'Restaurant POS' },
    { href: '/industries/pharmacy', label: 'Pharmacy POS' },
    { href: '/industries/supermarket', label: 'Supermarket POS' },
  ],
  services: [
    { href: '/services/web-development', label: 'Web Development' },
    { href: '/services/mobile-app-development', label: 'Mobile App Development' },
    { href: '/services/custom-software', label: 'Custom Software' },
  ],
  guides: [
    { href: '/blog', label: 'All guides' },
    { href: '/compare/one-time-vs-monthly-pos-cost', label: 'One-time vs monthly' },
    { href: '/compare/offline-vs-cloud-pos', label: 'Offline vs cloud POS' },
  ],
  cities: [
    { href: '/pos-system/lahore', label: 'POS in Lahore' },
    { href: '/pos-system/karachi', label: 'POS in Karachi' },
    { href: '/pos-system/islamabad-rawalpindi', label: 'POS in Islamabad' },
    { href: '/pos-system/faisalabad', label: 'POS in Faisalabad' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
} as const
