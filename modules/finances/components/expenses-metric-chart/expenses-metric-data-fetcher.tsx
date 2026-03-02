import { BUDGETS } from '../../mocks'
import { getCodePathFromParams, getLevelOfDetail } from '../../utils'
import ExpensesMetricChartContent from './expenses-metric-chart-content'
import { expensesMetricChartSearchParamsCache } from './lib'
import { getBudgetsAnalytics } from './services/service'

interface SummarySectionProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function ExpensesMetricChartDataFetcher({
  params,
  searchParams,
}: Readonly<SummarySectionProps>) {
  const { financeSlug } = await params
  const { metric, year, granularity } = expensesMetricChartSearchParamsCache.parse(
    await searchParams,
  )
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
    <ExpensesMetricChartContent
      params={financeSlug}
      budgetsAnalytics={budgetsAnalytics}
      year={year}
    />
  )
}
