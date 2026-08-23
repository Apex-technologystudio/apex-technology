'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Reveals children once, as they scroll into view.
 *
 * `useReducedMotion` is checked explicitly because motion animates inline
 * styles via JS — the CSS `prefers-reduced-motion` block in globals.css cannot
 * reach those. When reduced motion is on, children render in their final state
 * immediately rather than animating faster.
 */
type RevealProps = {
  children: ReactNode
  /** Stagger in seconds, for sequencing siblings in a grid. */
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  className?: string
}

const OFFSET = 24

export function Reveal({ children, delay = 0, direction = 'up', className }: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  const from =
    direction === 'up'
      ? { y: OFFSET }
      : direction === 'left'
        ? { x: -OFFSET }
        : direction === 'right'
          ? { x: OFFSET }
          : {}

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
