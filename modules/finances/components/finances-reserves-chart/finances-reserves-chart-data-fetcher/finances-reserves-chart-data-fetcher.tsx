import { financesReservesChartSearchParamsCache } from '@/modules/finances/lib/finances-reserves-chart-search-params'
import { getFinancesReservesAnalytics } from '@/modules/finances/services/finances-reserves-chart'
import { BUDGETS } from '../../../mocks'
import { getCodePathFromParams, getLevelOfDetail } from '../../../utils'
import { FinancesReservesChartContent } from '../finances-reserves-chart-content'

interface FinancesReservesChartDataFetcherProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function FinancesReservesChartDataFetcher({
  params,
  searchParams,
}: Readonly<FinancesReservesChartDataFetcherProps>) {
  const { financeSlug } = await params
  const { reservesGranularity, reservesCategories, year } =
    financesReservesChartSearchParamsCache.parse(await searchParams)

  const codePath = getCodePathFromParams(financeSlug)
  const levelNumber = getLevelOfDetail(codePath)
  const analytics = await getFinancesReservesAnalytics({
    granularity: reservesGranularity,
    year,
    lod: levelNumber.levelOfDetail,
    budgets: BUDGETS,
  })

  return (
    <FinancesReservesChartContent
      params={financeSlug}
      year={year}
      granularity={reservesGranularity}
      analytics={analytics}
      activeElements={reservesCategories}
    />
  )
}
