'use client'

import { useState } from 'react'
import { DemoPlayer } from '@/components/media/Players'
import { cn } from '@/lib/utils'

/**
 * The product walkthrough, narrated, with a language choice.
 *
 * Both files are the same recording with different commentary, so switching
 * language swaps the source rather than loading a different demo. `DemoPlayer`
 * keys the <video> on `src`, so a switch mid-playback restarts cleanly instead
 * of leaving the previous track's playhead behind.
 *
 * Neither file is fetched until the visitor presses play — the player renders
 * a poster and a button until then — so offering two languages costs nothing
 * to someone who watches neither.
 *
 * English is the default because the surrounding page is English. The Urdu
 * option is given equal visual weight and labelled in Urdu script, since
 * someone who wants it is scanning for that, not for the word "Urdu".
 */
type Lang = 'en' | 'ur'

const TRACKS: Record<Lang, { src: string; poster: string; label: string; note: string }> = {
  en: {
    src: '/media/demo-english.mp4',
    poster: '/media/demo-english-poster.webp',
    label: 'English',
    note: 'Narrated in English',
  },
  ur: {
    src: '/media/demo-urdu.mp4',
    poster: '/media/demo-urdu-poster.webp',
    label: 'اردو',
    note: 'Urdu mein tafseel',
  },
}

export function NarratedDemo({ className }: { className?: string }) {
  const [lang, setLang] = useState<Lang>('en')
  const track = TRACKS[lang]

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Choose the narration language"
          className="inline-flex rounded-xl border border-white/15 bg-white/5 p-1"
        >
          {(Object.keys(TRACKS) as Lang[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setLang(key)}
              aria-pressed={lang === key}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200',
                lang === key
                  ? 'bg-cyan text-navy'
                  : 'text-navy-200 hover:text-white',
              )}
            >
              {TRACKS[key].label}
            </button>
          ))}
        </div>

        <p className="text-sm text-navy-300">{track.note} · 59 seconds</p>
      </div>

      {/* 1280x650 — the encoded size after the taskbar&watermark crop. */}
      <DemoPlayer
        src={track.src}
        poster={track.poster}
        aspect="aspect-[128/65]"
        label={lang === 'ur' ? 'اردو میں دیکھیں' : 'Watch the walkthrough'}
      />
    </div>
  )
}
