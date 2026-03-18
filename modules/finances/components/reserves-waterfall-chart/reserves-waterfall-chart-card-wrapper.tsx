import { Suspense } from 'react'
import { FinancesSections } from '@/modules/finances/components/config/const'
import { encodeSectionId } from '@/modules/shared/components/section-activation'
import { SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'
import { ReservesWaterfallChartDataFetcher } from './reserves-waterfall-chart-data-fetcher'
import { ReservesWaterfallChartSkeleton } from './reserves-waterfall-chart-skeleton'

interface ReservesWaterfallChartCardWrapperProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function ReservesWaterfallChartCardWrapper({
  params,
  searchParams,
}: Readonly<ReservesWaterfallChartCardWrapperProps>) {
  return (
    <Suspense fallback={<ReservesWaterfallChartSkeleton />}>
      <section
        className={cn(SCROLL_MT_CLASSES)}
        id={encodeSectionId(FinancesSections.ReservesWaterfallChart)}
      >
        <ReservesWaterfallChartDataFetcher params={params} searchParams={searchParams} />
      </section>
    </Suspense>
  )
}

export { ReservesWaterfallChartCardWrapper }
