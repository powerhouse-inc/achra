'use client'
import { getBudgetsByCodePath, getCodePathFromParams } from '@/modules/finances/lib/utils'
import { ATLAS_BUDGETS, BUDGETS } from '../../../mocks'
import { ExpensesMetricChart } from '../expenses-metric-chart/expenses-metric-chart'
import { ExpensesMetricLegend } from '../expenses-metric-legend'
import { useExpensesMetricChart } from '../use-expenses-metric-chart'
import type { ExpensesMetricBudgetAnalytic } from '../../../types'

interface ExpensesMetricChartContentProps {
  params?: string[]
  budgetsAnalytics: ExpensesMetricBudgetAnalytic
  year: string
}

function ExpensesMetricChartContent({
  params,
  budgetsAnalytics,
  year,
}: Readonly<ExpensesMetricChartContentProps>) {
  const codePath = getCodePathFromParams(params)
  const budgets = getBudgetsByCodePath(codePath, BUDGETS)
  const {
    series,
    showScrollAndToggle,
    handleToggleSeries,
    handleChangeSwitch,
    isChecked,
    refExpensesMetricChart,
    onLegendItemHover,
    onLegendItemLeave,
    showLegendValue,
    selectedGranularity,
    isCumulative,
    cumulativeType,
  } = useExpensesMetricChart({
    budgetsAnalytics,
    budgets,
    allBudgets: ATLAS_BUDGETS,
    codePath,
  })

  return (
    <div className="flex w-full flex-col gap-4 sm:gap-6 md:flex-row 2xl:gap-8">
      <div className="flex min-w-0 flex-1">
        <ExpensesMetricChart
          refExpensesMetricChart={refExpensesMetricChart}
          year={year}
          selectedGranularity={selectedGranularity}
          series={series}
          isCumulative={isCumulative}
          cumulativeType={cumulativeType}
        />
      </div>

      <div className="flex w-full md:w-65.75 lg:w-90.5 xl:w-88.75 2xl:w-98">
        <ExpensesMetricLegend
          series={series}
          handleToggleSeries={handleToggleSeries}
          onLegendItemHover={onLegendItemHover}
          onLegendItemLeave={onLegendItemLeave}
          showLegendValue={showLegendValue}
          showScrollAndToggle={showScrollAndToggle}
          isChecked={isChecked}
          handleChangeSwitch={handleChangeSwitch}
          isCumulative={isCumulative}
        />
      </div>
    </div>
  )
}

export { ExpensesMetricChartContent }
