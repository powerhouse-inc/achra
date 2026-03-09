import { Suspense } from 'react'
import { FinancesReservesChartCard } from '../finances-reserves-chart-card'
import { FinancesReservesChartDataFetcherKeyed } from '../finances-reserves-chart-data-fetcher-keyed'
import { FinancesReservesChartSkeleton } from '../skeletons/finances-reserves-chart-skeleton'

interface FinancesReservesChartCardWrapperProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export function FinancesReservesChartCardWrapper({
  params,
  searchParams,
}: Readonly<FinancesReservesChartCardWrapperProps>) {
  return (
    <FinancesReservesChartCard>
      <Suspense fallback={<FinancesReservesChartSkeleton />}>
        <FinancesReservesChartDataFetcherKeyed params={params} searchParams={searchParams} />
      </Suspense>
    </FinancesReservesChartCard>
  )
}
