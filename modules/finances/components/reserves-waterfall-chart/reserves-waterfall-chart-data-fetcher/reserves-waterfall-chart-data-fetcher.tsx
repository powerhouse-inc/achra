import { getBudgetsByCodePath, getCodePathFromParams } from '@/modules/finances/lib'
import { financesReservesChartSearchParamsCache } from '@/modules/finances/lib/finances-reserves-chart-search-params'
import { ATLAS_BUDGETS } from '@/modules/finances/mocks/group-wallets'
import { ReservesWaterfallChart } from '../reserves-waterfall-chart'

interface ReservesWaterfallChartDataFetcherProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

async function ReservesWaterfallChartDataFetcher({
  params,
  searchParams,
}: Readonly<ReservesWaterfallChartDataFetcherProps>) {
  const { financeSlug } = await params
  const { year } = financesReservesChartSearchParamsCache.parse(await searchParams)
  const codePath = getCodePathFromParams(financeSlug)
  const budgets = getBudgetsByCodePath(codePath, ATLAS_BUDGETS)

  return (
    <ReservesWaterfallChart
      codePath={codePath}
      budgets={budgets}
      allBudgets={ATLAS_BUDGETS}
      year={year}
    />
  )
}

export { ReservesWaterfallChartDataFetcher }
