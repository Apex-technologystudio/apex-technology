import { ButtonAnchor, ButtonLink } from '@/components/ui/Button'
import { HeroVideo } from '@/components/media/HeroVideo'
import { CircuitTraces } from '@/components/svg/CircuitTraces'
import { Container } from '@/components/ui/Section'
import { whatsappLink, whatsappMessages } from '@/lib/site'
import {
  ArrowRightIcon,
  BackupIcon,
  OfflineIcon,
  SplitPaymentIcon,
  WhatsAppIcon,
} from '@/components/svg/Icons'

/** Short, checkable claims — each one is a feature verified in the product. */
const PROOF = [
  { icon: OfflineIcon, label: 'Works without internet' },
  { icon: SplitPaymentIcon, label: 'JazzCash, EasyPaisa & cash' },
  { icon: BackupIcon, label: 'Automatic backup' },
] as const

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      {/*
        No CSS blur. The previous hero was a screen recording whose dense UI
        text fought the headline, so it carried `blur-[2px]` — and blurring a
        full-viewport video every frame was the main cause of the stutter this
        replaced. This footage has its own shallow depth of field, so the scrim
        below is enough and the GPU does no per-frame filtering.
      */}
      <HeroVideo
        mp4="/media/hero-loop.mp4"
        poster="/media/hero-poster.webp"
        posterAlt="A shop assistant taking an order on a touchscreen point of sale terminal"
      />

      {/*
        Directional scrim, rebalanced for this footage.

        The old version was a flat wash tuned to suppress a busy screen
        recording; over cinematic footage it buried the shot entirely. Instead
        the horizontal gradient is near-opaque on the left, where the headline
        sits, and thins toward the right so the POS terminal stays visible. The
        vertical pass only darkens the top and bottom edges, so the header and
        the proof row keep their contrast.

        On mobile the text spans the full width, so the horizontal ramp is held
        dark all the way across.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-navy via-navy/90 to-navy/85 lg:via-navy/80 lg:to-navy/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-navy/80 via-transparent to-navy/85"
      />

      <CircuitTraces className="opacity-70" />

      {/*
        No `items-start` here. On a flex column it makes each child size to its
        max-content width — the paragraph then lays out at its full unwrapped
        width (capped only by max-w-2xl) and overflows narrow viewports, which
        clips the text and pushes the header's menu button off-screen. Children
        stretch by default and cap themselves with their own max-w-*; anything
        that must hug its content opts out with `self-start`.
      */}
      <Container className="relative z-10 flex flex-col py-24 md:py-32 lg:py-40">
        <span className="inline-flex self-start items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-cyan-200">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
          Made in Pakistan
        </span>

        <h1 className="mt-6 max-w-4xl text-display font-extrabold text-white">
          Complete POS software for{' '}
          <span className="text-cyan">Pakistani businesses</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100 md:text-xl">
          Manage billing, stock, udhaar, staff and daily profit from one simple system.
          Installed on your own computer. One-time price from{' '}
          <strong className="font-semibold text-white">PKR 30,000</strong>.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonAnchor
            href={whatsappLink(whatsappMessages.demo)}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            shine
          >
            <WhatsAppIcon className="h-5 w-5" />
            Book a Free Demo
          </ButtonAnchor>
          <ButtonLink
            href="#demo"
            size="lg"
            className="border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-cyan/60 hover:bg-white/10"
          >
            See How It Works
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
          {PROOF.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="group inline-flex items-center gap-2.5 text-sm font-medium text-navy-100"
            >
              <Icon className="h-5 w-5 text-cyan" />
              {label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
