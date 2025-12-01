'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import type { ScopeOfWork_Milestone } from '@/modules/__generated__/graphql/switchboard-generated'
import { adjustElementHeights } from '@/shared/lib/swiper-utils'
import type { SwiperRef } from 'swiper/react'

interface UseRoadmapSwiperProps {
  milestones: ScopeOfWork_Milestone[]
}

export default function useRoadmapSwiper({ milestones }: UseRoadmapSwiperProps) {
  const [isSwiperReady, setIsSwiperReady] = useState(false)
  const [slidesPerView, setSlidesPerView] = useState(1)
  const [snapIndex, setSnapIndex] = useState(0)
  const swiperRef = useRef<SwiperRef>(null)

  const adjustCardHeights = useCallback(() => {
    adjustElementHeights('.swiper-milestone-card')
    adjustElementHeights('.milestone-title-section')
    adjustElementHeights('.milestone-latest-key-results')
  }, [])

  const updateSlidesPerView = useCallback(() => {
    const swiperInstance = swiperRef.current?.swiper
    if (!swiperInstance) {
      return
    }

    const currentSlidesPerView = swiperInstance.slidesPerViewDynamic()
    setSlidesPerView(currentSlidesPerView)
  }, [])

  const updateSnapIndex = useCallback(() => {
    const swiperInstance = swiperRef.current?.swiper
    if (!swiperInstance) {
      return
    }

    setSnapIndex(swiperInstance.snapIndex)
  }, [])

  const handleAfterInit = useCallback(() => {
    adjustCardHeights()
    updateSlidesPerView()
    updateSnapIndex()
    requestAnimationFrame(() => {
      setIsSwiperReady(true)
    })
  }, [adjustCardHeights, updateSlidesPerView, updateSnapIndex])

  const totalSlides = useMemo(() => milestones.length, [milestones])

  const { snapStartIndex, snapEndIndex } = useMemo(() => {
    const effectiveSlidesPerView = Math.max(1, Math.round(slidesPerView) || 1)

    if (totalSlides === 0) {
      return { snapStartIndex: 0, snapEndIndex: -1 }
    }

    const rawStartIndex = snapIndex * effectiveSlidesPerView
    const lastPossibleStart = Math.max(totalSlides - effectiveSlidesPerView, 0)
    const startIndex = Math.min(rawStartIndex, lastPossibleStart)
    const endIndex = Math.min(startIndex + effectiveSlidesPerView - 1, totalSlides - 1)

    return { snapStartIndex: startIndex, snapEndIndex: endIndex }
  }, [snapIndex, slidesPerView, totalSlides])

  return {
    swiperRef,
    isSwiperReady,
    slidesPerView,
    snapIndex,
    snapStartIndex,
    snapEndIndex,
    handleAfterInit,
    adjustCardHeights,
    updateSlidesPerView,
    updateSnapIndex,
  }
}
