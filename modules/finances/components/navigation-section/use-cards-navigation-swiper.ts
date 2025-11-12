'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { adjustElementHeights } from '@/shared/lib/swiper-utils'
import type { SwiperRef } from 'swiper/react'

interface UseCardsNavigationSwiperProps {
  showSwiper: boolean
  cardsCount: number
}

export function useCardsNavigationSwiper({
  showSwiper,
  cardsCount,
}: UseCardsNavigationSwiperProps) {
  const [isSwiperReady, setIsSwiperReady] = useState(false)
  const swiperRef = useRef<SwiperRef>(null)

  const adjustCardHeights = useCallback(() => {
    if (showSwiper) {
      adjustElementHeights('.swiper-milestone-card')
    } else {
      adjustElementHeights('.navigation-card-height')
    }
  }, [showSwiper])

  const handleAfterInit = useCallback(() => {
    requestAnimationFrame(() => {
      adjustCardHeights()
      requestAnimationFrame(() => {
        setIsSwiperReady(true)
      })
    })
  }, [adjustCardHeights])

  useEffect(() => {
    const adjustHeights = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          adjustCardHeights()
        })
      })
    }

    const timeoutId = setTimeout(adjustHeights, 100)

    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(adjustHeights, 150)
    }

    window.addEventListener('resize', handleResize)

    if (showSwiper && isSwiperReady) {
      adjustHeights()
    }

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
    }
  }, [showSwiper, adjustCardHeights, cardsCount, isSwiperReady])

  return { swiperRef, isSwiperReady, handleAfterInit, adjustCardHeights }
}
