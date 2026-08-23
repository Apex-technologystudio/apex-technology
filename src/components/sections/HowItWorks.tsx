import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { POS_FLOW } from '@/content/pos'

/**
 * The four steps of a sale, connected by an animated SVG rail.
 *
 * The rail is a real SVG rather than a border so a cyan pulse can travel it,
 * reinforcing that these steps are one continuous flow. It is hidden below lg
 * where the cards stack vertically and a horizontal rail would be meaningless.
 */
function FlowRail() {
  return (
    <svg
      viewBox="0 0 1200 8"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute left-0 right-0 top-9 hidden h-2 w-full lg:block"
    >
      <line
        x1="0" y1="4" x2="1200" y2="4"
        stroke="var(--color-navy-200)"
        strokeWidth={2}
        strokeDasharray="6 8"
      />
      <line
        x1="0" y1="4" x2="1200" y2="4"
        stroke="var(--color-cyan)"
        strokeWidth={3}
        strokeLinecap="round"
        pathLength={1000}
        strokeDasharray="90 910"
        className="animate-[apex-draw_6s_linear_infinite]"
        style={{ ['--dash' as string]: '1000' }}
      />
    </svg>
  )
}

export function HowItWorks() {
  return (
    <Section tone="mist">
      <Container>
        <SectionHeading
          eyebrow="How a sale works"
          title="Scan, bill, print — and it has already updated everything"
          description="No separate stock register, no end-of-day reconciliation ritual. One pass at the counter keeps inventory, profit and your backup current."
        />

        <div className="relative mt-16">
          <FlowRail />
          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {POS_FLOW.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.1}>
                <li className="relative flex flex-col items-start">
                  <span className="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-navy-200 bg-white text-xl font-extrabold text-navy shadow-sm">
                    {item.step}
                    <span
                      aria-hidden="true"
                      className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-cyan animate-[apex-pulse-node_3s_ease-in-out_infinite]"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                  </span>
                  <h3 className="mt-6 text-h3 text-navy">{item.title}</h3>
                  <p className="mt-2 text-[0.975rem] leading-relaxed text-navy-600">
                    {item.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
