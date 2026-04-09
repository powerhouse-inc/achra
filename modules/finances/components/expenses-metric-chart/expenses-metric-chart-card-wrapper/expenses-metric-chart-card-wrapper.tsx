import { Suspense } from 'react'
import { ExpensesMetricChartCard } from '../expenses-metric-chart-card'
import { ExpensesMetricChartDataFetcher } from '../expenses-metric-data-fetcher'
import { ExpensesMetricChartSkeleton } from '../skeletons/expenses-metric-chart-skeleton'

interface SummarySectionProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function ExpensesMetricChartCardWrapper({ params, searchParams }: Readonly<SummarySectionProps>) {
  return (
    <ExpensesMetricChartCard>
      <Suspense fallback={<ExpensesMetricChartSkeleton />}>
        <ExpensesMetricChartDataFetcher params={params} searchParams={searchParams} />
      </Suspense>
    </ExpensesMetricChartCard>
  )
}

export { ExpensesMetricChartCardWrapper }
