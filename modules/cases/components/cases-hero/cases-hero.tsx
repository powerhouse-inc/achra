'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Button } from '@/shared/components/ui/button'
import { BlurText } from '@/shared/components/ui/react-bits/blur-text'

const entranceInitial = {
  filter: 'blur(10px)',
  opacity: 0,
  y: 24,
}

const entranceAnimate = {
  filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
  opacity: [0, 0.6, 1],
  y: [24, -2, 0],
}

function CasesHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 'some' })

  return (
    <section
      ref={sectionRef}
      className="bg-background relative flex min-h-screen w-full items-center justify-center overflow-x-clip px-6 py-10 sm:px-12 sm:py-8"
      aria-labelledby="cases-hero-heading"
    >
      <div className="absolute inset-0 -bottom-20 z-0 -mt-24 overflow-visible" aria-hidden>
        <div
          className="pointer-events-none absolute bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/home/hero/hero-background.png)',
            inset: '-117px 0 -26px',
          }}
        />
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/home/hero/Achrabg2.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-1 flex w-full max-w-6xl flex-col items-center gap-6 overflow-hidden">
        <div className="flex max-w-6xl flex-col items-center gap-5 text-center">
          <BlurText
            as="h1"
            id="cases-hero-heading"
            className="text-foreground text-3xl leading-[1.15] font-bold tracking-[-0.02em] lg:text-4xl"
            text="Organizations that thrive on Achra"
            delay={20}
            animateBy="letters"
            direction="bottom"
          />
          <motion.div
            className="text-foreground/80 text-sm leading-relaxed sm:text-base"
            initial={entranceInitial}
            animate={isInView ? entranceAnimate : entranceInitial}
            transition={{ delay: 0.15, duration: 0.6, times: [0, 0.5, 1], ease: 'easeOut' }}
            style={{ willChange: 'transform, filter, opacity' }}
          >
            <p>
              The next generation of organizations will not be defined by borders or bureaucracy.
            </p>
            <p>
              They form around purpose, not hierarchy, coordinating across time zones, building open
              products, and rewarding contribution transparently.
            </p>
            <p>
              At the foundation is a new model, the Scalable Network Organization (SNO), that links
              onchain coordination with offchain execution.
            </p>
          </motion.div>
          <motion.div
            initial={entranceInitial}
            animate={isInView ? entranceAnimate : entranceInitial}
            transition={{ delay: 0.35, duration: 0.6, times: [0, 0.5, 1], ease: 'easeOut' }}
            style={{ willChange: 'transform, filter, opacity' }}
          >
            <Button asChild>
              <a href="https://www.scalablenetwork.org/" target="_blank" rel="noopener noreferrer">
                Learn more about SNOs
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { CasesHero }
