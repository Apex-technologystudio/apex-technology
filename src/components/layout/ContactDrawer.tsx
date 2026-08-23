'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, ButtonAnchor } from '@/components/ui/Button'
import { CloseIcon, MailIcon, WhatsAppIcon } from '@/components/svg/Icons'
import { mailtoLink, site, whatsappLink } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Floating enquiry CTA and slide-out form.
 *
 * Presentation adapts to the viewport: a right-hand drawer on desktop, a bottom
 * sheet on mobile where a thumb reaches the bottom of the screen more easily
 * than the side. Delivery matches the main contact form — a prefilled WhatsApp
 * message with a mailto fallback — so every enquiry route on the site behaves
 * identically and needs no backend.
 *
 * Fields use the embossed treatment for a premium feel, but keep a real border
 * and a high-contrast focus ring: shadow alone is not an accessible way to say
 * "this is an input".
 */

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  business: z.string().min(2, 'Please enter your business name'),
  phone: z
    .string()
    .min(7, 'Please enter your phone number')
    .regex(/^[+\d][\d\s()-]{6,20}$/, 'Please enter a valid phone number'),
  need: z.string().min(1),
  budget: z.string().min(1),
  location: z.string().min(2, 'Please enter your city'),
})

type FormValues = z.infer<typeof schema>

const NEEDS = [
  'A small POS for one shop',
  'Full POS with udhaar and reports',
  'Apex Gym — gym software',
  'A website',
  'A mobile app',
  'Custom software',
  'Not sure yet',
]

const BUDGETS = [
  'Under PKR 30,000',
  'PKR 30,000 – 50,000',
  'PKR 50,000 – 80,000',
  'PKR 80,000 – 150,000',
  'Above PKR 150,000',
  'Not sure yet',
]

function compose(v: FormValues) {
  return [
    'Assalam o Alaikum!',
    '',
    `Name: ${v.name}`,
    `Business: ${v.business}`,
    `Phone: ${v.phone}`,
    `City: ${v.location}`,
    `Looking for: ${v.need}`,
    `Budget: ${v.budget}`,
  ].join('\n')
}

/** Pulsing rings behind the floating button. */
function CtaRings() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute inset-0 rounded-full border border-cyan/50 animate-[apex-ring_2.8s_ease-out_infinite]"
          style={{ animationDelay: `${i * 0.9}s` }}
        />
      ))}
    </span>
  )
}

const fieldClass =
  'field-emboss w-full rounded-xl px-4 py-3 text-[0.95rem] text-ink outline-none ' +
  'placeholder:text-navy-300 focus:field-emboss-focus'

const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-navy-600'

export function ContactDrawer() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { need: NEEDS[0], budget: BUDGETS[1], location: '' },
  })

  const close = useCallback(() => {
    setOpen(false)
    // Return focus to the trigger so keyboard users are not dumped at the top
    // of the document.
    openerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab') return

      // Focus trap: a modal that lets focus escape behind the scrim strands
      // keyboard users on controls they cannot see.
      const panel = panelRef.current
      if (!panel) return
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>('input, select')?.focus()
    }, 120)

    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
    }
  }, [open, close])

  const onSubmit = (values: FormValues) => {
    const text = compose(values)
    setSent(text)
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {/* Floating trigger. Sits above the mobile bottom bar, and drops to the
          corner once that bar is gone at lg. */}
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          'group fixed right-4 z-70 flex h-14 w-14 items-center justify-center rounded-full',
          'bottom-[6.75rem] lg:bottom-6 lg:right-6 lg:h-16 lg:w-16',
          'bg-cyan text-navy shadow-[0_12px_36px_-8px_rgba(24,183,232,0.8)]',
          'transition-transform duration-300 ease-[var(--ease-out-expo)] hover:scale-110 active:scale-95',
          open && 'pointer-events-none scale-0 opacity-0',
        )}
      >
        <CtaRings />
        <span className="relative animate-[apex-bob_3s_ease-in-out_infinite]">
          <WhatsAppIcon className="h-7 w-7 lg:h-8 lg:w-8" />
        </span>
        <span className="sr-only">Open the enquiry form</span>

        {/* Desktop-only label that expands on hover. */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-navy px-3 py-2 text-sm font-semibold text-white opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 lg:block">
          Get a free quote
        </span>
      </button>

      {/* Scrim */}
      <div
        onClick={close}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-80 bg-navy/60 backdrop-blur-sm',
          'transition-opacity duration-500 ease-[var(--ease-out-expo)]',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        inert={!open}
        className={cn(
          'fixed inset-0 z-90 flex items-end justify-center sm:items-stretch sm:justify-end',
          !open && 'pointer-events-none',
        )}
      >
        <div
          ref={panelRef}
          className={cn(
            'panel-emboss relative flex max-h-[92dvh] w-full flex-col overflow-hidden bg-white',
            'rounded-t-3xl sm:max-h-none sm:w-[27rem] sm:rounded-none',
            'transition-transform duration-500 ease-[var(--ease-out-expo)] will-change-transform',
            // Slides up from the bottom on mobile, in from the right at sm+.
            open
              ? 'translate-y-0 sm:translate-x-0'
              : 'translate-y-full sm:translate-y-0 sm:translate-x-full',
          )}
        >
          {/* Grab handle, mobile sheet only */}
          <span
            aria-hidden="true"
            className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-navy-200 sm:hidden"
          />

          <div className="flex shrink-0 items-start justify-between gap-4 px-6 pb-5 pt-5">
            <div>
              <h2 id={titleId} className="text-h3 text-navy">
                Get a free quote
              </h2>
              <p className="mt-1 text-sm text-navy-500">
                Tell us a little and we&apos;ll send you a straight price on WhatsApp.
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="-mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-navy-500 transition-colors hover:bg-mist hover:text-navy"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
              <div>
                <label htmlFor="cd-name" className={labelClass}>
                  Your name
                </label>
                <input
                  id="cd-name"
                  {...register('name')}
                  aria-invalid={Boolean(errors.name)}
                  className={fieldClass}
                  placeholder="Ahmed Raza"
                />
                {errors.name && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="cd-business" className={labelClass}>
                  Business name
                </label>
                <input
                  id="cd-business"
                  {...register('business')}
                  aria-invalid={Boolean(errors.business)}
                  className={fieldClass}
                  placeholder="Raza General Store"
                />
                {errors.business && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.business.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="cd-phone" className={labelClass}>
                  Phone / WhatsApp
                </label>
                <input
                  id="cd-phone"
                  type="tel"
                  inputMode="tel"
                  {...register('phone')}
                  aria-invalid={Boolean(errors.phone)}
                  className={fieldClass}
                  placeholder="0300 1234567"
                />
                {errors.phone && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="cd-location" className={labelClass}>
                  City
                </label>
                <input
                  id="cd-location"
                  list="cd-cities"
                  {...register('location')}
                  aria-invalid={Boolean(errors.location)}
                  className={fieldClass}
                  placeholder="Lahore"
                />
                {/* Suggestions, not a restriction — smaller cities must still
                    be typeable. */}
                <datalist id="cd-cities">
                  {site.areaServed.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
                {errors.location && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.location.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="cd-need" className={labelClass}>
                  What do you need?
                </label>
                <select id="cd-need" {...register('need')} className={fieldClass}>
                  {NEEDS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="cd-budget" className={labelClass}>
                  Budget range
                </label>
                <select id="cd-budget" {...register('budget')} className={fieldClass}>
                  {BUDGETS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-navy-400">
                  A rough idea is fine — it just helps us quote the right package.
                </p>
              </div>

              <Button type="submit" variant="whatsapp" size="lg" className="mt-1 w-full" shine>
                <WhatsAppIcon className="h-5 w-5" />
                Send on WhatsApp
              </Button>

              {sent && (
                <div
                  role="status"
                  className="rounded-xl border border-cyan/30 bg-cyan-50 p-4 text-sm text-navy-700"
                >
                  <p className="font-semibold text-navy">WhatsApp should have opened.</p>
                  <p className="mt-1">If not, use one of these — details already filled in.</p>
                  <div className="mt-3 flex flex-col gap-2">
                    <ButtonAnchor
                      href={whatsappLink(sent)}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="whatsapp"
                      size="sm"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Open WhatsApp
                    </ButtonAnchor>
                    <ButtonAnchor
                      href={mailtoLink(
                        `Quote request from ${getValues('business') || getValues('name')}`,
                        sent,
                      )}
                      variant="ghost"
                      size="sm"
                    >
                      <MailIcon className="h-4 w-4" />
                      Email instead
                    </ButtonAnchor>
                  </div>
                </div>
              )}

              <p className="text-center text-xs text-navy-400">
                Or call{' '}
                <a href={site.phoneHref} className="font-medium text-cyan-700 hover:underline">
                  {site.phoneDisplay}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
