import { cn } from '@/lib/utils'

/**
 * Animated Apex symbol, drawn as strokes.
 *
 * A decorative interpretation of the brand mark for motion contexts — the
 * rising "A" with its two circuit nodes, per the symbol meaning in the brand
 * guidelines ("the rising A represents ambition; circuit nodes connect that
 * ambition to technology"). The official raster lockup is still what appears
 * in the header and footer; this exists because a stroked path can draw itself
 * and a flattened PNG cannot.
 *
 * `pathLength={100}` normalises every path to the same length so one dash
 * value drives all of them regardless of their real geometry.
 */
export function ApexMark({
  className,
  animate = true,
}: {
  className?: string
  animate?: boolean
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={cn('overflow-visible', className)}
    >
      {/* The A */}
      <path
        d="M38 162 L100 40 L162 162"
        stroke="var(--color-cyan)"
        strokeWidth={13}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        data-apex-draw={animate ? '' : undefined}
        className={animate ? 'animate-[apex-draw_0.5s_var(--ease-out-expo)_forwards]' : undefined}
        style={
          animate
            ? { strokeDasharray: 100, strokeDashoffset: 100, ['--dash' as string]: '100' }
            : undefined
        }
      />

      {/* Crossbar */}
      <path
        d="M64 122 H136"
        stroke="#ffffff"
        strokeWidth={13}
        strokeLinecap="round"
        pathLength={100}
        data-apex-draw={animate ? '' : undefined}
        className={
          animate
            ? 'animate-[apex-draw_0.25s_var(--ease-out-expo)_0.38s_forwards]'
            : undefined
        }
        style={
          animate
            ? { strokeDasharray: 100, strokeDashoffset: 100, ['--dash' as string]: '100' }
            : undefined
        }
      />

      {/* Node connectors */}
      <path
        d="M27 140 H46 M173 140 H154"
        stroke="var(--color-cyan)"
        strokeWidth={7}
        strokeLinecap="round"
        pathLength={100}
        data-apex-draw={animate ? '' : undefined}
        className={
          animate ? 'animate-[apex-draw_0.2s_ease-out_0.55s_forwards]' : undefined
        }
        style={
          animate
            ? { strokeDasharray: 100, strokeDashoffset: 100, ['--dash' as string]: '100' }
            : undefined
        }
      />

      {/* Circuit nodes */}
      {[
        { cx: 18, cy: 140 },
        { cx: 182, cy: 140 },
      ].map((node, i) => (
        <circle
          key={node.cx}
          cx={node.cx}
          cy={node.cy}
          r={9}
          stroke="var(--color-cyan)"
          strokeWidth={6}
          fill="var(--color-navy)"
          className={
            animate
              ? 'origin-center opacity-0 animate-[apex-pop_0.28s_var(--ease-spring)_forwards]'
              : undefined
          }
          style={animate ? { animationDelay: `${0.62 + i * 0.07}s` } : undefined}
        />
      ))}
    </svg>
  )
}
