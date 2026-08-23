/**
 * Single source of truth for company identity, contact routes and navigation.
 *
 * Every phone number, email address and WhatsApp link on the site derives from
 * here. Nothing hardcodes a contact detail — one edit updates the whole site,
 * including the JSON-LD emitted for search engines.
 */

/** Digits only, country code first — the format wa.me requires. */
const WHATSAPP_DIGITS = '923357583554'

export const site = {
  name: 'APEX TECHNOLOGY',
  /** Used where all-caps would shout, e.g. mid-sentence in body copy. */
  nameCased: 'Apex Technology',
  tagline: 'Technology, elevated.',
  /** Site-wide fallback description. ~155 chars: price, differentiator, phone. */
  description:
    'Offline POS software for Pakistani shops — billing, inventory, udhaar and real profit. One-time PKR 30,000, no monthly fee. Free demo: 0335 7583554',

  /**
   * Set NEXT_PUBLIC_SITE_URL in the deployment environment. The fallback keeps
   * local builds working; canonical URLs and the sitemap both read from this,
   * so a wrong value here silently produces wrong SEO tags.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://apextechnology.pk',

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
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
} as const
