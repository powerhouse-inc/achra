'use client'

import { useCallback, useRef, useState } from 'react'
import { adjustElementHeights } from '@/shared/lib/swiper-utils'
import type { SwiperRef } from 'swiper/react'

function useRoadmapSwiper() {
  const [isSwiperReady, setIsSwiperReady] = useState(false)
  const swiperRef = useRef<SwiperRef>(null)

  const adjustCardHeights = useCallback(() => {
    adjustElementHeights('.swiper-milestone-card')
    adjustElementHeights('.milestone-title-section')
    adjustElementHeights('.milestone-latest-key-results')
  }, [])

  const handleAfterInit = useCallback(() => {
    adjustCardHeights()
    requestAnimationFrame(() => {
      setIsSwiperReady(true)
    })
  }, [adjustCardHeights])

  return {
    swiperRef,
    isSwiperReady,
    handleAfterInit,
    adjustCardHeights,
  }
}

export { useRoadmapSwiper }
