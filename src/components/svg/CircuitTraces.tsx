import { cn } from '@/lib/utils'

/**
 * Decorative circuit-trace overlay.
 *
 * Riffs on the logo's own symbolism — the brand book describes the mark's
 * circuit nodes as connecting ambition to technology — so the hero surface
 * carries the same language rather than generic tech ornament.
 *
 * The travelling pulses are one path each, drawn with a short dash on a long
 * gap and animated by `stroke-dashoffset`. That keeps the geometry defined once
 * (no duplicate CSS `offset-path` string to drift), and because it is a plain
 * CSS animation the global reduced-motion block in globals.css switches it off
 * along with everything else. SMIL would ignore that preference.
 */

type Trace = { d: string; duration: number; delay: number }

const TRACES: Trace[] = [
  { d: 'M-20 140 H220 l60 60 H520 l40-40 H840', duration: 7, delay: 0 },
  { d: 'M1460 300 H1180 l-50-50 H900 l-40 40 H620', duration: 9, delay: 1.4 },
  { d: 'M-20 620 H180 l70-70 H460 l50 50 H760 l60 60 H1120', duration: 11, delay: 0.6 },
  { d: 'M1460 760 H1240 l-60-60 H940 l-50 50 H560', duration: 8, delay: 2.2 },
  { d: 'M240 940 V740 l60-60 V420 l50-50 V140', duration: 10, delay: 3 },
  { d: 'M1200 -20 V180 l-60 60 V520 l50 50 V860', duration: 12, delay: 1.8 },
]

const NODES: Array<{ cx: number; cy: number; delay: number }> = [
  { cx: 220, cy: 140, delay: 0 },
  { cx: 520, cy: 200, delay: 0.5 },
  { cx: 900, cy: 250, delay: 1 },
  { cx: 460, cy: 550, delay: 1.5 },
  { cx: 760, cy: 600, delay: 0.8 },
  { cx: 1180, cy: 300, delay: 2 },
  { cx: 300, cy: 680, delay: 2.4 },
  { cx: 1140, cy: 240, delay: 1.2 },
]

export function CircuitTraces({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    >
      <defs>
        {/* Fades the traces out at the edges so they read as ambient rather
            than as a graphic that has been cropped. */}
        <radialGradient id="apex-trace-fade" cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="65%" stopColor="white" stopOpacity="0.45" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="apex-trace-mask">
          <rect width="1440" height="900" fill="url(#apex-trace-fade)" />
        </mask>
      </defs>

      <g mask="url(#apex-trace-mask)">
        {/* Static substrate */}
        <g fill="none" stroke="var(--color-cyan)" strokeWidth={1} opacity={0.18}>
          {TRACES.map((trace, i) => (
            <path key={`base-${i}`} d={trace.d} />
          ))}
        </g>

        {/* Travelling pulses */}
        <g fill="none" stroke="var(--color-cyan)" strokeWidth={2} strokeLinecap="round">
          {TRACES.map((trace, i) => (
            <path
              key={`pulse-${i}`}
              d={trace.d}
              pathLength={1000}
              strokeDasharray="26 974"
              className="animate-[apex-draw_var(--dur)_linear_infinite]"
              style={{
                ['--dash' as string]: '1000',
                ['--dur' as string]: `${trace.duration}s`,
                animationDelay: `${trace.delay}s`,
              }}
            />
          ))}
        </g>

        {/* Junction nodes */}
        <g>
          {NODES.map((node, i) => (
            <circle
              key={`node-${i}`}
              cx={node.cx}
              cy={node.cy}
              r={3}
              fill="var(--color-cyan)"
              className="animate-[apex-pulse-node_3.2s_ease-in-out_infinite]"
              style={{
                animationDelay: `${node.delay}s`,
                // Scale about the circle's own centre rather than the SVG origin.
                transformBox: 'fill-box',
                transformOrigin: 'center',
              }}
            />
          ))}
        </g>
      </g>
    </svg>
  )
}
