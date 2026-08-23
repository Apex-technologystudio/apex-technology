import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { PhoneFrame } from '@/components/media/Players'
import { ButtonLink } from '@/components/ui/Button'
import { ArrowRightIcon } from '@/components/svg/Icons'

const SHIFTS = [
  {
    before: 'Balances live in a register only you can read',
    after: 'Every customer balance on one screen, with the total owed',
  },
  {
    before: 'Profit is a feeling at the end of the month',
    after: 'Net profit after rent, salaries and bills — today',
  },
  {
    before: 'Stock is checked by walking the shelves',
    after: 'Low stock and out of stock counted automatically',
  },
  {
    before: 'One spilled cup of tea and the record is gone',
    after: 'Backed up to your folder every two hours',
  },
]

export function KhataStory() {
  return (
    <Section tone="white" className="overflow-hidden">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal direction="right" className="mx-auto w-full max-w-[300px] lg:mx-0">
            <PhoneFrame
              src="/media/clip-03.mp4"
              poster="/media/clip-03-poster.webp"
              alt="A shopkeeper working through a handwritten paper ledger"
            />
          </Reveal>

          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-700">
              <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
              From khata to software
            </span>
            <h2 className="mt-4 text-h2 text-navy">
              The register works — until you need an answer from it
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-600">
              A paper khata is fast to write and slow to ask questions of. Apex POS keeps the
              same habits at the counter and simply makes the answers available: who owes you,
              what sold, what it actually earned.
            </p>

            <ul className="mt-9 flex flex-col divide-y divide-navy-100 border-y border-navy-100">
              {SHIFTS.map((shift) => (
                <li key={shift.before} className="grid gap-2 py-4 sm:grid-cols-2 sm:gap-6">
                  <span className="text-[0.95rem] text-navy-400 line-through decoration-navy-300">
                    {shift.before}
                  </span>
                  <span className="flex items-start gap-2.5 text-[0.95rem] font-medium text-navy">
                    <ArrowRightIcon className="mt-1 h-4 w-4 shrink-0 text-cyan" />
                    {shift.after}
                  </span>
                </li>
              ))}
            </ul>

            <ButtonLink href="/pos-system" variant="ghost" size="lg" className="mt-9">
              See the full feature list
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
