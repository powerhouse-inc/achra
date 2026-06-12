'use client'

import { cn } from '@achra/ui/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { createLightBeamsScene } from '@/shared/lib/light-beams-scene'

interface LightBeamsCanvasProps {
  className?: string
}

function LightBeamsCanvas({ className }: LightBeamsCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sceneHandle = createLightBeamsScene(container, () => {
      setReady(true)
    })
    if (!sceneHandle) return

    // only animate while on screen
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) sceneHandle.start()
      else sceneHandle.stop()
    })
    observer.observe(container)

    return () => {
      observer.disconnect()
      sceneHandle.dispose()
    }
  }, [])

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

export { LightBeamsCanvas }
