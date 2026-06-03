'use client'

import type { Budget } from '@/modules/finances/types'
import { QueryClientProvider } from '@/modules/shared/providers/query-client'
import { ReservesWaterfallChartInternal } from './reserves-waterfall-chart-internal/reserves-waterfall-chart-internal'

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
  return (
    <QueryClientProvider>
      <ReservesWaterfallChartInternal
        key={key}
        codePath={codePath}
        budgets={budgets}
        allBudgets={allBudgets}
        year={year}
      />
    </QueryClientProvider>
  )
}
export { ReservesWaterfallChart }
