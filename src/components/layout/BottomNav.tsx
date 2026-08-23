'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, BarcodeIcon, ProfitIcon, WhatsAppIcon, StoreIcon } from '@/components/svg/Icons'
import { cn } from '@/lib/utils'

/**
 * Mobile bottom navigation.
 *
 * A floating glass pill rather than an edge-to-edge bar — it reads as a
 * distinct control surface over the page instead of a browser chrome imitation,
 * and the inset lets the page's own background show through the blur, which is
 * what makes the glass legible as glass.
 *
 * Hidden at lg where the sticky header already carries full navigation. The
 * matching `pb-bottomnav` on <body> reserves the space so nothing sits under it.
 */
const ITEMS = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/pos-system', label: 'Apex POS', icon: BarcodeIcon },
  { href: '/pricing', label: 'Pricing', icon: ProfitIcon },
  { href: '/industries', label: 'Trades', icon: StoreIcon },
  { href: '/contact', label: 'Contact', icon: WhatsAppIcon },
] as const

export function BottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav
      aria-label="Primary mobile"
      className="pb-safe fixed inset-x-0 bottom-0 z-60 px-3 pb-3 lg:hidden"
    >
      {/* Glow under the bar, so it reads as lifted off the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 bottom-2 h-10 rounded-full bg-navy/40 blur-2xl"
      />

      <ul className="glass-navy relative flex items-stretch justify-between gap-0.5 rounded-2xl p-1.5 shadow-[0_16px_40px_-12px_rgba(7,26,46,0.85)]">
        {ITEMS.map((item) => {
          const active = isActive(item.href)
          return (
            <li key={item.href} className="min-w-0 flex-1">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex h-full flex-col items-center justify-center gap-1 rounded-xl px-1 py-2',
                  'transition-colors duration-300',
                  active ? 'text-cyan' : 'text-navy-200 active:text-white',
                )}
              >
                {active && (
                  <>
                    {/* Lit pill behind the active item */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-xl bg-cyan/15 ring-1 ring-cyan/30"
                    />
                    {/* Indicator notch along the top edge */}
                    <span
                      aria-hidden="true"
                      className="absolute -top-1.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_12px_2px_rgba(24,183,232,0.8)]"
                    />
                  </>
                )}

                <item.icon
                  className={cn(
                    'relative h-5 w-5 transition-transform duration-300',
                    active && '-translate-y-px scale-110',
                  )}
                />
                <span
                  className={cn(
                    'relative w-full truncate text-center text-[0.66rem] font-semibold leading-none tracking-tight',
                    active && 'text-cyan',
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
