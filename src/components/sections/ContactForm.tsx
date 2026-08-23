'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Button, ButtonAnchor } from '@/components/ui/Button'
import { MailIcon, WhatsAppIcon } from '@/components/svg/Icons'
import { mailtoLink, site, whatsappLink } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Enquiry form.
 *
 * There is no server: submitting composes a prefilled WhatsApp message and
 * opens it, with a mailto fallback rendered alongside. That is a deliberate
 * choice, not a shortcut — WhatsApp is how this market actually buys, it needs
 * no API key or domain to start working, and it cannot silently drop an
 * enquiry the way an unmonitored inbox or a misconfigured SMTP relay can.
 */
const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  business: z.string().min(2, 'Please enter your business name'),
  // Pakistani mobile numbers, tolerant of +92 / 0092 / 03xx and separators.
  phone: z
    .string()
    .min(7, 'Please enter your phone number')
    .regex(/^[+\d][\d\s()-]{6,20}$/, 'Please enter a valid phone number'),
  type: z.string().min(1, 'Please choose what you need'),
  message: z.string().max(600, 'Please keep this under 600 characters').optional(),
})

type FormValues = z.infer<typeof schema>

const ENQUIRY_TYPES = [
  'Apex POS for my shop',
  'Apex Gym for my gym',
  'A website',
  'A mobile app',
  'Custom software',
  'Something else',
]

function compose(values: FormValues): string {
  const lines = [
    'Assalam o Alaikum!',
    '',
    `Name: ${values.name}`,
    `Business: ${values.business}`,
    `Phone: ${values.phone}`,
    `Interested in: ${values.type}`,
  ]
  if (values.message?.trim()) {
    lines.push('', values.message.trim())
  }
  return lines.join('\n')
}

const fieldBase =
  'w-full rounded-lg border bg-white px-4 py-3 text-[0.95rem] text-ink transition-colors ' +
  'placeholder:text-navy-300 focus:border-cyan focus:outline-none'

export function ContactForm() {
  const [sent, setSent] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { type: ENQUIRY_TYPES[0] },
  })

  const onSubmit = (values: FormValues) => {
    const text = compose(values)
    setSent(text)
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-navy">
            Your name
          </label>
          <input
            id="name"
            {...register('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={cn(fieldBase, errors.name ? 'border-red-400' : 'border-navy-200')}
            placeholder="Ahmed Raza"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="business" className="mb-2 block text-sm font-medium text-navy">
            Business name
          </label>
          <input
            id="business"
            {...register('business')}
            aria-invalid={Boolean(errors.business)}
            aria-describedby={errors.business ? 'business-error' : undefined}
            className={cn(fieldBase, errors.business ? 'border-red-400' : 'border-navy-200')}
            placeholder="Raza General Store"
          />
          {errors.business && (
            <p id="business-error" className="mt-1.5 text-sm text-red-600">
              {errors.business.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-navy">
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            {...register('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={cn(fieldBase, errors.phone ? 'border-red-400' : 'border-navy-200')}
            placeholder="0300 1234567"
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-sm text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="type" className="mb-2 block text-sm font-medium text-navy">
            What do you need?
          </label>
          <select
            id="type"
            {...register('type')}
            className={cn(fieldBase, 'border-navy-200')}
          >
            {ENQUIRY_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-navy">
          Anything else? <span className="font-normal text-navy-400">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          aria-invalid={Boolean(errors.message)}
          className={cn(fieldBase, 'resize-y', errors.message ? 'border-red-400' : 'border-navy-200')}
          placeholder="Tell us about your shop — how many counters, what you sell, what you use now."
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" variant="whatsapp" size="lg" className="w-full sm:w-auto" shine>
        <WhatsAppIcon className="h-5 w-5" />
        Send on WhatsApp
      </Button>

      {sent && (
        <div
          role="status"
          className="rounded-xl border border-cyan/30 bg-cyan-50 p-5 text-[0.95rem] text-navy-700"
        >
          <p className="font-semibold text-navy">WhatsApp should have opened in a new tab.</p>
          <p className="mt-1.5">
            If it did not, use one of these instead — your details are already filled in.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
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
                `Enquiry from ${getValues('business') || getValues('name')}`,
                sent,
              )}
              variant="ghost"
              size="sm"
            >
              <MailIcon className="h-4 w-4" />
              Email instead
            </ButtonAnchor>
          </div>
          <p className="mt-4 text-sm text-navy-500">
            Or call {site.phoneDisplay} directly.
          </p>
        </div>
      )}
    </form>
  )
}
