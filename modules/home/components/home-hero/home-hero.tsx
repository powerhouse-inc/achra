'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { SpotlightGrid } from '@/shared/components/spotlight-grid'
import { SkyIsotype, SkyLogotype } from '@/shared/components/svgs'
import { BlurText } from '@/shared/components/ui/react-bits/blur-text'

const partnershipBlurInitial = {
  filter: 'blur(10px)',
  opacity: 0,
  y: 50,
}

const partnershipBlurAnimate = {
  filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
  opacity: [0, 0.5, 1],
  y: [50, -5, 0],
}

function HomeHero() {
  // Observe the hero `<section>` (native ref is set before effects). `useInView` on `motion.*`
  // can miss the first intersection if the ref isn't attached when the effect runs.
  const heroSectionRef = useRef<HTMLElement>(null)
  const heroInView = useInView(heroSectionRef, { once: true, amount: 'some' })

  return (
    <section
      ref={heroSectionRef}
      className="bg-background relative flex min-h-screen w-full items-center justify-center overflow-x-clip px-4 py-10 sm:px-6 md:px-8"
      aria-labelledby="home-hero-heading"
    >
      <div className="absolute inset-0 -bottom-20 z-0 -mt-24 overflow-visible" aria-hidden>
        <div
          className="pointer-events-none absolute inset-0 -top-24 bottom-0 bg-cover bg-center bg-no-repeat sm:-top-28"
          style={{ backgroundImage: 'url(/home/hero/hero-background.png)' }}
        />
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/home/hero/Achrabg2.mp4" type="video/mp4" />
        </video>
        <SpotlightGrid spotlightRadius={90} gridSize={12} highlightOpacity={0.5} />
      </div>

      <div className="relative z-1 flex w-full max-w-4xl flex-col items-center gap-6 overflow-hidden">
        <div className="flex w-full flex-col items-center gap-5">
          <div className="flex w-full flex-col items-center gap-4 text-center">
            <div className="mx-auto w-full max-w-2xl">
              <BlurText
                as="h1"
                className="text-foreground text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] sm:text-4xl md:text-5xl lg:text-[3.25rem]"
                text="The Marketplace For Global Coordination"
                delay={100}
                animateBy="words"
                direction="bottom"
              />
            </div>
            <BlurText
              as="p"
              className="text-foreground/80 mx-auto w-full max-w-5xl text-sm leading-relaxed sm:text-base"
              text="Achra connects organizations, builders and operators to scale networks across borders."
              delay={30}
              animateBy="words"
              direction="bottom"
            />
          </div>
        </div>

        <motion.div
          className="flex flex-col items-center gap-2.5"
          initial={partnershipBlurInitial}
          animate={heroInView ? partnershipBlurAnimate : partnershipBlurInitial}
          transition={{
            delay: 1.1,
            duration: 0.7,
            times: [0, 0.5, 1],
            ease: 'easeInOut',
          }}
          style={{ willChange: 'transform, filter, opacity' }}
        >
          <span className="text-muted-foreground text-xs font-semibold tracking-[0.15em] uppercase">
            In Partnership With
          </span>
          <a
            href="https://sky.money"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground flex items-center gap-2"
          >
            <SkyIsotype className="size-6" aria-hidden />
            <SkyLogotype className="h-5 w-auto" aria-label="Sky" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export { HomeHero }
