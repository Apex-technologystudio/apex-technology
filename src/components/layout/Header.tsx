'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LogoLink } from '@/components/brand/Logo'
import { ButtonAnchor } from '@/components/ui/Button'
import { navigation, site, whatsappLink, whatsappMessages } from '@/lib/site'
import { cn } from '@/lib/utils'
import { WhatsAppIcon, ChevronIcon, MenuIcon, CloseIcon } from '@/components/svg/Icons'

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  // Route change closes the mobile panel — without this it stays open over the
  // new page after tapping a link.
  //
  // Adjusted during render rather than in an effect. Doing this in an effect
  // means the new page paints once with the menu still open and only then
  // re-renders closed, which reads as a flicker; React re-runs this render
  // immediately instead, before anything hits the screen.
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
    setExpanded(null)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the full-screen panel is open the page behind it must not scroll.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-all duration-300',
        scrolled
          ? 'border-white/10 bg-navy/95 backdrop-blur-md shadow-[0_8px_32px_-16px_rgba(0,0,0,0.8)]'
          : 'border-transparent bg-navy',
      )}
    >
      <div className="container-apex flex h-18 items-center justify-between gap-4">
        <LogoLink tone="reversed" width={190} priority />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.label} className="group relative">
                {item.children ? (
                  <>
                    {/*
                      Hover opens for mouse users; focus-within opens for keyboard
                      users. Both are pure CSS, so the menu can't get stuck in a
                      wrong state the way a JS-tracked open flag can.
                    */}
                    <button
                      type="button"
                      aria-expanded={false}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        isActive(item.href)
                          ? 'text-cyan'
                          : 'text-navy-100 hover:text-white',
                      )}
                    >
                      {item.label}
                      <ChevronIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                    </button>
                    <div
                      className={cn(
                        'invisible absolute left-0 top-full z-50 w-72 translate-y-1 pt-2 opacity-0 transition-all duration-200',
                        'group-hover:visible group-hover:translate-y-0 group-hover:opacity-100',
                        'group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100',
                      )}
                    >
                      <ul className="overflow-hidden rounded-xl border border-navy-100 bg-white p-2 shadow-2xl">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-mist"
                            >
                              <span className="block text-sm font-semibold text-navy">
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="mt-0.5 block text-xs text-navy-500">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'inline-flex rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive(item.href) ? 'text-cyan' : 'text-navy-100 hover:text-white',
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phoneHref}
            className="text-sm font-semibold text-navy-100 transition-colors hover:text-cyan"
          >
            {site.phoneDisplay}
          </a>
          <ButtonAnchor
            href={whatsappLink(whatsappMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="sm"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </ButtonAnchor>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        // `inert` while closed does what `hidden` did for the tab order and the
        // accessibility tree, but leaves the element animatable.
        inert={!open}
        className={cn(
          'grid overflow-hidden bg-navy lg:hidden',
          'transition-[grid-template-rows,opacity] duration-400 ease-[var(--ease-out-expo)]',
          open
            ? 'grid-rows-[1fr] border-t border-white/10 opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="max-h-[calc(100dvh-4.5rem)] min-h-0 overflow-y-auto">
        <nav aria-label="Mobile" className="container-apex py-6">
          <ul className="flex flex-col gap-1">
            {navigation.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded((v) => (v === item.label ? null : item.label))
                      }
                      aria-expanded={expanded === item.label}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-semibold text-white transition-colors hover:bg-white/5"
                    >
                      {item.label}
                      <ChevronIcon
                        className={cn(
                          'h-4 w-4 transition-transform duration-200',
                          expanded === item.label && 'rotate-180',
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-[var(--ease-out-expo)]',
                        expanded === item.label ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <ul className="ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                tabIndex={expanded === item.label ? undefined : -1}
                                className="block rounded-lg px-3 py-2.5 text-sm text-navy-100 transition-colors hover:bg-white/5 hover:text-white"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'block rounded-lg px-3 py-3 text-base font-semibold transition-colors hover:bg-white/5',
                      isActive(item.href) ? 'text-cyan' : 'text-white',
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            <ButtonAnchor
              href={whatsappLink(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              className="w-full"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat on WhatsApp
            </ButtonAnchor>
            <a
              href={site.phoneHref}
              className="flex h-12 w-full items-center justify-center rounded-lg border border-white/20 text-base font-semibold text-white transition-colors hover:bg-white/5"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </nav>
        </div>
      </div>
    </header>
  )
}
