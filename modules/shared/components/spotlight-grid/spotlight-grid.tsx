'use client'

import { useEffect, useRef } from 'react'

const GRADIENT_STOPS = [
  [0, 1],
  [7.142857142857142, 0.9789983639784623],
  [14.285714285714285, 0.9088278450944927],
  [21.428571428571427, 0.787619875773089],
  [28.57142857142857, 0.6357943292532582],
  [35.714285714285715, 0.48571949984761886],
  [42.857142857142854, 0.35784565916401334],
  [50, 0.2546057917934377],
  [57.14285714285714, 0.17447253499994986],
  [64.28571428571429, 0.11349623920978047],
  [71.42857142857143, 0.06814405260956846],
  [78.57142857142857, 0.03632969091995619],
  [85.71428571428571, 0.01520817299024202],
  [92.85714285714286, 0.003670836304081604],
  [100, 0],
] as const

const LERP_SPEED = 0.06

function buildHighlightGrid(opacity: number) {
  return [
    `linear-gradient(rgba(255, 255, 255, ${opacity}) 1px, transparent 1px)`,
    `linear-gradient(90deg, rgba(255, 255, 255, ${opacity}) 1px, transparent 1px)`,
  ].join(', ')
}

interface SpotlightGridProps {
  /** Radius of the spotlight circle in px */
  spotlightRadius?: number
  /** Size of each grid cell in px */
  gridSize?: number
  /** CSS selector passed to `closest()` to find the mouse-tracking container */
  containerSelector?: string
  /** Opacity of the highlight grid lines (0–1) */
  highlightOpacity?: number
  /** Whether to render a faint always-visible base grid underneath */
  showBaseGrid?: boolean
}

function SpotlightGrid({
  spotlightRadius = 90,
  gridSize = 12,
  containerSelector = 'section',
  highlightOpacity = 0.5,
  showBaseGrid = false,
}: SpotlightGridProps) {
  const spotRef = useRef<HTMLDivElement>(null)
  const rafId = useRef(0)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const active = useRef(false)

  useEffect(() => {
    const spot = spotRef.current
    if (!spot) return

    const container = spot.closest(containerSelector)
    if (!container) return

    function buildMask(x: number, y: number) {
      const stops = GRADIENT_STOPS.map(([pct, alpha]) => `rgba(255,255,255,${alpha}) ${pct}%`).join(
        ', ',
      )
      return `radial-gradient(${spotlightRadius}px circle at ${x}px ${y}px, ${stops})`
    }

    function tick() {
      if (!spot || !active.current) return

      current.current.x += (target.current.x - current.current.x) * LERP_SPEED
      current.current.y += (target.current.y - current.current.y) * LERP_SPEED

      const mask = buildMask(current.current.x, current.current.y)
      spot.style.maskImage = mask
      spot.style.webkitMaskImage = mask

      rafId.current = requestAnimationFrame(tick)
    }

    function onMove(e: MouseEvent) {
      const rect = spot!.getBoundingClientRect()
      target.current.x = e.clientX - rect.left
      target.current.y = e.clientY - rect.top

      if (!active.current) {
        current.current.x = target.current.x
        current.current.y = target.current.y
        active.current = true
        spot!.style.opacity = '1'
        rafId.current = requestAnimationFrame(tick)
      }
    }

    function onLeave() {
      active.current = false
      cancelAnimationFrame(rafId.current)
      if (!spot) return
      spot.style.opacity = '0'
    }

    container.addEventListener('mousemove', onMove as EventListener)
    container.addEventListener('mouseleave', onLeave)
    return () => {
      active.current = false
      cancelAnimationFrame(rafId.current)
      container.removeEventListener('mousemove', onMove as EventListener)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [containerSelector, spotlightRadius])

  const sizeValue = `${gridSize}px ${gridSize}px`

  return (
    <>
      {showBaseGrid && (
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage: [
              'linear-gradient(var(--border) 1px, transparent 1px)',
              'linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: sizeValue,
          }}
          aria-hidden
        />
      )}
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          backgroundImage: buildHighlightGrid(highlightOpacity),
          backgroundSize: sizeValue,
          opacity: 0,
        }}
        aria-hidden
      />
    </>
  )
}

export { SpotlightGrid }
export type { SpotlightGridProps }
