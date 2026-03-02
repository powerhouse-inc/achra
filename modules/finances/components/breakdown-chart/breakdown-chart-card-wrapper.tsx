import { Suspense } from 'react'
import { BreakdownChartCard } from './breakdown-chart-card'
import { BreakdownChartDataFetcher } from './breakdown-data-fetcher'
import { BreakdownChartSkeleton } from './skeleton'

interface SummarySectionProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export function BreakdownChartCardWrapper({ params, searchParams }: Readonly<SummarySectionProps>) {
  return (
    <BreakdownChartCard>
      <Suspense fallback={<BreakdownChartSkeleton />}>
        <BreakdownChartDataFetcher params={params} searchParams={searchParams} />
      </Suspense>
    </BreakdownChartCard>
  )
}
