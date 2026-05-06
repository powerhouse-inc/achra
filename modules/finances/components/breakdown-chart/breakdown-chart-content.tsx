'use client'
import { getBudgetsByCodePath, getCodePathFromParams } from '@/modules/finances/lib/utils'
import { ATLAS_BUDGETS, BUDGETS } from '../../mocks'
import { BreakdownChart } from './breakdown-chart'
import { BreakdownLegend } from './breakdown-legend'
import { useBreakdownChart } from './use-breakdown-chart'
import type { BreakdownBudgetAnalytic, GRANULARITY_OPTIONS, METRIC_OPTIONS } from '../../types'

interface BreakdownChartContentProps {
  params?: string[]
  budgetsAnalytics: BreakdownBudgetAnalytic
  year: string
  granularity: GRANULARITY_OPTIONS
  metric: METRIC_OPTIONS
}

function BreakdownChartContent({
  params,
  budgetsAnalytics,
  year,
  granularity,
  metric,
}: Readonly<BreakdownChartContentProps>) {
  const codePath = getCodePathFromParams(params)
  const budgets = getBudgetsByCodePath(codePath, BUDGETS)
  const {
    series,
    showScrollAndToggle,
    handleToggleSeries,
    handleChangeSwitch,
    isChecked,
    refBreakDownChart,
    onLegendItemHover,
    onLegendItemLeave,
    showLegendValue,
    selectedGranularity,
    selectedMetric,
  } = useBreakdownChart({
    budgetsAnalytics,
    budgets,
    allBudgets: ATLAS_BUDGETS,
    year,
    codePath,
    granularity,
    metric,
  })
  return (
    <div className="flex w-full flex-col gap-4 sm:gap-6 md:flex-row 2xl:gap-8">
      <div className="flex min-w-0 flex-1">
        <BreakdownChart
          refBreakDownChart={refBreakDownChart}
          year={year}
          selectedGranularity={selectedGranularity}
          series={series}
          selectedMetric={selectedMetric}
          key={selectedGranularity}
        />
      </div>

      <div className="flex w-full md:w-65.75 lg:w-90.5 xl:w-88.75 2xl:w-98">
        <BreakdownLegend
          series={series}
          handleToggleSeries={handleToggleSeries}
          onLegendItemHover={onLegendItemHover}
          onLegendItemLeave={onLegendItemLeave}
          showLegendValue={showLegendValue}
          showScrollAndToggle={showScrollAndToggle}
          isChecked={isChecked}
          handleChangeSwitch={handleChangeSwitch}
        />
      </div>
    </div>
  )
}

export { BreakdownChartContent }
