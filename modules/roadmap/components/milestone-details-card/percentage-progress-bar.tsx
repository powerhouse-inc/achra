'use client'

import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

interface PercentageProgressBarProps {
  value: number
}

function PercentageProgressBar({ value }: PercentageProgressBarProps) {
  const isDesktopQuery = useMediaQuery('(min-width: 1024px)')
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Handle hydration mismatch by ensuring we start with a consistent state
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    setIsDesktop(isDesktopQuery)
  }, [isDesktopQuery])

  // Use desktop as default during SSR to prevent layout shift
  const effectiveIsDesktop = isHydrated ? isDesktop : true

  const circleConfig = useMemo(() => {
    const size = effectiveIsDesktop ? 160 : 96
    const thickness = effectiveIsDesktop ? 40 : 22
    const radius = (size - thickness) / 2
    const circumference = 2 * Math.PI * radius
    const center = size / 2

    return {
      size,
      thickness,
      radius,
      circumference,
      center,
    }
  }, [effectiveIsDesktop])

  const strokeConfig = useMemo(() => {
    const strokeDasharray = circleConfig.circumference
    const strokeDashoffset = circleConfig.circumference - (value / 100) * circleConfig.circumference

    return {
      strokeDasharray,
      strokeDashoffset,
    }
  }, [circleConfig.circumference, value])

  const roundedValue = useMemo(() => Math.round(value), [value])

  const viewBox = useMemo(
    () => `0 0 ${circleConfig.size} ${circleConfig.size}`,
    [circleConfig.size],
  )

  return (
    <div className="relative inline-flex">
      {/* Base circle */}
      <svg
        width={circleConfig.size}
        height={circleConfig.size}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={circleConfig.center}
          cy={circleConfig.center}
          r={circleConfig.radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={circleConfig.thickness}
          className="text-gray-200 dark:text-slate-600"
        />
      </svg>

      {/* Progress circle */}
      <svg
        className="absolute top-0 left-0"
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: 'rotate(-90deg)',
          transition: 'stroke-dashoffset 550ms ease-in-out',
          width: circleConfig.size,
          height: circleConfig.size,
        }}
      >
        <circle
          cx={circleConfig.center}
          cy={circleConfig.center}
          r={circleConfig.radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={circleConfig.thickness}
          strokeDasharray={strokeConfig.strokeDasharray}
          strokeDashoffset={strokeConfig.strokeDashoffset}
          className="text-status-progress"
        />
      </svg>

      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold lg:text-lg">{roundedValue}%</span>
      </div>
    </div>
  )
}

export default PercentageProgressBar
