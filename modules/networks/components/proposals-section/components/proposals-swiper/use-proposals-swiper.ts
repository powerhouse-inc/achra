'use client'

import { useCallback, useRef } from 'react'
import type { SwiperRef } from 'swiper/react'

export default function useProposalsSwiper() {
  const swiperRef = useRef<SwiperRef>(null)

  const swiperBreakpoints = {
    375: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 24,
    },
    640: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1280: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
  }

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

  return { adjustCardHeights, swiperRef, swiperBreakpoints }
}
