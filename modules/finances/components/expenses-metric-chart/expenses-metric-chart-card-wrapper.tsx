import { Suspense } from 'react'
import ExpensesMetricChartCard from './expenses-metric-chart-card'
import { ExpensesMetricChartDataFetcher } from './expenses-metric-data-fetcher'
import ExpensesMetricChartSkeleton from './skeleton/ExpensesMetricChartSkeleton'

interface SummarySectionProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export function ExpensesMetricChartCardWrapper({
  params,
  searchParams,
}: Readonly<SummarySectionProps>) {
  return (
    <ExpensesMetricChartCard>
      <Suspense fallback={<ExpensesMetricChartSkeleton />}>
        <ExpensesMetricChartDataFetcher params={params} searchParams={searchParams} />
      </Suspense>
    </ExpensesMetricChartCard>
  )
}
