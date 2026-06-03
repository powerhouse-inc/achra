'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { SpotlightGrid } from '@/shared/components/spotlight-grid'
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
          className="pointer-events-none absolute inset-0 -top-24 bottom-0 bg-cover bg-center bg-no-repeat blur-xl sm:-top-28"
          style={{
            backgroundImage:
              'url(data:image/png;base64,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)',
          }}
        />
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="/home/hero/hero-bg-mobile.webm"
            type="video/webm"
            media="(max-width: 768px)"
          />
          <source src="/home/hero/hero-bg-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/home/hero/hero-bg-large.webm" type="video/webm" />
          <source src="/home/hero/hero-bg-large.mp4" type="video/mp4" />
        </video>
        <SpotlightGrid spotlightRadius={90} gridSize={12} highlightOpacity={0.5} />
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
