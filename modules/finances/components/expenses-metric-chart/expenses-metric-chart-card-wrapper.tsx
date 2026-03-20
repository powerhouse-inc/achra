import { Suspense } from 'react'
import { FinancesSections } from '@/modules/finances/components/config/const'
import { encodeSectionId } from '@/modules/shared/components/section-activation'
import { SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'
import { ExpensesMetricChartCard } from './expenses-metric-chart-card'
import { ExpensesMetricChartDataFetcher } from './expenses-metric-data-fetcher'
import { ExpensesMetricChartSkeleton } from './skeletons/expenses-metric-chart-skeleton'

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
    <Suspense fallback={<ExpensesMetricChartSkeleton />}>
      <section
        className={cn(SCROLL_MT_CLASSES)}
        id={encodeSectionId(FinancesSections.ExpensesMetricChart)}
      >
        <ExpensesMetricChartCard>
          <ExpensesMetricChartDataFetcher params={params} searchParams={searchParams} />
        </ExpensesMetricChartCard>
      </section>
    </Suspense>
  )
}
