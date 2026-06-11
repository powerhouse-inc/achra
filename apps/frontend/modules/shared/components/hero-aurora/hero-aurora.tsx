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
}

function HeroAurora({ className }: HeroAuroraProps) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', {
    defaultValue: true,
    initializeWithValue: false,
  })

  return (
    <div className={cn('pointer-events-none', className)} aria-hidden>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-xl dark:opacity-0"
        style={{ backgroundImage: `url(${HERO_AURORA_POSTER_DATA_URL})` }}
      />
      {!prefersReducedMotion && <AuroraCanvas className="absolute inset-0" />}
    </div>
  )
}

export { HeroAurora }
