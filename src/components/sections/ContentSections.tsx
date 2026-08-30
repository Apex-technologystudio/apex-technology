import Link from 'next/link'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button'
import { PhoneFrame } from '@/components/media/Players'
import {
  ArrowRightIcon,
  CheckIcon,
  GymIcon,
  WhatsAppIcon,
  CodeIcon,
  MobileIcon,
  GearIcon,
} from '@/components/svg/Icons'
import {
  BUILT_FOR_PAKISTAN,
  BUSINESS_TYPES,
  SHOP_PROBLEMS,
} from '@/content/pos'
import { whatsappLink, whatsappMessages } from '@/lib/site'

/**
 * Content sections added in the structure upgrade.
 *
 * Every one is built from the existing design system — Section, SectionHeading,
 * Reveal, and the same card and grid patterns already used by Features and
 * IndustriesGrid. No new colours, spacing scale, shadows or components were
 * introduced; this is a content and ordering change, not a redesign.
 */

/**
 * The problem, stated before the solution.
 *
 * Sits directly after the hero because a visitor who recognises their own shop
 * here reads everything below it differently. Paired with the paper-khata clip,
 * which shows the problem rather than describing it.
 */
export function Problems() {
  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow="The daily reality"
          title="Running a shop should not be this hard"
          description="These are the things shopkeepers tell us take the most time and cost the most money."
        />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1fr_0.42fr]">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-navy-100 bg-navy-100 sm:grid-cols-2">
            {SHOP_PROBLEMS.map((item, i) => (
              <Reveal key={item.problem} delay={Math.min(i * 0.05, 0.2)} className="bg-white">
                <article className="h-full p-7">
                  <h3 className="text-[1.05rem] font-semibold text-navy">{item.problem}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-navy-600">
                    {item.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal direction="left" className="mx-auto w-full max-w-[260px] lg:mx-0">
            <PhoneFrame
              src="/media/clip-03.mp4"
              poster="/media/clip-03-poster.webp"
              alt="A shopkeeper writing in a paper khata register"
            />
          </Reveal>
        </div>

        <Reveal>
          <p className="mx-auto mt-12 max-w-2xl text-center text-lg leading-relaxed text-navy-700">
            Apex POS handles all six on one screen — and it keeps working when the
            internet does not.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

/**
 * Why this product suits this market.
 *
 * Each point pairs a real local condition with a real capability. "We
 * understand Pakistani business" is a sentence any vendor can type; naming
 * load-shedding, udhaar, JazzCash and per-kilo selling is not.
 */
export function BuiltForPakistan() {
  return (
    <Section tone="navy" className="overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.05]" />

      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="Made in Pakistan"
          title="Built for how shops here actually work"
          description="Most POS software is designed for another market and translated. Apex was built for this one."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BUILT_FOR_PAKISTAN.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i * 0.05, 0.2)}>
              <article className="group h-full rounded-2xl border border-white/10 bg-white/5 p-7 transition-colors duration-300 hover:border-cyan/40 hover:bg-white/10">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[1.05rem] font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-navy-200">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/** Who Apex POS is for — answers "is this suitable for my business?" directly. */
export function BusinessTypes() {
  return (
    <Section tone="white" id="business-types">
      <Container>
        <SectionHeading
          eyebrow="Who uses Apex POS"
          title="Made for your kind of business"
          description="Same software, set up for what you sell. If your business is not listed, ask us — it probably still fits."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_TYPES.map((type, i) => (
            <Reveal key={type.name} delay={Math.min(i * 0.04, 0.24)}>
              <Link
                href={type.href}
                className="group flex h-full items-start gap-4 rounded-2xl border border-navy-100 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40 hover:shadow-lg"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-cyan">
                  <type.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold text-navy transition-colors group-hover:text-cyan-700">
                    {type.name}
                  </span>
                  <span className="mt-1 block text-[0.9rem] leading-relaxed text-navy-600">
                    {type.note}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/**
 * Reasons to trust Apex.
 *
 * TESTIMONIALS is deliberately empty. Fabricated reviews, client logos and
 * "500+ happy customers" counters are the normal filler here, and they are both
 * dishonest and detectable — Google issues manual actions for fake review
 * markup. The quote block below renders only when real, attributable
 * testimonials are added to the array, so the section is complete without them
 * and improves the moment there is something true to show.
 *
 * To add one: push { quote, name, business, city } and it appears automatically.
 * Use only customers who have agreed to be named.
 */
type Testimonial = { quote: string; name: string; business: string; city: string }
export const TESTIMONIALS: Testimonial[] = []

const TRUST_POINTS = [
  {
    title: 'See it before you pay',
    detail:
      'We show you the full software on a screen share, with your own kind of products in it. The demo is free and there is no obligation.',
  },
  {
    title: 'A clear price, published',
    detail:
      'Our packages and what each includes are on the pricing page. No hidden setup charges, and no pressure to decide today.',
  },
  {
    title: 'Installation and training included',
    detail:
      'We install the software, load your product list and train your staff. The first year of support is part of the price.',
  },
  {
    title: 'You keep working if you leave',
    detail:
      'The licence is yours permanently. If you stop renewing support, the software carries on working and your data stays on your computer.',
  },
]

export function TrustProof() {
  return (
    <Section tone="mist">
      <Container>
        <SectionHeading
          eyebrow="Why Apex"
          title="Reasons to trust us before you spend anything"
          description="We would rather you check these than take our word for them."
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
          {TRUST_POINTS.map((point, i) => (
            <Reveal key={point.title} delay={Math.min(i * 0.06, 0.2)}>
              <article className="flex h-full items-start gap-4 rounded-2xl border border-navy-100 p-7">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
                <div>
                  <h3 className="font-semibold text-navy">{point.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-navy-600">
                    {point.detail}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {TESTIMONIALS.length > 0 && (
          <div className="mx-auto mt-14 max-w-4xl">
            <h3 className="text-center text-h3 text-navy">What shop owners say</h3>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {TESTIMONIALS.map((t) => (
                <Reveal key={t.name}>
                  <figure className="h-full rounded-2xl border border-navy-100 bg-mist p-7">
                    <blockquote className="text-[1.02rem] leading-relaxed text-navy-700">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-5 border-t border-navy-200 pt-4 text-sm">
                      <span className="block font-semibold text-navy">{t.name}</span>
                      <span className="block text-navy-500">
                        {t.business}, {t.city}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  )
}

/**
 * Apex Gym and the studio services, combined.
 *
 * Previously two full sections on the home page, which pushed the POS story
 * further from the pricing and diluted it. The information is kept — it is
 * true and useful — but compressed into one block near the end, where someone
 * still reading is the audience for it.
 */
const OTHER_OFFERINGS = [
  {
    icon: GymIcon,
    title: 'Apex Gym',
    description: 'Members, attendance and dues for gyms. Same idea — runs on your own PC, no monthly fee.',
    href: '/gym-management',
    cta: 'See Apex Gym',
  },
  {
    icon: CodeIcon,
    title: 'Websites',
    description: 'Business websites and landing pages built to load fast and be found on Google.',
    href: '/services/web-development',
    cta: 'See web development',
  },
  {
    icon: MobileIcon,
    title: 'Mobile apps',
    description: 'Android and iOS apps for customers, delivery staff and field teams.',
    href: '/services/mobile-app-development',
    cta: 'See app development',
  },
  {
    icon: GearIcon,
    title: 'Custom software',
    description: 'Inventory, billing and management systems built around how your business already works.',
    href: '/services/custom-software',
    cta: 'See custom software',
  },
]

export function AlsoFromApex() {
  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow="Also from Apex"
          title="We build more than POS"
          description="APEX TECHNOLOGY is a software studio. Apex POS is what we sell most — it is not all we do."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OTHER_OFFERINGS.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i * 0.06, 0.2)}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-xl"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-cyan">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-navy-600">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700">
                  {item.cta}
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/** Compact demo prompt used between long sections. */
export function DemoNudge({
  title = 'Not sure if it fits your shop?',
  body = 'Send us a message and we will show you the software with your own kind of products in it. Free, and no obligation.',
}: {
  title?: string
  body?: string
}) {
  return (
    <Section tone="mist" className="py-14 md:py-16">
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-2xl border border-navy-100 bg-white p-8 text-center sm:flex-row sm:text-left">
            <div className="flex-1">
              <h2 className="text-h3 text-navy">{title}</h2>
              <p className="mt-2 text-[0.975rem] leading-relaxed text-navy-600">{body}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <ButtonAnchor
                href={whatsappLink(whatsappMessages.demo)}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="lg"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Book a Free Demo
              </ButtonAnchor>
              <ButtonLink href="/pricing" variant="ghost" size="lg">
                View Pricing
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
