'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { ApexMark } from '@/components/svg/ApexMark'
import { site } from '@/lib/site'

/**
 * First-visit loading screen.
 *
 * Preloaders normally damage Core Web Vitals, which directly costs search
 * ranking — an overlay covering the page delays when the largest element counts
 * as painted. This one is deliberately constrained so it stays brand polish
 * rather than an SEO tax:
 *
 *  - **Once per session.** A sessionStorage flag means first visit only;
 *    internal navigation never re-triggers it.
 *  - **Hard capped.** It leaves on `window.load` or after MAX_MS, whichever is
 *    first, so a slow asset can never strand a visitor behind it.
 *  - **Skipped under reduced motion**, and additionally hidden via
 *    `display: none` in globals.css so it vanishes instantly rather than
 *    animating quickly.
 *  - **Never in the server HTML.** Crawlers and the no-JS experience get the
 *    page with no overlay at all.
 */
const MAX_MS = 1700
/**
 * Minimum time on screen. On a fast connection `load` fires almost instantly
 * and the overlay would appear and vanish within a couple of frames — a flash,
 * which reads as a glitch and is worse than having no intro at all. Holding it
 * briefly makes it deliberate.
 */
const MIN_MS = 1050
const FADE_MS = 550
const SESSION_KEY = 'apex:seen-intro'

/**
 * Decided once per page load and cached at module scope.
 *
 * `useSyncExternalStore` may call the snapshot repeatedly and requires a stable
 * result — recomputing (and re-reading sessionStorage) each call would risk an
 * infinite render loop. This is also why the decision is a pure read; the flag
 * is *written* from an effect below.
 */
let decision: boolean | null = null

function shouldShowIntro(): boolean {
  if (decision !== null) return decision
  try {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    decision = !calm && sessionStorage.getItem(SESSION_KEY) !== '1'
  } catch {
    // Private browsing can throw on sessionStorage. Failing closed keeps the
    // page usable, which matters more than showing an animation.
    decision = false
  }
  return decision
}

/** The value never changes after mount, so there is nothing to subscribe to. */
const subscribe = () => () => {}

export function Preloader() {
  const show = useSyncExternalStore(
    subscribe,
    shouldShowIntro,
    // Server snapshot — the overlay is never server-rendered.
    () => false,
  )

  const [phase, setPhase] = useState<'visible' | 'leaving' | 'gone'>('visible')

  useEffect(() => {
    if (!show || phase !== 'visible') return

    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* not fatal */
    }

    // setPhase runs from timer/event callbacks, never synchronously in the
    // effect body, so this does not cascade renders.
    const startedAt = performance.now()
    let pending: number | undefined

    // MIN_MS is set from the mark's own animation length (~0.95s): dismissing
    // sooner would mean nobody ever sees the logo finish drawing.
    const dismiss = () => {
      const remaining = Math.max(0, MIN_MS - (performance.now() - startedAt))
      pending = window.setTimeout(() => setPhase('leaving'), remaining)
    }

    // Whatever happens, it is gone by MAX_MS.
    const cap = window.setTimeout(() => setPhase('leaving'), MAX_MS)

    if (document.readyState === 'complete') {
      dismiss()
    } else {
      window.addEventListener('load', dismiss, { once: true })
    }

    return () => {
      window.clearTimeout(cap)
      if (pending) window.clearTimeout(pending)
      window.removeEventListener('load', dismiss)
    }
  }, [show, phase])

  useEffect(() => {
    if (phase !== 'leaving') return
    const t = window.setTimeout(() => setPhase('gone'), FADE_MS)
    return () => window.clearTimeout(t)
  }, [phase])

  const active = show && phase !== 'gone'

  useEffect(() => {
    if (!active) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [active])

  if (!active) return null

  return (
    <div
      data-apex-preloader=""
      // Not a live region and not focusable: decoration over content the page
      // has already delivered, so it should not be announced or trap focus.
      aria-hidden="true"
      className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-navy transition-opacity duration-[550ms] ease-[var(--ease-out-expo)]"
      style={{ opacity: phase === 'leaving' ? 0 : 1 }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-[0.08]" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/20 blur-[90px]"
      />

      <div className="relative flex flex-col items-center gap-8">
        <ApexMark className="h-24 w-24 md:h-28 md:w-28" />

        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white">
            {site.name}
          </p>

          {/* A duration hint, not a fake percentage — claiming progress we do
              not measure would be theatre. */}
          <div className="h-px w-40 overflow-hidden bg-white/15">
            <div className="h-full w-full origin-left bg-cyan animate-[apex-progress_1.05s_var(--ease-out-expo)_forwards]" />
          </div>

          <p className="text-xs tracking-[0.14em] text-navy-300">{site.tagline}</p>
        </div>
      </div>
    </div>
  )
}
