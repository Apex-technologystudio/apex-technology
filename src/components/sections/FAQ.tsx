import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ChevronIcon } from '@/components/svg/Icons'
import type { Faq } from '@/content/faq'

/**
 * FAQ accordion.
 *
 * Built on native <details>/<summary> rather than a JS disclosure widget: it is
 * keyboard accessible and screen-reader correct for free, it works before
 * hydration, and — importantly for a page whose whole job is SEO — the answer
 * text is in the DOM whether or not the item is open.
 */
export function FAQ({
  faqs,
  title = 'Questions people ask before buying',
  description,
  eyebrow = 'FAQ',
}: {
  faqs: Faq[]
  title?: string
  description?: string
  eyebrow?: string
}) {
  return (
    <Section tone="white" id="faq">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mx-auto mt-14 max-w-3xl">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={Math.min(i * 0.03, 0.2)}>
              <details className="group border-b border-navy-100">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[1.05rem] font-semibold text-navy transition-colors group-hover:text-cyan-700">
                    {faq.question}
                  </h3>
                  <ChevronIcon className="mt-1 h-4 w-4 shrink-0 text-navy-400 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="pb-6 pr-10 text-[0.975rem] leading-relaxed text-navy-600">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
