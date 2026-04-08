'use client'

import { motion } from 'motion/react'
import { useFadeInSection } from './fade-in-section'
import type { ComponentProps } from 'react'

type AnimatedSubtitleProps = ComponentProps<'p'> & {
  as?: 'p' | 'div'
}

function AnimatedSubtitle({ as: Tag = 'p', children, ...props }: AnimatedSubtitleProps) {
  const isInView = useFadeInSection()
  const MotionTag = Tag === 'div' ? motion.div : motion.p

  return (
    <MotionTag
      {...(props as Record<string, unknown>)}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 }}
    >
      {children}
    </MotionTag>
  )
}

export { AnimatedSubtitle }
