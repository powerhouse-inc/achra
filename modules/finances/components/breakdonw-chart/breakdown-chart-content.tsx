'use client'
import { ATLAS_BUDGETS, BUDGETS } from '../../mocks'
import { getBudgetsByCodePath, getCodePathFromParams } from '../../utils'
import BreakdownChart from './breakdown-chart'
import LegendBreakDownChart from './breakdown-legend'
import useBreakdownChart from './useBreakdownChart'
import type { BreakdownBudgetAnalytic } from './types'

interface BreakdownChartContentProps {
  params?: string[]
  budgetsAnalytics: BreakdownBudgetAnalytic
}

export default function BreakdownChartContent({
  params,
  budgetsAnalytics,
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
  } = useBreakdownChart({
    budgetsAnalytics,
    budgets,
    allBudgets: ATLAS_BUDGETS,
    year: '2025',
    codePath,
  })

  return (
    <div className="flex w-full flex-col gap-4 sm:gap-6 md:flex-row 2xl:gap-8">
      <div className="flex min-w-0 flex-1">
        <BreakdownChart
          refBreakDownChart={refBreakDownChart}
          year="2025"
          selectedGranularity="monthly"
          series={series}
          selectedMetric="Budget"
        />
      </div>

      <div className="flex w-full md:w-65.75 lg:w-90.5 xl:w-88.75 2xl:w-98">
        <LegendBreakDownChart
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
