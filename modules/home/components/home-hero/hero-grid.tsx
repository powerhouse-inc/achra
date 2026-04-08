'use client'

import { useEffect, useRef } from 'react'

const SPOTLIGHT_SIZE = 218
const GRID_SIZE = 13

const MASK_IMAGE = `radial-gradient(closest-side, ${[
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
]
  .map(([pct, alpha]) => `rgba(255,255,255,${alpha}) ${pct}%`)
  .join(', ')})`

const GRID_BG = [
  'linear-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)',
  'linear-gradient(90deg, rgba(255, 255, 255, 0.25) 1px, transparent 1px)',
].join(', ')

function HeroGrid() {
  const spotRef = useRef<HTMLDivElement>(null)
  const rafId = useRef(0)

  useEffect(() => {
    const spot = spotRef.current
    if (!spot) return

    const section = spot.closest('section')
    if (!section) return

    function onMove(e: MouseEvent) {
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        if (!spot) return
        const rect = section!.getBoundingClientRect()
        const x = e.clientX - rect.left - SPOTLIGHT_SIZE / 2
        const y = e.clientY - rect.top - SPOTLIGHT_SIZE / 2
        spot.style.transform = `translate(${x}px, ${y}px)`
        spot.style.opacity = '1'
      })
    }

    function onLeave() {
      cancelAnimationFrame(rafId.current)
      if (!spot) return
      spot.style.opacity = '0'
    }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(rafId.current)
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={spotRef}
      className="pointer-events-none absolute top-0 left-0 transition-opacity duration-300 ease-out"
      style={{
        width: SPOTLIGHT_SIZE,
        height: SPOTLIGHT_SIZE,
        backgroundColor: 'rgba(250, 249, 247, 0.51)',
        backgroundImage: GRID_BG,
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        maskImage: MASK_IMAGE,
        WebkitMaskImage: MASK_IMAGE,
        opacity: 0,
      }}
    />
  )
}

export { HeroGrid }
