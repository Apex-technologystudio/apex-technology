import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { site } from '@/lib/site'

/**
 * The official APEX TECHNOLOGY lockup.
 *
 * Brand rules enforced here:
 *  - `tone="reversed"` on navy/dark/photographic surfaces. The primary lockup
 *    sets "TECHNOLOGY" in Studio Ink, which is invisible on navy.
 *  - The wordmark is never re-typed — both variants are the supplied artwork,
 *    with the reversed version recoloured pixel-wise (see prepare-media notes).
 *  - Below 180px wide the guidelines require dropping the wordmark, so
 *    `variant="symbol"` renders the standalone mark instead.
 */
type LogoProps = {
  tone?: 'primary' | 'reversed'
  variant?: 'lockup' | 'symbol'
  /** Rendered width in px. Lockups below 180 fall back to the symbol. */
  width?: number
  className?: string
  priority?: boolean
}

const LOCKUP_MIN_WIDTH = 180

export function Logo({
  tone = 'primary',
  variant = 'lockup',
  width = 200,
  className,
  priority = false,
}: LogoProps) {
  const useSymbol = variant === 'symbol' || width < LOCKUP_MIN_WIDTH

  if (useSymbol) {
    const size = useSymbol && variant === 'lockup' ? 40 : width
    return (
      <Image
        src="/brand/symbol-256.png"
        alt={site.name}
        width={size}
        height={size}
        priority={priority}
        className={cn('h-auto w-auto', className)}
        style={{ width: size, height: size }}
      />
    )
  }

  const src = tone === 'reversed' ? '/brand/logo-reversed.png' : '/brand/logo-primary.png'

  return (
    <Image
      src={src}
      alt={site.name}
      width={640}
      height={156}
      priority={priority}
      className={cn('h-auto', className)}
      style={{ width }}
    />
  )
}

/** Logo wrapped in a home link, for header and footer use. */
export function LogoLink({
  tone = 'primary',
  width = 200,
  className,
  priority = false,
}: Omit<LogoProps, 'variant'>) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        'inline-flex shrink-0 items-center rounded-sm transition-opacity hover:opacity-80',
        className,
      )}
    >
      <Logo tone={tone} width={width} priority={priority} />
    </Link>
  )
}
