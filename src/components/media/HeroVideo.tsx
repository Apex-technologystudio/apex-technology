'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Poster-first background video.
 *
 * The poster is the LCP element and is always rendered; the video is mounted
 * only after we know it is wanted, then faded in on `canplay`. Three rules
 * decide whether it is wanted at all:
 *
 *  1. Narrow viewports never fetch it. Most Pakistani visitors arrive on
 *     mobile data, and a background video is decoration they would pay for.
 *  2. `prefers-reduced-motion: reduce` never fetches it.
 *  3. `navigator.connection.saveData` never fetches it.
 *
 * Because the <video> is not in the initial markup, none of these cases costs
 * even a request — this is why it is gated in an effect rather than by CSS.
 *
 * The poster is generated from frame 0 of this exact file (see
 * scripts/prepare-media.mjs), so the fade-in has nothing to reveal but motion.
 */
type HeroVideoProps = {
  mp4: string
  webm?: string
  poster: string
  posterAlt: string
  className?: string
  /** Minimum viewport width, in px, at which the video is fetched. */
  minWidth?: number
  priority?: boolean
}

export function HeroVideo({
  mp4,
  webm,
  poster,
  posterAlt,
  className,
  minWidth = 768,
  priority = true,
}: HeroVideoProps) {
  const [enabled, setEnabled] = useState(false)
  const [ready, setReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const wide = window.matchMedia(`(min-width: ${minWidth}px)`)
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')

    type Conn = { saveData?: boolean }
    const saveData = Boolean((navigator as Navigator & { connection?: Conn }).connection?.saveData)

    const decide = () => setEnabled(wide.matches && !calm.matches && !saveData)
    decide()

    wide.addEventListener('change', decide)
    calm.addEventListener('change', decide)
    return () => {
      wide.removeEventListener('change', decide)
      calm.removeEventListener('change', decide)
    }
  }, [minWidth])

  useEffect(() => {
    const video = videoRef.current
    if (!enabled || !video) return

    // Some browsers reject autoplay even when muted. A rejected promise is not
    // an error here — the poster simply remains, which is a valid final state.
    const attempt = video.play()
    if (attempt) attempt.catch(() => undefined)
  }, [enabled])

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <Image
        src={poster}
        alt={posterAlt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-center"
      />

      {enabled && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000',
            ready ? 'opacity-100' : 'opacity-0',
          )}
        >
          {webm && <source src={webm} type="video/webm" />}
          <source src={mp4} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
