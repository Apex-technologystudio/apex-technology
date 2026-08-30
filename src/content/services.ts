import { CodeIcon, MobileIcon, GearIcon } from '@/components/svg/Icons'

/**
 * Studio services alongside the products.
 *
 * Copy is deliberately capability-led rather than portfolio-led: no client
 * names, project counts or case studies appear anywhere until APEX TECHNOLOGY
 * supplies real ones (see docs/PLAN.md §13).
 */
export type Service = {
  slug: string
  title: string
  navLabel: string
  icon: typeof CodeIcon
  metaTitle: string
  metaDescription: string
  summary: string
  intro: string
  deliverables: string[]
  process: Array<{ title: string; description: string }>
  keywords: string[]
}

const SHARED_PROCESS = [
  {
    title: 'Understand the work',
    description:
      'We start with how the business actually runs today — the steps, the paperwork and the parts people already work around.',
  },
  {
    title: 'Agree the scope and price',
    description:
      'You get a written scope, a fixed price and a timeline before anything is built. No open-ended hourly billing.',
  },
  {
    title: 'Build and review',
    description:
      'You see working software as it comes together, not at the end, so corrections happen while they are still cheap.',
  },
  {
    title: 'Deliver and support',
    description:
      'Installation, handover and training, then a support window so the team can settle in with someone to ask.',
  },
]

export const SERVICES: Service[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    navLabel: 'Web Development',
    icon: CodeIcon,
    metaTitle: 'Affordable Web Development in Pakistan — Fixed Price',
    metaDescription:
      'Business websites built in Pakistan on a fixed price agreed before we start. Working to a small budget? Tell us the number: 0335 7583554',
    summary: 'Business sites and web apps that load fast and get found.',
    intro:
      'A business website has two jobs: be found by people searching, and make it easy for them to get in touch. We build sites that do both, stay quick on a mobile connection, and cost what we said they would.',
    deliverables: [
      'Business and product websites',
      'Landing pages built around a search term',
      'Web applications and admin dashboards',
      'Search engine optimisation from the first line of markup',
      'Performance work — Core Web Vitals, image and video handling',
      'Content updates you can make yourself',
      'Small starter sites for a tight budget, built to grow later',
    ],
    process: SHARED_PROCESS,
    keywords: [
      'web development in low budget',
      'low budget website Pakistan',
      'affordable web development Pakistan',
      'affordable website design Pakistan',
      'cheap website design Pakistan',
      'web development company Pakistan',
      'website design Pakistan',
      'small business website Pakistan',
    ],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    navLabel: 'Mobile Apps',
    icon: MobileIcon,
    metaTitle: 'Mobile App Development in Pakistan — Android & iOS Apps',
    metaDescription:
      'Android and iOS apps built in Pakistan: customer ordering, delivery and field tools that connect to your existing systems. Get a quote: 0335 7583554',
    summary: 'Android and iOS apps for customers, staff and the field.',
    intro:
      'Apps earn their place when they do something the website cannot — work offline, use the camera, or sit in someone’s pocket all day. We build the ones that clear that bar.',
    deliverables: [
      'Android and iOS applications',
      'Customer-facing ordering and booking apps',
      'Delivery, field and staff tools',
      'Integration with systems you already run',
      'Play Store and App Store submission',
      'Post-launch updates and maintenance',
    ],
    process: SHARED_PROCESS,
    keywords: [
      'mobile app development Pakistan',
      'Android app development Pakistan',
      'iOS app development Pakistan',
    ],
  },
  {
    slug: 'custom-software',
    title: 'Custom Software',
    navLabel: 'Custom Software',
    icon: GearIcon,
    metaTitle: 'Custom Software Development Company in Pakistan',
    metaDescription:
      'Inventory, billing and management systems built around how your business already works — including offline Windows software. Get a quote: 0335 7583554',
    summary: 'Systems shaped around your business, not the other way round.',
    intro:
      'Off-the-shelf software asks you to change how you work. When the fit is wrong enough to cost real time, a system built around your process pays for itself.',
    deliverables: [
      'Inventory, billing and management systems',
      'Windows desktop applications that work offline',
      'Reporting and dashboard tools',
      'Migration from spreadsheets and paper records',
      'Integration between systems that do not talk to each other',
      'Installation, training and ongoing support',
    ],
    process: SHARED_PROCESS,
    keywords: [
      'custom software development Pakistan',
      'inventory software Pakistan',
      'business management software Pakistan',
    ],
  },
]

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug)
