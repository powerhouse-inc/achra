import { breakdownChartSearchParamsCache } from '@/modules/finances/lib/breakdown-chart-search-params'
import { getCodePathFromParams, getLevelOfDetail } from '@/modules/finances/lib/utils'
import { getBudgetsAnalytics } from '@/modules/finances/services/breakdown-chart-service'
import { BUDGETS } from '../../mocks'
import { BreakdownChartContent } from './breakdown-chart-content'

interface SummarySectionProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function BreakdownChartDataFetcher({
  params,
  searchParams,
}: Readonly<SummarySectionProps>) {
  const { financeSlug } = await params
  const { metric, year, granularity } = breakdownChartSearchParamsCache.parse(await searchParams)
  const codePath = getCodePathFromParams(financeSlug)
  const levelNumber = getLevelOfDetail(codePath)
  const budgetsAnalytics = await getBudgetsAnalytics({
    granularity,
    year,
    select: metric,
    lod: levelNumber.levelOfDetail,
    budgets: BUDGETS,
  })

  return (
    <BreakdownChartContent
      params={financeSlug}
      budgetsAnalytics={budgetsAnalytics}
      year={year}
      granularity={granularity}
      metric={metric}
    />
  )
}
