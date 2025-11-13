'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { adjustElementHeights } from '@/shared/lib/swiper-utils'
import type { SwiperRef } from 'swiper/react'

interface UseCardsNavigationSwiperProps {
  cardsCount: number
}

export function useCardsNavigationSwiper({ cardsCount }: UseCardsNavigationSwiperProps) {
  const isMobile = useMediaQuery({ to: 'md' })
  const isTabletOrDesktop1024 = useMediaQuery({ from: 'md', to: 'xl' })

  const MAX_ITEMS = isMobile ? 2 : isTabletOrDesktop1024 ? 3 : 5
  const showSwiper = cardsCount > MAX_ITEMS
  const isDeepLevel = cardsCount > 6
  const itemsCount = cardsCount
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
    adjustCardHeights()
    requestAnimationFrame(() => {
      setIsSwiperReady(true)
    })
  }, [adjustCardHeights])

  const debouncedAdjustHeights = useDebounceCallback(() => {
    requestAnimationFrame(() => {
      adjustCardHeights()
    })
  }, 150)

  useEffect(() => {
    const adjustHeights = () => {
      requestAnimationFrame(() => {
        adjustCardHeights()
      })
    }

    const timeoutId = setTimeout(adjustHeights, 100)

    const handleResize = () => {
      debouncedAdjustHeights()
    }

    window.addEventListener('resize', handleResize)

    if (isSwiperReady) {
      adjustHeights()
    }

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
    }
  }, [showSwiper, adjustCardHeights, cardsCount, isSwiperReady, debouncedAdjustHeights])

  return {
    swiperRef,
    isSwiperReady,
    handleAfterInit,
    adjustCardHeights,
    showSwiper,
    isDeepLevel,
    itemsCount,
  }
}
