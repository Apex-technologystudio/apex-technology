import type { Metadata } from 'next'
import { KEYWORDS, pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/sections/PageHero'
import { ContactCTA } from '@/components/sections/Grids'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { AmbientClip } from '@/components/media/Players'
import { ButtonAnchor } from '@/components/ui/Button'
import {
  BackupIcon,
  GymIcon,
  OfflineIcon,
  ProfitIcon,
  RolesIcon,
  UdhaarIcon,
  WhatsAppIcon,
} from '@/components/svg/Icons'
import { site, whatsappLink, whatsappMessages } from '@/lib/site'
import { breadcrumbSchema, graph, jsonLdProps } from '@/lib/schema'

export const metadata: Metadata = pageMeta({
  title: 'Gym Management Software Pakistan — Members, Attendance, Dues',
  description:
    'Gym software for Pakistan: member records, daily attendance and dues tracking. Runs on your own PC, no monthly fee. Free demo on WhatsApp: 0335 7583554',
  path: '/gym-management',
  keywords: [...KEYWORDS.gym],
})

const BREADCRUMB = [{ name: 'Apex Gym', path: '/gym-management' }]

/**
 * Conservative copy by design. Only the capabilities visible in the supplied
 * footage — members, attendance, dues, reporting — are described. Anything
 * further is offered as a conversation rather than claimed as a feature
 * (see docs/PLAN.md §13).
 */
const CAPABILITIES = [
  {
    icon: GymIcon,
    title: 'Member records',
    description:
      'Every member in one place with their plan and current status, so you know at a glance who is active and who has lapsed.',
  },
  {
    icon: RolesIcon,
    title: 'Attendance marking',
    description:
      'Mark attendance as members arrive and keep the daily history, so you can see who actually trains and how busy each day gets.',
  },
  {
    icon: UdhaarIcon,
    title: 'Dues tracking',
    description:
      'See who has paid and who has not, with outstanding amounts in one list — so nobody quietly trains for free for three months.',
  },
  {
    icon: ProfitIcon,
    title: 'Daily and monthly numbers',
    description:
      'Collections, attendance and membership counts summarised so the month closes on figures rather than guesswork.',
  },
  {
    icon: OfflineIcon,
    title: 'Runs on your own PC',
    description:
      'Installed locally like Apex POS, so the front desk keeps working through load-shedding and internet outages.',
  },
  {
    icon: BackupIcon,
    title: 'Automatic backup',
    description:
      'Your member and payment records copy themselves to a folder you choose, so a failed hard disk is not the end of your business.',
  },
]

export default function GymManagementPage() {
  return (
    <>
      <PageHero
        eyebrow="Apex Gym"
        breadcrumb={BREADCRUMB}
        title="Gym management software for Pakistani gyms"
        description="Members, attendance and dues in one place — installed on your own computer, with no monthly fee. The same approach as Apex POS, built for the front desk instead of the counter."
      >
        <ButtonAnchor
          href={whatsappLink(whatsappMessages.gym)}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="lg"
          shine
        >
          <WhatsAppIcon className="h-5 w-5" />
          Ask about Apex Gym
        </ButtonAnchor>
      </PageHero>

      <Section tone="white">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="What it handles"
                title="The three things that actually leak money"
                description="Gyms rarely fail on training. They fail on lapsed memberships nobody chased, attendance nobody recorded, and dues nobody tracked."
              />
            </Reveal>
            <Reveal direction="left" className="w-full lg:ml-auto">
              <figure className="relative aspect-video w-full overflow-hidden rounded-2xl border border-navy-100 shadow-[0_28px_70px_-30px_rgba(7,26,46,0.55)]">
                <AmbientClip
                  src="/media/story-gym.mp4"
                  poster="/media/story-gym-poster.webp"
                  alt="A gym owner moving from a paper attendance register to member and attendance dashboards"
                />
              </figure>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05} className="bg-white">
                <article className="group h-full p-8 transition-colors duration-300 hover:bg-mist">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-cyan">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-h3 text-navy">{item.title}</h3>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-navy-600">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-[0.95rem] leading-relaxed text-navy-500">
            Apex Gym is set up per gym, so pricing depends on your size and what you need
            configured. Message us on WhatsApp and we will walk you through it and quote you
            directly.
          </p>
        </Container>
      </Section>

      <ContactCTA
        title="Show me Apex Gym"
        description={`Send a message to ${site.phoneDisplay} and we will demo the software, answer your questions and give you a price for your gym.`}
        message={whatsappMessages.gym}
      />

      <script {...jsonLdProps(graph(breadcrumbSchema(BREADCRUMB)))} />
    </>
  )
}
