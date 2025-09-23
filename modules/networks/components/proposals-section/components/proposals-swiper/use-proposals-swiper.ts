'use client'

import { useCallback, useRef } from 'react'
import type { SwiperRef } from 'swiper/react'

export default function useProposalsSwiper() {
  const swiperRef = useRef<SwiperRef>(null)

  const adjustCardHeights = useCallback(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.swiper-proposal-card'))
    if (cards.length > 0) {
      cards.forEach((card) => {
        card.style.height = 'auto'
      })

      let maxCardHeight = 0
      cards.forEach((card) => {
        const height = card.getBoundingClientRect().height
        if (height > maxCardHeight) {
          maxCardHeight = height
        }
      })

      cards.forEach((card) => {
        card.style.height = `${maxCardHeight}px`
      })
    }
  }, [])

  return { adjustCardHeights, swiperRef }
}
