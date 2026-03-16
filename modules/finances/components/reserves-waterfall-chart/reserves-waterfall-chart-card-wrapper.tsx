import { Suspense } from 'react'
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
      <ReservesWaterfallChartDataFetcher params={params} searchParams={searchParams} />
    </Suspense>
  )
}

export { ReservesWaterfallChartCardWrapper }
