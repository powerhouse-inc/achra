'use client'

import { useEffect } from 'react'
import { useWindowSize } from 'usehooks-ts'

export default function useTimeline() {
  const { width } = useWindowSize()

  useEffect(() => {
    const adjustCardHeights = () => {
      const cards = Array.from(document.querySelectorAll('.swiper-milestone-card'))
      if (cards.length > 0) {
        cards.forEach((card) => {
          ;(card as HTMLElement).style.height = 'auto'
        })

        let maxCardHeight = 0
        cards.forEach((card) => {
          const height = card.getBoundingClientRect().height
          if (height > maxCardHeight) {
            maxCardHeight = height
          }
        })

        cards.forEach((card) => {
          ;(card as HTMLElement).style.height = `${maxCardHeight}px`
        })
      }

      const sections = Array.from(document.querySelectorAll('.milestone-title-section'))
      if (sections.length > 0) {
        sections.forEach((section) => {
          ;(section as HTMLElement).style.height = 'auto'
        })

        let maxSectionHeight = 0
        sections.forEach((section) => {
          const height = section.getBoundingClientRect().height
          if (height > maxSectionHeight) {
            maxSectionHeight = height
          }
        })

        sections.forEach((section) => {
          ;(section as HTMLElement).style.height = `${maxSectionHeight}px`
        })
      }
    }

    adjustCardHeights()
  }, [width])
}
