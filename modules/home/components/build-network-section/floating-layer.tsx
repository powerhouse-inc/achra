'use client'

import { motion } from 'motion/react'
import { ENABLE_COLLAGE_FLOAT_ANIMATION } from '@/modules/home/lib/constants'
import type { ReactNode } from 'react'

/**
 * Wraps a collage layer with a gentle float animation that mimics
 * objects bobbing on waves. Each layer gets unique timing derived
 * from its `index` so layers move independently yet harmoniously.
 *
 * The base layer (index 0) should NOT be wrapped — pass only overlay layers.
 */

const PRESETS = [
  { duration: 4.8, delay: 0, x: 1.5, y: 3, rotate: 0.4 },
  { duration: 5.6, delay: 0.6, x: -1.2, y: 2.5, rotate: -0.35 },
  { duration: 5.2, delay: 1.2, x: 1.0, y: 3.5, rotate: 0.3 },
  { duration: 6.0, delay: 0.3, x: -1.8, y: 2.8, rotate: -0.45 },
  { duration: 5.4, delay: 0.9, x: 1.3, y: 3.2, rotate: 0.38 },
] as const

interface FloatingLayerProps {
  index: number
  children: ReactNode
}

function FloatingLayer({ index, children }: FloatingLayerProps) {
  if (!ENABLE_COLLAGE_FLOAT_ANIMATION) return <>{children}</>

  const p = PRESETS[index % PRESETS.length]

  return (
    <motion.div
      style={{ position: 'absolute', inset: 0 }}
      animate={{
        x: [0, p.x, -p.x * 0.6, p.x * 0.8, 0],
        y: [0, -p.y, p.y * 0.4, -p.y * 0.7, 0],
        rotate: [0, p.rotate, -p.rotate * 0.5, p.rotate * 0.7, 0],
      }}
      transition={{
        duration: p.duration,
        delay: p.delay,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
      {children}
    </motion.div>
  )
}

export { FloatingLayer }
