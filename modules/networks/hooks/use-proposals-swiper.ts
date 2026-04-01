'use client'

import { useCallback, useRef, useState } from 'react'
import type { SwiperRef } from 'swiper/react'

export function useProposalsSwiper() {
  const [isSwiperReady, setIsSwiperReady] = useState(false)
  const swiperRef = useRef<SwiperRef>(null)

  const handleAfterInit = useCallback(() => {
    requestAnimationFrame(() => {
      setIsSwiperReady(true)
    })
  }, [])

  return { swiperRef, isSwiperReady, handleAfterInit }
}
