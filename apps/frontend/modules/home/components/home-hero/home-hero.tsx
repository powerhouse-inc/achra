'use client'

import { Button } from '@achra/ui/button'
import { motion } from 'motion/react'
import Link from 'next/link'
import { type ReactNode, useRef } from 'react'
import { HeroAurora } from '@/shared/components/hero-aurora'
import { SpotlightGrid } from '@/shared/components/spotlight-grid'

interface HomeHeroProps {
  /**
   * Server-rendered heading + subcopy (see `HeroCopy`). Passed in as a prop so
   * the LCP headline renders on the server, outside this client component's
   * hydration boundary — otherwise Lantern charges LCP with the hero's full
   * hydration time as "render delay".
   */
  copy: ReactNode
}

function HomeHero({ copy }: HomeHeroProps) {
  // the aurora dims behind this block so the copy keeps contrast
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <section
      className="relative flex min-h-svh w-full items-center justify-center overflow-x-clip px-4 py-10 sm:px-6 md:px-8"
      aria-labelledby="home-hero-heading"
    >
      <div className="absolute inset-0 -bottom-20 z-0 -mt-24 overflow-visible" aria-hidden>
        <HeroAurora
          className="absolute inset-0 -top-24 bottom-0 sm:-top-28"
          clearanceRef={contentRef}
        />
        <SpotlightGrid spotlightRadius={100} gridSize={16} highlightOpacity={0.15} />
      </div>

      <div
        ref={contentRef}
        className="relative z-1 flex w-full max-w-2xl flex-col items-center gap-6 overflow-hidden"
      >
        <div className="flex w-full flex-col items-center gap-5">
          {copy}

          <motion.div
            className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4"
            initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9, ease: 'easeOut' }}
            style={{ willChange: 'transform, filter, opacity' }}
          >
            <Button variant="default" className="h-10 w-full sm:w-60" asChild>
              <Link href="/services" prefetch={false}>
                Explore Services
              </Link>
            </Button>
            <Button variant="secondary" className="h-10 w-full sm:w-60" asChild>
              <Link href="/get-started?intent=operator" prefetch={false}>
                Offer Services
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { HomeHero }
