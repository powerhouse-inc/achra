import { Suspense } from 'react'
import { FinancesSections } from '@/modules/finances/lib/constants'
import { encodeSectionId } from '@/modules/shared/components/section-activation'
import { SCROLL_MT_CLASSES } from '@/modules/shared/lib/constants'
import { cn } from '@/modules/shared/lib/utils'
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

function BreakdownChartCardWrapper({ params, searchParams }: Readonly<SummarySectionProps>) {
  return (
    <section
      className={cn(SCROLL_MT_CLASSES)}
      id={encodeSectionId(FinancesSections.BreakdownChart)}
    >
      <BreakdownChartCard>
        <Suspense fallback={<BreakdownChartSkeleton />}>
          <BreakdownChartDataFetcherKeyed params={params} searchParams={searchParams} />
        </Suspense>
      </BreakdownChartCard>
    </section>
  )
}

export { BreakdownChartCardWrapper }
