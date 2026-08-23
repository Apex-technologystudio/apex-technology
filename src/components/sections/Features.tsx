import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { POS_FEATURES } from '@/content/pos'

export function Features() {
  return (
    <Section tone="white" id="features">
      <Container>
        <SectionHeading
          eyebrow="What Apex POS does"
          title="Everything the counter needs, and nothing it doesn't"
          description="Nine things your shop deals with every day, handled on one screen — built from how Pakistani shops actually run, not translated from someone else's market."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:grid-cols-3">
          {POS_FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.04} className="bg-white">
              {/*
                `group` is the hover hook the feature icons animate from — see
                the group-hover rules in components/svg/Icons.tsx.
              */}
              <article className="group h-full p-8 transition-colors duration-300 hover:bg-mist">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-cyan">
                  <feature.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-h3 text-navy">{feature.title}</h3>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-navy-600">
                  {feature.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
