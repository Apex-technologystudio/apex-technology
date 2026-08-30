import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { NarratedDemo } from '@/components/media/NarratedDemo'
import { ButtonAnchor } from '@/components/ui/Button'
import { whatsappLink, whatsappMessages } from '@/lib/site'
import { WhatsAppIcon } from '@/components/svg/Icons'
import { DASHBOARD_METRICS } from '@/content/pos'

export function Demo() {
  return (
    <Section tone="navy" id="demo" className="overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.06]" />

      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="Product walkthrough"
          title="See Apex POS in action"
          description="One minute of the real software, explained out loud — in English or Urdu. Billing a sale, adding stock, checking stock levels and reading your profit."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.65fr_1fr]">
          <Reveal>
            <NarratedDemo />
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
              <h3 className="text-h3 text-white">What you see when you open it</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {DASHBOARD_METRICS.map((metric) => (
                  <li key={metric} className="flex items-start gap-3 text-[0.95rem] text-navy-100">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan"
                    />
                    {metric}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-cyan/25 bg-cyan/10 p-7">
              <p className="text-[0.975rem] leading-relaxed text-navy-100">
                Want to see it with <strong className="font-semibold text-white">your own
                products</strong> in it? We will set it up on a screen share and answer
                anything you want to ask.
              </p>
              <ButtonAnchor
                href={whatsappLink(whatsappMessages.demo)}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                className="mt-5 w-full"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Book a Free Demo
              </ButtonAnchor>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
