'use client'

import { cn } from '@achra/ui/lib/utils'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { type ReactNode, useRef, useState } from 'react'
import { GOVERNANCE_ROWS } from './governance-rows'

// Scroll distance (in viewport heights) allotted to each step of the story.
const STEP_VH = 110

interface GovernanceScrollytellingProps {
  /** Section header, pinned above the story so it stays visible on every step */
  header?: ReactNode
}

/**
 * Pinned scroll story (desktop): the panel sticks for one viewport while the
 * three governance rows swap in place — screenshots crossfade on the left, the
 * copy and bullets swap on the right, and a numbered progress rail tracks the
 * journey. Everything is transform/opacity, driven by native scroll (no
 * hijacking).
 */
function GovernanceScrollytelling({ header }: GovernanceScrollytellingProps) {
  const rows = GOVERNANCE_ROWS
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const index = Math.min(rows.length - 1, Math.max(0, Math.floor(value * rows.length)))
    setActive(index)
  })

  function jumpToStep(index: number) {
    const container = containerRef.current
    if (!container) return
    const top = container.getBoundingClientRect().top + window.scrollY
    const stepHeight = (container.offsetHeight - window.innerHeight) / rows.length
    window.scrollTo({ top: top + stepHeight * (index + 0.5), behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: `${rows.length * STEP_VH}vh` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-10 pt-24 pb-6 xl:gap-14">
        {header}
        <div className="grid w-full grid-cols-2 items-center gap-x-16 xl:gap-x-24">
          {/* screenshot stack */}
          <div className="relative">
            <div aria-hidden className="bg-primary/15 absolute -inset-8 rounded-full blur-3xl" />
            <div className="relative aspect-[720/420]">
              {rows.map((row, index) => (
                <motion.div
                  key={row.id}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: active === index ? 1 : 0,
                    scale: active === index ? 1 : 0.94,
                    y: active === index ? 0 : active > index ? -24 : 24,
                    filter: active === index ? 'blur(0px)' : 'blur(10px)',
                  }}
                  transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <div className="from-primary/30 via-border to-fusion/30 h-full w-full rounded-2xl bg-linear-to-br p-px">
                    <div className="bg-card h-full w-full overflow-hidden rounded-[calc(1rem-1px)] shadow-lg">
                      <Image
                        src={row.imageSrc}
                        alt={row.imageAlt}
                        width={row.imageWidth}
                        height={row.imageHeight}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* progress rail + copy */}
          <div className="flex gap-8 xl:gap-10">
            <div className="relative flex flex-col items-center" aria-hidden>
              <div className="bg-border relative h-full w-px overflow-hidden rounded-full">
                <motion.div
                  className="from-primary to-fusion absolute inset-x-0 top-0 origin-top bg-linear-to-b"
                  style={{ scaleY: railScale, height: '100%' }}
                />
              </div>
              <div className="absolute inset-y-0 flex flex-col justify-between py-1">
                {rows.map((row, index) => (
                  <button
                    key={row.id}
                    type="button"
                    tabIndex={-1}
                    onClick={() => {
                      jumpToStep(index)
                    }}
                    className={cn(
                      'bg-background flex size-9 cursor-pointer items-center justify-center rounded-full border font-mono text-xs font-semibold transition-colors duration-300',
                      active === index
                        ? 'border-primary text-primary shadow-primary'
                        : 'border-border text-muted-foreground',
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>

            {/* all steps share one grid cell so the column sizes to the tallest */}
            <div className="grid flex-1 items-center [&>*]:col-start-1 [&>*]:row-start-1">
              {rows.map((row, index) => (
                <motion.div
                  key={row.id}
                  initial={false}
                  animate={{
                    opacity: active === index ? 1 : 0,
                    y: active === index ? 0 : active > index ? -28 : 28,
                  }}
                  transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className={cn(
                    'flex min-w-0 flex-col gap-5',
                    active !== index && 'pointer-events-none',
                  )}
                  aria-hidden={active !== index}
                >
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-2xl font-bold tracking-tight xl:text-3xl">
                    <span className="from-primary to-fusion bg-linear-to-r bg-clip-text text-transparent">
                      {row.labelStart}
                    </span>
                    <span className="text-foreground">{row.labelEnd}</span>
                  </div>
                  <p className="text-foreground/80 text-base leading-relaxed text-pretty xl:text-lg">
                    {row.description}
                  </p>
                  <ul className="flex list-none flex-col gap-3">
                    {row.bulletItems.map((item, bulletIndex) => {
                      const Icon = item.icon
                      return (
                        <motion.li
                          key={item.id}
                          initial={false}
                          animate={{
                            opacity: active === index ? 1 : 0,
                            x: active === index ? 0 : 16,
                          }}
                          transition={{
                            duration: 0.4,
                            delay: active === index ? 0.12 + bulletIndex * 0.06 : 0,
                            ease: [0.21, 0.47, 0.32, 0.98],
                          }}
                          className="text-foreground/80 flex items-center gap-3 text-sm leading-relaxed xl:text-base"
                        >
                          <div className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-lg">
                            <Icon className="text-primary size-5" aria-hidden />
                          </div>
                          {item.content}
                        </motion.li>
                      )
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { GovernanceScrollytelling }
