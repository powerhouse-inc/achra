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
        'group flex cursor-pointer gap-x-4 text-xs transition-colors duration-200',
        isDeepLevel ? 'gap-0.25' : 'gap-none',
        isDeepLevel ? 'flex-row' : 'flex-col',
        changeAlignment ? 'min-w-0' : 'min-w-47.5',
      )}
    >
      <div className="flex flex-row items-center gap-1.5">
        <div
          className="h-2 w-2 min-w-2 shrink-0 rounded-full"
          style={{ backgroundColor: doughnutData.color || 'blue' }}
        />

        <div
          className={cn(
            'leading-3.75 font-semibold',
            'overflow-hidden text-ellipsis whitespace-nowrap',
            isDeepLevel ? 'w-fit' : 'w-42.5',
            isDeepLevel ? 'xl:text-xs xl:leading-3.75' : 'xl:text-sm/6',
          )}
        >
          {isDeepLevel ? getShortCode(doughnutData.code) : doughnutData.name}
        </div>
      </div>

      <div
        className={cn(
          'flex text-xs font-medium',
          isDeepLevel ? 'ml-1' : 'ml-3.5',
          isDeepLevel ? 'leading-6' : 'leading-normal',
          isDeepLevel && 'overflow-visible text-clip whitespace-normal',
          isDeepLevel ? 'xl:text-xs/3.75' : 'xl:text-sm/normal',
        )}
      >
        <span
          className={cn('transition-colors', 'text-foreground/50', 'group-hover:text-foreground')}
        >
          {`(${percentDisplay}%)`}
        </span>

        <div className="ml-1 flex">
          <span
            className={cn('transition-colors', 'text-foreground/50', 'group-hover:text-foreground')}
          >
            {valueRounded.value} {valueRounded.suffix}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ItemLegendDoughnut
