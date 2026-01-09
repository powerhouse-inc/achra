import { BUDGETS } from '../../mocks'
import { getCodePathFromParams, getLevelOfDetail } from '../../utils'
import BreakdownChartContent from './breakdown-chart-content'
import { getBudgetsAnalytics } from './service/service'

interface SummarySectionProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
  searchParams: Promise<{
    year: string
  }>
}

export async function BreakdownChartDataFetcher({
  params,
  searchParams,
}: Readonly<SummarySectionProps>) {
  const { financeSlug } = await params
  const year = (await searchParams).year

  const codePath = getCodePathFromParams(financeSlug)
  const levelNumber = getLevelOfDetail(codePath)
  const budgetsAnalytics = await getBudgetsAnalytics({
    granularity: 'monthly',
    year,
    select: 'budget',
    lod: levelNumber.levelOfDetail,
    budgets: BUDGETS,
  })

  return <BreakdownChartContent params={financeSlug} budgetsAnalytics={budgetsAnalytics} />
}
