'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { PlayIcon } from '@/components/svg/Icons'
import { cn } from '@/lib/utils'

/**
 * Silent looping clip that only starts once it is actually on screen.
 *
 * `preload="none"` plus an IntersectionObserver means a page carrying six of
 * these costs nothing until the visitor scrolls to them — the clips are
 * atmosphere, and they should never compete with the page's own content for
 * bandwidth on a mobile connection.
 */
export function AmbientClip({
  src,
  poster,
  alt,
  className,
}: {
  src: string
  poster: string
  alt: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          el.play().catch(() => undefined)
        } else {
          el.pause()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={alt}
      className={cn('h-full w-full object-cover transition-opacity duration-700',
        visible ? 'opacity-100' : 'opacity-90', className)}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

/**
 * Click-to-play player for the full walkthrough.
 *
 * The <video> element is not rendered until the visitor asks for it, so the
 * ~2.9 MB file is never fetched by someone who only scrolled past. Until then
 * this is just a poster image and a button.
 *
 * The file itself carries no audio track (stripped at encode), and the element
 * is muted as well.
 */
export function DemoPlayer({
  src,
  poster,
  label,
  className,
}: {
  src: string
  poster: string
  label: string
  className?: string
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <div
      className={cn(
        'group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-2xl',
        className,
      )}
    >
      {playing ? (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          // Muted at the element too, not only in the file. This also keeps
          // `autoPlay` reliable: browsers block autoplay of audible media, so
          // an unmuted video here would silently fail to start on some setups.
          muted
          playsInline
          preload="auto"
          className="h-full w-full"
        />
      ) : (
        <>
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-navy/45 transition-colors group-hover:bg-navy/30" />
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-4"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan text-navy shadow-[0_12px_40px_-8px_rgba(24,183,232,0.8)] transition-transform duration-300 group-hover:scale-110">
              <PlayIcon className="ml-1 h-8 w-8" />
            </span>
            <span className="rounded-full bg-navy/70 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
              {label}
            </span>
          </button>
        </>
      )}
    </div>
  )
}

/**
 * Phone chassis for the portrait clips.
 *
 * The source footage is 9:16, so it is framed as a handset rather than cropped
 * into a landscape box — cropping would throw away most of each shot.
 */
export function PhoneFrame({
  src,
  poster,
  alt,
  className,
}: {
  src: string
  poster: string
  alt: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative aspect-9/16 w-full overflow-hidden rounded-[1.75rem] border-[6px] border-navy-800 bg-navy-900 shadow-[0_24px_60px_-20px_rgba(7,26,46,0.7)]',
        className,
      )}
    >
      <AmbientClip src={src} poster={poster} alt={alt} />
      {/* Speaker notch */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-navy-800/80"
      />
    </div>
  )
}
