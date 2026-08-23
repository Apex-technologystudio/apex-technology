import { Reveal } from '@/components/ui/Reveal'
import { ButtonAnchor } from '@/components/ui/Button'
import { CheckIcon, WhatsAppIcon } from '@/components/svg/Icons'
import { TIERS, PRICING_NOTES } from '@/content/pricing'
import { whatsappLink, whatsappMessages } from '@/lib/site'
import { cn, formatPKR } from '@/lib/utils'

/**
 * The three packages.
 *
 * Rendered from content/pricing.ts so the same numbers feed the pricing page,
 * the home preview and the Offer JSON-LD — a price can never disagree with
 * itself across the site.
 */
export function PricingCards({ showNotes = true }: { showNotes?: boolean }) {
  return (
    <>
      <div className="grid items-start gap-8 lg:grid-cols-3">
        {TIERS.map((tier, i) => (
          <Reveal key={tier.id} delay={i * 0.08}>
            <article
              className={cn(
                'relative flex h-full flex-col rounded-2xl border p-8 transition-shadow duration-300',
                tier.featured
                  ? 'border-cyan bg-navy text-white shadow-[0_24px_60px_-24px_rgba(24,183,232,0.55)] lg:-mt-4 lg:pb-12'
                  : 'border-navy-100 bg-white hover:shadow-xl',
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-cyan px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-navy">
                  Most popular
                </span>
              )}

              <h3 className={cn('text-h3', tier.featured ? 'text-white' : 'text-navy')}>
                {tier.name}
              </h3>
              <p className={cn('mt-1 text-sm', tier.featured ? 'text-navy-200' : 'text-navy-500')}>
                {tier.tagline}
              </p>

              <p className="mt-6 flex items-baseline gap-2">
                <span
                  className={cn(
                    'text-4xl font-extrabold tracking-tight',
                    tier.featured ? 'text-white' : 'text-navy',
                  )}
                >
                  {formatPKR(tier.price)}
                </span>
              </p>
              <p className={cn('mt-1 text-sm', tier.featured ? 'text-cyan-200' : 'text-cyan-700')}>
                one-time · no monthly fee
              </p>

              <p
                className={cn(
                  'mt-5 border-t pt-5 text-[0.9rem] leading-relaxed',
                  tier.featured ? 'border-white/15 text-navy-200' : 'border-navy-100 text-navy-600',
                )}
              >
                {tier.bestFor}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckIcon
                      className={cn(
                        'mt-0.5 h-4 w-4 shrink-0',
                        tier.featured ? 'text-cyan' : 'text-cyan-600',
                      )}
                    />
                    <span
                      className={cn(
                        'text-[0.925rem] leading-snug',
                        tier.featured ? 'text-navy-100' : 'text-navy-700',
                      )}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <ButtonAnchor
                href={whatsappLink(whatsappMessages.pricing(tier.name))}
                target="_blank"
                rel="noopener noreferrer"
                variant={tier.featured ? 'primary' : 'ghost'}
                size="lg"
                className="mt-8 w-full"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Ask about {tier.name}
              </ButtonAnchor>
            </article>
          </Reveal>
        ))}
      </div>

      {showNotes && (
        <ul className="mx-auto mt-12 flex max-w-3xl flex-col gap-2.5">
          {PRICING_NOTES.map((note) => (
            <li key={note} className="flex items-start gap-2.5 text-[0.925rem] text-navy-600">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
              {note}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
