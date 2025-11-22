import React from 'react'
import type { DoughnutSeries } from '@/modules/finances/components/summary-section/doughnut-chart/types'
import { sortDoughnutSeriesByValue } from '@/modules/finances/components/summary-section/doughnut-chart/utils'
import { cn } from '@/modules/shared/lib/utils'
import { ItemLegendDoughnut } from './card-legend-item'

interface CardLegendProps {
  isDeepLevel?: boolean
  changeAlignment: boolean
  doughnutSeriesData: DoughnutSeries[]
  toggleSeriesVisibility: (seriesName: string) => void
  onLegendItemLeave: (legendName: string) => void
  onLegendItemHover: (legendName: string) => void
}

export function CardLegend({
  changeAlignment,
  isDeepLevel = true,
  doughnutSeriesData,
  onLegendItemHover,
  onLegendItemLeave,
  toggleSeriesVisibility,
}: CardLegendProps) {
  const sortedDoughnutSeries = sortDoughnutSeriesByValue(doughnutSeriesData)

  return (
    <div
      className={cn(
        'flex flex-col flex-wrap',
        'max-h-38.75 w-auto max-w-full',
        isDeepLevel ? 'gap-1' : 'gap-2',
        isDeepLevel ? 'xl:gap-y-2.5' : 'xl:gap-y-2',

        changeAlignment || isDeepLevel ? 'justify-start' : 'justify-center',
        'xl:gap-x-6',
      )}
    >
      {sortedDoughnutSeries.map((data) => (
        <ItemLegendDoughnut
          key={data.name}
          changeAlignment={changeAlignment}
          doughnutData={data}
          onLegendItemHover={onLegendItemHover}
          onLegendItemLeave={onLegendItemLeave}
          toggleSeriesVisibility={toggleSeriesVisibility}
          isDeepLevel={isDeepLevel}
        />
      ))}
    </div>
  )
}

export default CardLegend
