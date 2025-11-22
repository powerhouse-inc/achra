import React from 'react'
import {
  getPercentdoughnutDataItem,
  getShortCode,
  threeDigitsPrecisionHumanization,
} from '@/modules/finances/components/summary-section/doughnut-chart/utils'
import { cn } from '@/modules/shared/lib/utils'
import type { DoughnutSeries } from '../types'

interface ItemLegendDoughnutProps {
  isDeepLevel?: boolean
  changeAlignment: boolean
  doughnutData: DoughnutSeries
  toggleSeriesVisibility: (seriesName: string) => void
  onLegendItemLeave: (legendName: string) => void
  onLegendItemHover: (legendName: string) => void
}

export function ItemLegendDoughnut({
  changeAlignment,
  isDeepLevel = true,
  doughnutData,
  onLegendItemHover,
  onLegendItemLeave,
  toggleSeriesVisibility,
}: ItemLegendDoughnutProps) {
  const valueRounded = threeDigitsPrecisionHumanization(doughnutData.value, true)

  const percentDisplay = getPercentdoughnutDataItem(doughnutData)

  return (
    <div
      key={doughnutData.name}
      onClick={() => {
        toggleSeriesVisibility(doughnutData.name)
      }}
      onMouseEnter={() => {
        onLegendItemHover(doughnutData.name)
      }}
      onMouseLeave={() => {
        onLegendItemLeave(doughnutData.name)
      }}
      className={cn(
        // Base layout & sizing
        'group flex cursor-pointer gap-x-4 text-xs transition-colors duration-200',
        isDeepLevel ? 'gap-0.25' : 'gap-none',
        // Conditional Layout based on isDeepLevel
        isDeepLevel ? 'flex-row' : 'flex-col',
        // Width constraints
        changeAlignment ? 'min-w-0' : 'min-w-47.5',
      )}
    >
      {/* Icon With Name Wrapper */}
      <div className="flex flex-row items-center gap-1.5">
        {/* Legend Icon */}
        <div
          className="h-2 w-2 min-w-2 shrink-0 rounded-full"
          style={{ backgroundColor: doughnutData.color || 'blue' }}
        />

        {/* Name Or Code */}
        <div
          className={cn(
            // Typography & Base
            'leading-[15px] font-semibold',
            // Text Overflow logic
            'overflow-hidden text-ellipsis whitespace-nowrap',
            // Width logic
            isDeepLevel ? 'w-fit' : 'w-42.5',
            isDeepLevel ? 'xl:text-xs xl:leading-3.75' : 'xl:text-sm/6',
          )}
        >
          {isDeepLevel ? getShortCode(doughnutData.code) : doughnutData.name}
        </div>
      </div>

      {/* Value Description Wrapper */}
      <div
        className={cn(
          'flex text-xs font-medium',
          // Spacing
          isDeepLevel ? 'ml-1' : 'ml-3.5',
          // Line Height
          isDeepLevel ? 'leading-6' : 'leading-normal',
          // Text overflow revert for DeepLevel
          isDeepLevel && 'overflow-visible text-clip whitespace-normal',
          // Responsive Logic
          isDeepLevel ? 'xl:text-xs/3.75' : 'xl:text-sm/normal',
        )}
      >
        {/* Percent */}
        <span
          className={cn(
            'transition-colors',
            // Colors
            'text-foreground/50',
            // Hover
            'group-hover:text-foreground',
          )}
        >
          {`(${percentDisplay}%)`}
        </span>

        {/* Container Value */}
        <div className="ml-1 flex">
          <span
            className={cn(
              'transition-colors',
              // Colors
              'text-foreground/50',
              'group-hover:text-foreground',
            )}
          >
            {valueRounded.value} {valueRounded.suffix}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ItemLegendDoughnut
