import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonAnchor } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/svg/Icons'
import { TIERS } from '@/content/pricing'
import { whatsappLink, whatsappMessages } from '@/lib/site'
import { cn, formatPKR } from '@/lib/utils'

/**
 * Rent-vs-own cost comparison.
 *
 * Nearly every POS sold in Pakistan is a monthly subscription, commonly
 * advertised between PKR 1,500 and 2,000 per month. That makes a one-time price
 * the single strongest differentiator this product has — but only if a buyer
 * can see the arithmetic.
 *
 * Deliberately honest about year one, where the subscription genuinely costs
 * less. Hiding that would be both untrue and easy for a buyer to check, and the
 * comparison still wins decisively from year two onward. No competitor is named
 * and no specific company's price is asserted — the monthly figure is given as
 * a range the visitor can substitute their own quote into.
 */
const MONTHLY_LOW = 1_500
const MONTHLY_HIGH = 2_000
const YEARS = [1, 2, 3, 5] as const

const STARTER = TIERS[0]
const BUSINESS = TIERS.find((t) => t.featured) ?? TIERS[1]

/** Months until a one-time price is cheaper than renting at `monthly`. */
function breakEvenMonths(oneTime: number, monthly: number) {
  return Math.ceil(oneTime / monthly)
}

export function CostComparison({ tone = 'mist' }: { tone?: 'mist' | 'white' }) {
  const breakEven = breakEvenMonths(STARTER.price, MONTHLY_HIGH)

  return (
    <Section tone={tone}>
      <Container>
        <SectionHeading
          eyebrow="Rent vs own"
          title="Most POS software in Pakistan is rented. This one you keep."
          description={`Subscription POS is commonly advertised at PKR ${MONTHLY_LOW.toLocaleString('en-PK')}–${MONTHLY_HIGH.toLocaleString('en-PK')} a month. That is cheaper than we are for the first year — and more expensive every year after.`}
        />

        <Reveal className="mt-14">
          <div className="overflow-x-auto rounded-2xl border border-navy-100 bg-white">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">
                Total cost of a rented POS subscription compared with Apex POS one-time
                packages, over one, two, three and five years.
              </caption>
              <thead>
                <tr className="border-b border-navy-100 bg-mist/60">
                  <th scope="col" className="p-5 text-sm font-semibold text-navy">
                    Total you have paid after
                  </th>
                  <th scope="col" className="p-5 text-sm font-semibold text-navy">
                    Rented POS
                    <span className="mt-0.5 block text-xs font-normal text-navy-500">
                      at PKR {MONTHLY_HIGH.toLocaleString('en-PK')}/month
                    </span>
                  </th>
                  <th scope="col" className="p-5 text-sm font-semibold text-cyan-700">
                    Apex {STARTER.name}
                    <span className="mt-0.5 block text-xs font-normal text-navy-500">
                      one-time
                    </span>
                  </th>
                  <th scope="col" className="p-5 text-sm font-semibold text-cyan-700">
                    Apex {BUSINESS.name}
                    <span className="mt-0.5 block text-xs font-normal text-navy-500">
                      one-time
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {YEARS.map((year) => {
                  const rented = MONTHLY_HIGH * 12 * year
                  const starterWins = rented > STARTER.price
                  return (
                    <tr key={year} className="border-b border-navy-100 last:border-0">
                      <th scope="row" className="p-5 text-sm font-semibold text-navy">
                        {year} {year === 1 ? 'year' : 'years'}
                      </th>
                      <td
                        className={cn(
                          'p-5 text-[0.95rem] tabular-nums',
                          starterWins ? 'font-semibold text-red-600' : 'text-navy-600',
                        )}
                      >
                        {formatPKR(rented)}
                      </td>
                      <td className="p-5 text-[0.95rem] font-semibold tabular-nums text-navy">
                        {formatPKR(STARTER.price)}
                      </td>
                      <td className="p-5 text-[0.95rem] font-semibold tabular-nums text-navy">
                        {formatPKR(BUSINESS.price)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-6 text-center">
            <p className="text-lg leading-relaxed text-navy-700">
              At PKR {MONTHLY_HIGH.toLocaleString('en-PK')} a month, a rented POS costs more than
              Apex {STARTER.name} after roughly{' '}
              <strong className="font-semibold text-navy">{breakEven} months</strong> — and keeps
              charging you after that. Stop paying and you lose access. Apex POS you own, and it
              keeps running.
            </p>
            <p className="text-sm text-navy-500">
              Already paying monthly for a POS? Send us what you pay and we will work out your
              break-even honestly — including if staying put is the better deal.
            </p>
            <ButtonAnchor
              href={whatsappLink(whatsappMessages.pricing('one-time'))}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              shine
            >
              <WhatsAppIcon className="h-5 w-5" />
              Work out my break-even
            </ButtonAnchor>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
