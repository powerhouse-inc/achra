'use client'

import { useEffect, useRef } from 'react'
import { useWindowSize } from 'usehooks-ts'

export default function useDesktopTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { width } = useWindowSize()
  const gapPx = 20

  useEffect(() => {
    if (!containerRef.current) return

    const wrappers = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>('[data-milestone-order]'),
    )
      .map((el) => ({ el, order: Number(el.dataset.milestoneOrder) || 0 }))
      .sort((a, b) => a.order - b.order)

    const centerX = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect()
      return rect.left + rect.width / 2
    }

    wrappers.forEach((item, i) => {
      const conn = item.el.querySelector<HTMLElement>('.desktop-timeline-line')
      if (!conn) return
      if (i === wrappers.length - 1) {
        conn.style.width = '0px'
        return
      }
      const x1 = centerX(item.el)
      const x2 = centerX(wrappers[i + 1].el)
      const widthPx = Math.max(0, x2 - x1 - gapPx * 2)
      conn.style.width = `${widthPx}px`
    })
  }, [width])

  return { containerRef }
}
