'use client'

import { cn } from '@achra/ui/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { createAuroraScene } from '@/shared/lib/hero-aurora-scene'

interface AuroraCanvasProps {
  className?: string
  /** Element the silk dims behind so text on top keeps contrast */
  clearanceRef?: React.RefObject<HTMLElement | null>
}

function AuroraCanvas({ className, clearanceRef }: AuroraCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sceneHandle = createAuroraScene(container, {
      onFirstFrame: () => {
        setReady(true)
      },
      clearanceElement: clearanceRef?.current,
    })
    if (!sceneHandle) return

    // only animate while the hero is on screen
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) sceneHandle.start()
      else sceneHandle.stop()
    })
    observer.observe(container)

    return () => {
      observer.disconnect()
      sceneHandle.dispose()
    }
  }, [clearanceRef])

  return (
    <div
      ref={containerRef}
      className={cn(
        // a slight blur + scale hide the reduced render resolution and the
        // alpha falloff at the canvas edges without losing the silk detail
        'scale-[1.01] transform-gpu blur-[2px] transition-opacity duration-1000',
        ready ? 'opacity-100' : 'opacity-0',
        className,
      )}
    />
  )
}

export { AuroraCanvas }
