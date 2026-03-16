'use client'

import type { Budget } from '@/modules/finances/types'
import { Card } from '@/modules/shared/components/ui/card'
import { TitleSectionFinances } from '../../title-section-finances'
import { ReservesWaterfallChartFilters } from '../reserves-waterfall-chart-filters'
import { ReservesWaterfallChartGraph } from '../reserves-waterfall-chart-graph'
import { ReservesWaterfallChartSkeleton } from '../reserves-waterfall-chart-skeleton'
import { useReservesWaterfallChart } from '../use-reserves-waterfall-chart'

const TOOLTIP_CONTENT = (
  <div className="flex flex-col gap-2">
    <p className="m-0">
      Monitor the dynamics of Sky&apos;s reserves with precision using this interactive financial
      chart.
    </p>
    <p className="m-0">
      It displays detailed inflows, outflows, and net balances, providing a clear picture of fiscal
      health. Customize the analysis by filtering specific data points and adjusting the timeline to
      suit your needs.
    </p>
    <p className="m-0">
      Utilize this tool to identify trends in reserve movements, evaluate the sustainability of
      reserves, and guide strategic financial planning.
    </p>
  </div>
)

interface ReservesWaterfallChartInternalProps {
  codePath: string
  budgets: Budget[]
  allBudgets: Budget[]
  year: string
}

function ReservesWaterfallChartInternal({
  codePath,
  budgets,
  allBudgets,
  year,
}: Readonly<ReservesWaterfallChartInternalProps>) {
  const {
    titleChart,
    isLoading,
    series,
    selectedGranularity,
    selectedGranularityFilter,
    setSelectedGranularity,
    granularityOptions,
    categoryOptions,
    selectedCategoryOptions,
    setActiveElements,
    canReset,
    onReset,
  } = useReservesWaterfallChart({
    codePath,
    budgets,
    allBudgets,
    year,
  })

  const granularityValues = granularityOptions.map((option) => option.value)

  return (
    <Card className="bg-popover flex w-full flex-col gap-4 border-none p-2 pb-4 shadow-xs md:gap-6 md:p-4 lg:px-6 lg:pb-6">
      <div className="flex flex-row flex-wrap items-start justify-between gap-2">
        <TitleSectionFinances
          title={titleChart}
          hash="reserves-waterfall-chart"
          tooltipContent={TOOLTIP_CONTENT}
          range={`Jan - Dec ${year}`}
        />
        <ReservesWaterfallChartFilters
          granularityValue={selectedGranularityFilter}
          granularityOptions={granularityValues}
          onGranularityChange={(selectedValue) => {
            const option = granularityOptions.find((item) => item.value === selectedValue)
            if (option) {
              setSelectedGranularity(option.value)
            }
          }}
          categoryOptions={categoryOptions}
          selectedCategoryOptions={selectedCategoryOptions}
          setActiveElements={setActiveElements}
          canReset={canReset}
          onReset={onReset}
        />
      </div>
      {isLoading ? (
        <ReservesWaterfallChartSkeleton />
      ) : (
        <ReservesWaterfallChartGraph
          year={year}
          selectedGranularity={selectedGranularity}
          series={series}
        />
      )}
    </Card>
  )
}

export { ReservesWaterfallChartInternal }
