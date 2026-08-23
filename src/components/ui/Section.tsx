import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Section surfaces.
 *
 * The brand's 60/30/10 ratio is held by alternating these: mostly `white` and
 * `navy`, `mist` as the supporting neutral, and cyan reserved for accents
 * inside content rather than as a section fill.
 */
type Tone = 'white' | 'mist' | 'navy' | 'ink' | 'transparent'

const tones: Record<Tone, string> = {
  white: 'bg-white text-ink',
  mist: 'bg-mist text-ink',
  navy: 'bg-navy text-white',
  ink: 'bg-navy-900 text-white',
  transparent: '',
}

export function Section({
  tone = 'white',
  className,
  children,
  as: Tag = 'section',
  id,
}: {
  tone?: Tone
  className?: string
  children: ReactNode
  as?: ElementType
  id?: string
}) {
  return (
    <Tag id={id} className={cn('relative py-20 md:py-28', tones[tone], className)}>
      {children}
    </Tag>
  )
}

export function Container({
  className,
  children,
  as: Tag = 'div',
}: {
  className?: string
  children: ReactNode
  as?: ElementType
}) {
  return <Tag className={cn('container-apex', className)}>{children}</Tag>
}

/**
 * Section heading block. `eyebrow` is the short all-caps label the brand
 * permits (all caps is reserved for short labels only, never headings).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
  className,
  as: Tag = 'h2',
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
  as?: ElementType
}) {
  const onDark = tone === 'dark'
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'mx-auto max-w-3xl text-center items-center' : 'max-w-3xl items-start',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em]',
            onDark ? 'text-cyan-300' : 'text-cyan-700',
          )}
        >
          <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
          {eyebrow}
        </span>
      )}
      <Tag className={cn('text-h2', onDark ? 'text-white' : 'text-navy')}>{title}</Tag>
      {description && (
        <p className={cn('text-lg leading-relaxed', onDark ? 'text-navy-200' : 'text-navy-600')}>
          {description}
        </p>
      )}
    </div>
  )
}
