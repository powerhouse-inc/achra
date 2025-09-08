'use client'

import { useCallback, useRef } from 'react'
import type { SwiperRef } from 'swiper/react'

export default function useTimelineSwiper() {
  const swiperRef = useRef<SwiperRef>(null)

  const adjustCardHeights = useCallback(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.swiper-milestone-card'))
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

    const sections = Array.from(document.querySelectorAll<HTMLElement>('.milestone-title-section'))
    if (sections.length > 0) {
      sections.forEach((section) => {
        section.style.height = 'auto'
      })

      let maxSectionHeight = 0
      sections.forEach((section) => {
        const height = section.getBoundingClientRect().height
        if (height > maxSectionHeight) {
          maxSectionHeight = height
        }
      })

      sections.forEach((section) => {
        section.style.height = `${maxSectionHeight}px`
      })
    }
  }, [])

  return { adjustCardHeights, swiperRef }
}
