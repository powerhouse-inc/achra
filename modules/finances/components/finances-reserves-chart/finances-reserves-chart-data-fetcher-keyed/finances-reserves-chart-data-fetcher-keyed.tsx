import { financesReservesChartSearchParamsCache } from '@/modules/finances/lib/finances-reserves-chart-search-params'
import { FinancesReservesChartDataFetcher } from '../finances-reserves-chart-data-fetcher'

interface FinancesReservesChartDataFetcherKeyedProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function FinancesReservesChartDataFetcherKeyed({
  params,
  searchParams,
}: Readonly<FinancesReservesChartDataFetcherKeyedProps>) {
  const { reservesGranularity } = financesReservesChartSearchParamsCache.parse(await searchParams)

  return (
    <FinancesReservesChartDataFetcher
      key={reservesGranularity}
      params={params}
      searchParams={searchParams}
    />
  )
}
