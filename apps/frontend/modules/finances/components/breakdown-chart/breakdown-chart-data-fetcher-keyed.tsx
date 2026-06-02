import { breakdownChartSearchParamsCache } from '@/modules/finances/lib/breakdown-chart-search-params'
import { BreakdownChartDataFetcher } from './breakdown-data-fetcher'

interface BreakdownChartDataFetcherKeyedProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function BreakdownChartDataFetcherKeyed({
  params,
  searchParams,
}: Readonly<BreakdownChartDataFetcherKeyedProps>) {
  const { granularity } = breakdownChartSearchParamsCache.parse(await searchParams)
  return <BreakdownChartDataFetcher key={granularity} params={params} searchParams={searchParams} />
}
