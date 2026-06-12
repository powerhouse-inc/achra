'use client'

import { cn } from '@achra/ui/lib/utils'
import dynamic from 'next/dynamic'
import { useMediaQuery } from 'usehooks-ts'
import type { CSSProperties } from 'react'

// The WebGL scene (ogl) loads in its own chunk, on the client only. Until it
// paints (or when the user prefers reduced motion / WebGL is unavailable) the
// static gradients below approximate the two streaks.
const LightBeamsCanvas = dynamic(
  async () => import('./light-beams-canvas').then((mod) => mod.LightBeamsCanvas),
  {
    ssr: false,
  },
)

// static stand-in for the beams (artwork colors, mirrors the shader)
const FALLBACK_STYLE: CSSProperties = {
  backgroundColor: '#06070d',
  backgroundImage: [
    'linear-gradient(118deg, transparent 32%, rgba(46,191,255,0.55) 42%, transparent 52%)',
    'linear-gradient(242deg, transparent 30%, rgba(199,89,255,0.55) 40%, transparent 50%)',
  ].join(', '),
}

interface LightBeamsProps {
  className?: string
}

/**
 * Powerhouse-brand backdrop: cyan and magenta light streaks converging on a
 * near-black field, matching the powerhouse.io hero.
 */
function LightBeams({ className }: LightBeamsProps) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', {
    defaultValue: true,
    initializeWithValue: false,
  })

  return (
    <div className={cn('pointer-events-none', className)} aria-hidden>
      <div className="absolute inset-0" style={FALLBACK_STYLE} />
      {!prefersReducedMotion && <LightBeamsCanvas className="absolute inset-0" />}
    </div>
  )
}

export { LightBeams }
