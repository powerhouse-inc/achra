'use client'

import { useCallback, useRef, useState } from 'react'
import type { SwiperRef } from 'swiper/react'

export default function useProposalsSwiper() {
  const [isSwiperReady, setIsSwiperReady] = useState(false)
  const swiperRef = useRef<SwiperRef>(null)

  const handleAfterInit = useCallback(() => {
    setIsSwiperReady(true)
  }, [])

  return { swiperRef, isSwiperReady, handleAfterInit }
}
