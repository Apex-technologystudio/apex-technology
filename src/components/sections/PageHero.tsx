import Link from 'next/link'
import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Section'
import { CircuitTraces } from '@/components/svg/CircuitTraces'
import { ChevronIcon } from '@/components/svg/Icons'

/**
 * Interior page header.
 *
 * Carries a visible breadcrumb because these pages are search landing points —
 * a visitor arriving from Google on /industries/pharmacy needs to see where
 * they are. The same trail is emitted as BreadcrumbList JSON-LD by each page.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  breadcrumb?: Array<{ name: string; path: string }>
  children?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.07]" />
      <CircuitTraces className="opacity-50" />
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-cyan/15 blur-3xl"
      />

      <Container className="relative py-16 md:py-24">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-navy-300">
              <li>
                <Link href="/" className="transition-colors hover:text-cyan">
                  Home
                </Link>
              </li>
              {breadcrumb.map((crumb, i) => {
                const last = i === breadcrumb.length - 1
                return (
                  <li key={crumb.path} className="flex items-center gap-1.5">
                    <ChevronIcon className="h-3 w-3 -rotate-90 text-navy-500" />
                    {last ? (
                      <span aria-current="page" className="text-navy-100">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link href={crumb.path} className="transition-colors hover:text-cyan">
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">
            <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
            {eyebrow}
          </span>
        )}

        <h1 className="mt-4 max-w-4xl text-h1 font-extrabold text-white">{title}</h1>

        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">{description}</p>
        )}

        {children && <div className="mt-9">{children}</div>}
      </Container>
    </section>
  )
}
