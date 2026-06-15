'use client'

import { cn } from '@achra/ui/lib/utils'
import dynamic from 'next/dynamic'
import { useMediaQuery } from 'usehooks-ts'
import type { CSSProperties } from 'react'
import { useNearViewport } from '@/shared/hooks/use-near-viewport'

// The WebGL scene (ogl) loads in its own chunk, on the client only. Until it
// paints (or when the user prefers reduced motion / WebGL is unavailable) the
// static gradient below approximates the two silk lobes.
const CardAuroraCanvas = dynamic(
  async () => import('./card-aurora-canvas').then((mod) => mod.CardAuroraCanvas),
  {
    ssr: false,
  },
)

// static stand-in for the two lobes (artwork colors, mirrors the shader)
const FALLBACK_STYLE: CSSProperties = {
  backgroundImage: [
    'radial-gradient(ellipse 42% 90% at 0% 50%, rgba(31,79,245,0.45) 0%, rgba(122,58,255,0.3) 48%, transparent 76%)',
    'radial-gradient(ellipse 42% 90% at 100% 50%, rgba(122,58,255,0.4) 0%, rgba(248,154,208,0.35) 50%, transparent 78%)',
  ].join(', '),
}

interface CardAuroraProps {
  className?: string
}

/**
 * Card-scale aurora: the hero silk adapted for small surfaces — two calm,
 * balanced lobes on the left and right with the center clear for content,
 * plus the hero's cursor ripple effect.
 */
function CardAurora({ className }: CardAuroraProps) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', {
    defaultValue: true,
    initializeWithValue: false,
  })
  const [ref, near] = useNearViewport<HTMLDivElement>()

  return (
    <div ref={ref} className={cn('pointer-events-none', className)} aria-hidden>
      <div className="absolute inset-0 blur-xl" style={FALLBACK_STYLE} />
      {near && !prefersReducedMotion && <CardAuroraCanvas className="absolute inset-0" />}
    </div>
  )
}

export { CardAurora }
