'use client'

import type { Budget } from '@/modules/finances/types'
import { ReservesWaterfallChartInternal } from './reserves-waterfall-chart-internal'

interface ReservesWaterfallChartProps {
  codePath: string
  budgets: Budget[]
  allBudgets: Budget[]
  year: string
}

function ReservesWaterfallChart({
  codePath,
  budgets,
  allBudgets,
  year,
}: Readonly<ReservesWaterfallChartProps>) {
  const key = `${codePath}-${year}`
  const rootBudgets = budgets.filter((budget) => budget.parentId === null)
  return (
    <ReservesWaterfallChartInternal
      key={key}
      codePath={codePath}
      budgets={rootBudgets}
      allBudgets={allBudgets}
      year={year}
    />
  )
}
export { ReservesWaterfallChart }
