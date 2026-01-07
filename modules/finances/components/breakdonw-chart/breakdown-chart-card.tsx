'use client'
import { useRef } from 'react'
import { Card } from '@/shared/components/ui/card'
import { ATLAS_BUDGETS, BUDGETS } from '../../mocks'
import { getBudgetsByCodePath, getCodePathFromParams } from '../../utils'
import BreakdownChart from './breakdown-chart'
import TitleFilterSection from './title-filter-section'

import useBreakdownChart from './useBreakdownChart'
import type { BreakdownBudgetAnalytic } from './types'
import type { EChartsOption } from 'echarts-for-react'
interface BreakdownChartCardProps {
  params?: string[]
  budgetsAnalytics?: BreakdownBudgetAnalytic
}

export default function BreakdownChartCard({
  params,
  budgetsAnalytics,
}: Readonly<BreakdownChartCardProps>) {
  const refBreakDownChart = useRef<EChartsOption>(null)
  const codePath = getCodePathFromParams(params)

  const budgets = getBudgetsByCodePath(codePath, BUDGETS)
  const { series } = useBreakdownChart({
    budgetsAnalytics,
    budgets,
    allBudgets: ATLAS_BUDGETS,
    year: '2025',
    codePath,
  })

  return (
    <Card className="bg-popover flex w-full flex-col gap-4 border-none p-2 pb-4 shadow-xs md:p-4 lg:p-6">
      <TitleFilterSection />
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

        <div className="flex w-full md:w-65.75 lg:w-90.5 xl:w-88.75 2xl:w-98">legend</div>
      </div>
    </Card>
  )
}
