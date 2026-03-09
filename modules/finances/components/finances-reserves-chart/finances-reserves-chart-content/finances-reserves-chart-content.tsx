'use client'

import { ATLAS_BUDGETS, BUDGETS } from '../../../mocks'
import { getBudgetsByCodePath, getCodePathFromParams } from '../../../utils'
import { FinancesReservesChart } from '../finances-reserves-chart'
import { useFinancesReservesChart } from '../use-finances-reserves-chart'
import type { Analytic, GRANULARITY_OPTIONS } from '../../../types'

interface FinancesReservesChartContentProps {
  params?: string[]
  year: string
  granularity: GRANULARITY_OPTIONS
  analytics: Analytic
  activeElements?: string[]
}

export function FinancesReservesChartContent({
  params,
  year,
  granularity,
  analytics,
  activeElements,
}: Readonly<FinancesReservesChartContentProps>) {
  const codePath = getCodePathFromParams(params)
  const budgets = getBudgetsByCodePath(codePath, BUDGETS)
  const { series } = useFinancesReservesChart({
    analytics,
    budgets,
    allBudgets: ATLAS_BUDGETS,
    granularity,
    activeElements,
  })

  return (
    <div className="flex w-full flex-col gap-4">
      <FinancesReservesChart year={year} selectedGranularity={granularity} series={series} />
    </div>
  )
}
