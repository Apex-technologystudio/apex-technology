import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Cyan is the only "action" colour in the brand system (the 10% in the 60/30/10
 * ratio), so `primary` is the sole cyan-filled variant. `whatsapp` is the one
 * documented exception — it uses WhatsApp's own green because users recognise
 * it as a channel, not as an Apex accent.
 */
type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp'
type Size = 'sm' | 'md' | 'lg'

const base =
  'relative inline-flex items-center justify-center gap-2 rounded-lg font-semibold ' +
  'transition-all duration-200 ease-[var(--ease-out-expo)] ' +
  'disabled:pointer-events-none disabled:opacity-50 ' +
  'active:translate-y-px overflow-hidden group/btn'

const variants: Record<Variant, string> = {
  primary:
    'bg-cyan text-navy hover:bg-cyan-400 shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_8px_24px_-8px_rgba(24,183,232,0.6)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_12px_32px_-8px_rgba(24,183,232,0.75)]',
  secondary:
    'bg-navy text-white hover:bg-navy-800 shadow-[0_8px_24px_-10px_rgba(7,26,46,0.6)]',
  ghost:
    'border border-navy/20 bg-transparent text-navy hover:border-cyan hover:text-cyan-700 hover:bg-cyan-50',
  whatsapp: 'bg-[#25D366] text-[#04301A] hover:bg-[#1FBE5A] shadow-[0_8px_24px_-10px_rgba(37,211,102,0.7)]',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-13 px-7 text-base',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  /** Sweeping highlight on hover. Off by default; use on hero CTAs. */
  shine?: boolean
}

function Shine() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-0 opacity-0 group-hover/btn:opacity-100"
    >
      <span className="absolute inset-y-0 -left-full w-1/2 bg-linear-to-r from-transparent via-white/40 to-transparent group-hover/btn:animate-[apex-shine_0.9s_var(--ease-out-expo)]" />
    </span>
  )
}

type ButtonLinkProps = CommonProps &
  Omit<ComponentProps<typeof Link>, 'className' | 'children'> & { href: string }

/** Internal navigation, or any external URL (rel/target set by the caller). */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  shine = false,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {shine && <Shine />}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Link>
  )
}

type ButtonProps = CommonProps & ComponentProps<'button'>

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  shine = false,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {shine && <Shine />}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  )
}

/**
 * External anchor — used for wa.me, tel: and mailto: targets, which must be
 * plain anchors rather than Link so the OS handles the protocol.
 */
export function ButtonAnchor({
  variant = 'primary',
  size = 'md',
  className,
  children,
  shine = false,
  ...props
}: CommonProps & ComponentProps<'a'>) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {shine && <Shine />}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </a>
  )
}
