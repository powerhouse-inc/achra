'use client'

import { useCallback, useRef, useState } from 'react'
import type { SwiperRef } from 'swiper/react'

export default function useRoadmapSwiper() {
  const [isSwiperReady, setIsSwiperReady] = useState(false)
  const swiperRef = useRef<SwiperRef>(null)

  const adjustElementHeights = useCallback((className: string) => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(className))
    if (elements.length > 0) {
      elements.forEach((element) => {
        element.style.height = 'auto'
      })

      let maxHeight = 0
      elements.forEach((element) => {
        const height = element.getBoundingClientRect().height
        if (height > maxHeight) {
          maxHeight = height
        }
      })

      elements.forEach((element) => {
        element.style.height = `${maxHeight}px`
      })
    }
  }, [])

  const adjustCardHeights = useCallback(() => {
    adjustElementHeights('.swiper-milestone-card')
    adjustElementHeights('.milestone-title-section')
    adjustElementHeights('.milestone-latest-key-results')
  }, [adjustElementHeights])

  const handleAfterInit = useCallback(() => {
    adjustCardHeights()
    setIsSwiperReady(true)
  }, [adjustCardHeights])

  return { swiperRef, isSwiperReady, handleAfterInit, adjustCardHeights }
}
