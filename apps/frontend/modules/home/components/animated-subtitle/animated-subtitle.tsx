'use client'

import { motion } from 'motion/react'
import { useFadeInSection } from '@/modules/home/components/fade-in-section'
import type { ComponentProps } from 'react'

type AnimatedSubtitleProps =
  | (ComponentProps<typeof motion.p> & { as?: 'p' })
  | (ComponentProps<typeof motion.div> & { as: 'div' })

const initial = { opacity: 0, scale: 0.97, y: 16 }
const transition = { delay: 0.1, duration: 0.35, ease: 'easeOut' as const }

function AnimatedSubtitle(props: AnimatedSubtitleProps) {
  const isInView = useFadeInSection()
  const animate = isInView ? { opacity: 1, scale: 1, y: 0 } : initial

  if (props.as === 'div') {
    const { as: _as, children, ...rest } = props
    return (
      <motion.div {...rest} animate={animate} initial={initial} transition={transition}>
        {children}
      </motion.div>
    )
  }

  const { as: _as, children, ...rest } = props
  return (
    <motion.p {...rest} animate={animate} initial={initial} transition={transition}>
      {children}
    </motion.p>
  )
}

export { AnimatedSubtitle }
