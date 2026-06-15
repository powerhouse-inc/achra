'use client'

import { cn } from '@achra/ui/lib/utils'
import dynamic from 'next/dynamic'
import { useMediaQuery } from 'usehooks-ts'
import { useNearViewport } from '@/shared/hooks/use-near-viewport'
import {
  GRADIENT_FLOW_PRESETS,
  type GradientFlowPresetName,
} from '@/shared/lib/gradient-flow-presets'

// The WebGL scene (ogl) loads in its own chunk, on the client only. Until it
// paints (or when the user prefers reduced motion / WebGL is unavailable /
// `animated` is off) the static CSS gradient below is the background.
const GradientFlowCanvas = dynamic(
  async () => import('./gradient-flow-canvas').then((mod) => mod.GradientFlowCanvas),
  {
    ssr: false,
  },
)

interface GradientFlowProps {
  preset: GradientFlowPresetName
  /** Disable the WebGL layer and keep only the static gradient */
  animated?: boolean
  className?: string
}

function GradientFlow({ preset, animated = true, className }: GradientFlowProps) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', {
    defaultValue: true,
    initializeWithValue: false,
  })
  const [ref, near] = useNearViewport<HTMLDivElement>()
  const { config, fallbackStyle } = GRADIENT_FLOW_PRESETS[preset]

  return (
    <div ref={ref} className={cn('pointer-events-none', className)} aria-hidden>
      <div className="absolute inset-0" style={fallbackStyle} />
      {animated && near && !prefersReducedMotion && (
        <GradientFlowCanvas config={config} className="absolute inset-0" />
      )}
    </div>
  )
}

export { GradientFlow }
