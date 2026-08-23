import type { ReactNode } from 'react'
import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { AmbientClip } from '@/components/media/Players'
import { CheckIcon } from '@/components/svg/Icons'
import { cn } from '@/lib/utils'

/**
 * A landscape ambient clip paired with copy.
 *
 * The clip is decoration, so it stays cheap: `AmbientClip` is `preload="none"`
 * and IntersectionObserver-gated, meaning nothing is fetched until the visitor
 * actually scrolls here, and it pauses again when they scroll past.
 *
 * No CSS filters are applied to the video. Filtering a playing video costs GPU
 * work on every frame; where a still is wanted, the poster already covers it.
 */
export function VideoFeature({
  eyebrow,
  title,
  description,
  points,
  src,
  poster,
  alt,
  tone = 'white',
  reverse = false,
  footnote,
}: {
  eyebrow: string
  title: ReactNode
  description: ReactNode
  points: readonly string[]
  src: string
  poster: string
  alt: string
  tone?: 'white' | 'mist' | 'navy'
  /** Puts the clip on the left instead of the right. */
  reverse?: boolean
  footnote?: ReactNode
}) {
  const onDark = tone === 'navy'

  return (
    <Section tone={tone} className="overflow-hidden">
      {onDark && <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.05]" />}

      <Container className="relative">
        <div
          className={cn(
            'grid items-center gap-12 lg:grid-cols-2 lg:gap-16',
            reverse && 'lg:[&>*:first-child]:order-2',
          )}
        >
          <Reveal>
            <SectionHeading
              align="left"
              tone={onDark ? 'dark' : 'light'}
              eyebrow={eyebrow}
              title={title}
              description={description}
            />

            <ul className="mt-8 flex flex-col gap-3.5">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckIcon
                    className={cn('mt-0.5 h-5 w-5 shrink-0', onDark ? 'text-cyan' : 'text-cyan-600')}
                  />
                  <span
                    className={cn(
                      'text-[0.975rem] leading-relaxed',
                      onDark ? 'text-navy-100' : 'text-navy-700',
                    )}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {footnote && (
              <p
                className={cn(
                  'mt-7 border-l-2 pl-4 text-sm leading-relaxed',
                  onDark ? 'border-cyan/40 text-navy-300' : 'border-cyan/40 text-navy-500',
                )}
              >
                {footnote}
              </p>
            )}
          </Reveal>

          <Reveal delay={0.1} direction={reverse ? 'right' : 'left'}>
            <figure
              className={cn(
                'relative aspect-video w-full overflow-hidden rounded-2xl',
                onDark
                  ? 'border border-white/10 shadow-2xl'
                  : 'border border-navy-100 shadow-[0_28px_70px_-30px_rgba(7,26,46,0.55)]',
              )}
            >
              <AmbientClip src={src} poster={poster} alt={alt} />
              {/* Slight inward shadow so the clip sits in the page rather than
                  floating on top of it. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-navy/10"
              />
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
