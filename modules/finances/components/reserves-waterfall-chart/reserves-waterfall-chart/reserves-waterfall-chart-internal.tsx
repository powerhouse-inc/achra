'use client'

import type { Budget } from '@/modules/finances/types'
import { BasicSelect } from '@/modules/shared/components/basic-select/basic-select'
import { MultipleSelector } from '@/modules/shared/components/form/multiselect'
import { Button } from '@/modules/shared/components/ui/button'
import { Card } from '@/modules/shared/components/ui/card'
import { TitleSectionFinances } from '../../title-section-finances'
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

  return (
    <Card className="bg-popover flex w-full flex-col gap-4 border-none p-2 pb-4 shadow-xs md:gap-6 md:p-4 lg:px-6 lg:pb-6">
      <div className="flex flex-row flex-wrap items-start justify-between gap-2">
        <TitleSectionFinances
          title={titleChart}
          hash="reserves-waterfall-chart"
          tooltipContent={TOOLTIP_CONTENT}
          range={`Jan - Dec ${year}`}
        />
        <div className="flex w-full flex-wrap items-center justify-end gap-3 md:w-auto md:flex-nowrap">
          <Button
            variant="ghost"
            className="text-muted-foreground"
            onClick={onReset}
            disabled={!canReset}
          >
            Reset Filters
          </Button>
          <BasicSelect
            label="Granularity"
            value={granularityOptions.find((option) => option.value === selectedGranularity)?.label}
            placeholder="Monthly"
            options={granularityOptions.map((option) => option.label)}
            onValueChange={(selectedLabel) => {
              const option = granularityOptions.find((item) => item.label === selectedLabel)
              if (option) {
                setSelectedGranularity(option.value)
              }
            }}
            className="min-w-38"
          />
          <MultipleSelector
            options={categoryOptions}
            value={selectedCategoryOptions}
            onChange={(values) => {
              const selectedValues = values.map((item) => item.value)
              setActiveElements(
                selectedValues.length === categoryOptions.length ? null : selectedValues,
              )
            }}
            placeholder="All Categories"
            className="bg-background min-w-60"
            enableSelectAll
            selectAllLabel="All Categories"
          />
        </div>
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
