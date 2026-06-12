'use client'

import { motion } from 'motion/react'
import type { ComponentProps } from 'react'

type RevealProps = ComponentProps<typeof motion.div> & {
  /** Delay in seconds — pass increasing values to stagger siblings */
  delay?: number
  /** Vertical travel in px */
  y?: number
  /** Horizontal travel in px — slide in from a side (negative = from left) */
  x?: number
}

/**
 * Scroll-triggered entrance matching the hero's signature (blur + slide +
 * fade, once). Wrap section blocks and pass staggered `delay`s to choreograph
 * a sequence. Composes transform/opacity/filter only, so it stays cheap.
 */
function Reveal({ delay = 0, y = 32, x = 0, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export { Reveal }
