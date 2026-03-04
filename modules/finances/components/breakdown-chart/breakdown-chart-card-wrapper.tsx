import { Suspense } from 'react'
import { BreakdownChartCard } from './breakdown-chart-card'
import { BreakdownChartDataFetcherKeyed } from './breakdown-chart-data-fetcher-keyed'
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
        <BreakdownChartDataFetcherKeyed params={params} searchParams={searchParams} />
      </Suspense>
    </BreakdownChartCard>
  )
}
