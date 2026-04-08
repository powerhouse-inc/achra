'use client'

import { motion, useInView } from 'motion/react'
import { createContext, type ReactNode, useContext, useRef } from 'react'

const FadeInSectionContext = createContext(false)

function useFadeInSection() {
  return useContext(FadeInSectionContext)
}

function FadeInSection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <FadeInSectionContext value={isInView}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeIn' }}
      >
        {children}
      </motion.div>
    </FadeInSectionContext>
  )
}

export { FadeInSection, useFadeInSection }
