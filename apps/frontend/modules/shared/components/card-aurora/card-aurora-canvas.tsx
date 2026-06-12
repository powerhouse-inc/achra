'use client'

import { cn } from '@achra/ui/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { createCardAuroraScene } from '@/shared/lib/card-aurora-scene'

interface CardAuroraCanvasProps {
  className?: string
}

function CardAuroraCanvas({ className }: CardAuroraCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sceneHandle = createCardAuroraScene(container, () => {
      setReady(true)
    })
    if (!sceneHandle) return

    // only animate while the card is on screen
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
        // a slight blur + scale hide the reduced render resolution and the
        // alpha falloff at the canvas edges without losing the silk detail
        'scale-[1.01] transform-gpu blur-[2px] transition-opacity duration-1000',
        ready ? 'opacity-100' : 'opacity-0',
        className,
      )}
    />
  )
}

export { CardAuroraCanvas }
