import { BUDGETS } from '../../mocks'
import { getCodePathFromParams, getLevelOfDetail } from '../../utils'
import BreakdownChartCard from './breakdown-chart-card'
import { getBudgetsAnalytics } from './service/service'

interface SummarySectionProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
}

export async function BreakdownChartCardWrapper({ params }: Readonly<SummarySectionProps>) {
  const { financeSlug } = await params
  const codePath = getCodePathFromParams(financeSlug)
  const levelNumber = getLevelOfDetail(codePath)
  const budgetsAnalytics = await getBudgetsAnalytics({
    granularity: 'monthly',
    year: '2025',
    select: 'budget',
    lod: levelNumber.levelOfDetail,
    budgets: BUDGETS,
  })

  return <BreakdownChartCard params={financeSlug} budgetsAnalytics={budgetsAnalytics} />
}
