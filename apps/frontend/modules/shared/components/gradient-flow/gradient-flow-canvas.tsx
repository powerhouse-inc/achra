'use client'

import { cn } from '@achra/ui/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { createGradientFlowScene, type GradientFlowConfig } from '@/shared/lib/gradient-flow-scene'

interface GradientFlowCanvasProps {
  config: GradientFlowConfig
  className?: string
}

function GradientFlowCanvas({ config, className }: GradientFlowCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sceneHandle = createGradientFlowScene(container, config, () => {
      setReady(true)
    })
    if (!sceneHandle) return

    // only animate while the background is on screen
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) sceneHandle.start()
      else sceneHandle.stop()
    })
    observer.observe(container)

    return () => {
      observer.disconnect()
      sceneHandle.dispose()
    }
  }, [config])

  return (
    <div
      ref={containerRef}
      className={cn(
        'transition-opacity duration-700',
        ready ? 'opacity-100' : 'opacity-0',
        className,
      )}
    />
  )
}

export { GradientFlowCanvas }
