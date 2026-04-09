'use client'

import { motion, useInView } from 'motion/react'
import { type ReactNode, useRef } from 'react'

import { FadeInSectionContext } from './fade-in-section-context'

interface FadeInSectionProps {
  children: ReactNode
}

function FadeInSection({ children }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <FadeInSectionContext value={isInView}>
      <motion.div
        ref={ref}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeIn' }}
      >
        {children}
      </motion.div>
    </FadeInSectionContext>
  )
}

export { FadeInSection }
