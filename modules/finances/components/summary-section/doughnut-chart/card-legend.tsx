'use client'

import { cn } from '@/shared/lib/utils'
import type { DoughnutSeries } from './types'

interface CardLegendProps {
  doughnutSeriesData: DoughnutSeries[]
  toggleSeriesVisibility: (seriesName: string) => void
  onLegendItemHover: (legendName: string) => void
  onLegendItemLeave: (legendName: string) => void
  isDeepLevel: boolean
  changeAlignment: boolean
}

export function CardLegend({
  doughnutSeriesData,
  toggleSeriesVisibility,
  onLegendItemHover,
  onLegendItemLeave,
  isDeepLevel,
  changeAlignment,
}: CardLegendProps) {
  return (
    <div
      data-slot="card-legend"
      className={cn(
        'relative flex max-w-full flex-col flex-wrap gap-3.5',
        isDeepLevel && changeAlignment
          ? 'justify-start'
          : changeAlignment
            ? 'justify-start'
            : 'justify-center',
        'xl:gap-4',
      )}
    >
      {doughnutSeriesData.map((item) => {
        const isVisible = item.isVisible !== false
        const displayColor = isVisible ? item.color : 'rgb(204, 204, 204)'

        return (
          <button
            key={item.name}
            data-slot="legend-item"
            type="button"
            onClick={() => {
              toggleSeriesVisibility(item.name)
            }}
            onMouseEnter={() => {
              onLegendItemHover(item.name)
            }}
            onMouseLeave={() => {
              onLegendItemLeave(item.name)
            }}
            className={cn(
              'flex cursor-pointer items-center gap-2 transition-opacity',
              'focus-visible:ring-ring rounded hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
              !isVisible && 'opacity-50',
            )}
            aria-label={`Toggle ${item.name} visibility`}
          >
            <div
              data-slot="legend-color-indicator"
              className="size-3 shrink-0 rounded-full"
              style={{ backgroundColor: displayColor }}
            />
            <span
              data-slot="legend-label"
              className={cn(
                'text-foreground truncate text-sm font-medium',
                !isVisible && 'text-muted-foreground',
              )}
            >
              {item.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
