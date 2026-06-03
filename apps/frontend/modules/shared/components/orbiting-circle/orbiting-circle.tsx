import { cn } from '@achra/ui/lib/utils'
import React from 'react'

export interface OrbitingCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  radiusClassName?: string
  path?: boolean
  iconSize?: number
  speed?: number
}

function OrbitingCircle({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  radiusClassName,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCircleProps) {
  const calculatedDuration = duration / speed
  const radiusStyle: React.CSSProperties = radiusClassName
    ? {}
    : ({ '--radius': radius } as React.CSSProperties)

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className={cn('pointer-events-none absolute inset-0 size-full', radiusClassName)}
          style={radiusStyle}
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            fill="none"
            style={{ r: 'calc(var(--radius) * 1px)' } as React.CSSProperties}
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index
        return (
          <div
            style={
              {
                '--duration': calculatedDuration,
                '--angle': angle,
                '--icon-size': `${iconSize}px`,
                ...radiusStyle,
              } as React.CSSProperties
            }
            className={cn(
              'animate-orbit absolute flex size-(--icon-size) transform-gpu items-center justify-center rounded-full',
              { '[animation-direction:reverse]': reverse },
              radiusClassName,
              className,
            )}
            {...props}
          >
            {child}
          </div>
        )
      })}
    </>
  )
}

export { OrbitingCircle }
