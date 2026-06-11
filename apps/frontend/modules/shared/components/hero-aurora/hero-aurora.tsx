'use client'

import { cn } from '@achra/ui/lib/utils'
import dynamic from 'next/dynamic'
import { useMediaQuery } from 'usehooks-ts'
import { HERO_AURORA_POSTER_DATA_URL } from '@/shared/lib/constants'

// The WebGL scene (ogl) loads in its own chunk, on the client only.
// Until it paints (or when the user prefers reduced motion / WebGL is
// unavailable) the blurred inline poster below is the background.
const AuroraCanvas = dynamic(
  async () => import('./aurora-canvas').then((mod) => mod.AuroraCanvas),
  {
    ssr: false,
  },
)

interface HeroAuroraProps {
  className?: string
  /** Element the silk dims behind so text on top keeps contrast */
  clearanceRef?: React.RefObject<HTMLElement | null>
}

function HeroAurora({ className, clearanceRef }: HeroAuroraProps) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', {
    defaultValue: true,
    initializeWithValue: false,
  })

  return (
    <div className={cn('pointer-events-none', className)} aria-hidden>
      {/* the poster can't track the measured clearance box, so it dims a
          static center ellipse roughly matching the hero copy instead */}
      <div
        className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_80%,transparent_98%),radial-gradient(ellipse_36%_24%_at_50%_52%,rgba(0,0,0,0.4)_35%,black_95%)] bg-cover bg-center bg-no-repeat [mask-composite:intersect] blur-xl dark:opacity-0"
        style={{ backgroundImage: `url(${HERO_AURORA_POSTER_DATA_URL})` }}
      />
      {!prefersReducedMotion && (
        <AuroraCanvas className="absolute inset-0" clearanceRef={clearanceRef} />
      )}
    </div>
  )
}

export { HeroAurora }
