import { getBreakdownAnalytics } from '@/modules/finances/lib/breakdown-chart-utils'
import {
  seriesGranularityAnnuallyFirstLevel,
  seriesGranularityMonthlyFirtsLevel,
  seriesGranularityQuarterlyFirstLevel,
} from '@/modules/finances/mocks/breakdown-chart'
import { type Analytic, type Budget, GRANULARITY_OPTIONS } from '@/modules/finances/types'

interface BreakdownChartService {
  granularity: GRANULARITY_OPTIONS
  year: string
  select: string
  lod: number
  budgets: Budget[]
}

// This function Will recive the granularity, year, select, lod
// For now, it returns a mock response
const fetchAnalytics = async ({
  granularity,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  year,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  select,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lod,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  budgets,
}: BreakdownChartService): Promise<Analytic> => {
  let series
  switch (granularity) {
    case GRANULARITY_OPTIONS.Annually:
      series = seriesGranularityAnnuallyFirstLevel
      break
    case GRANULARITY_OPTIONS.Quarterly:
      series = seriesGranularityQuarterlyFirstLevel
      break
    case GRANULARITY_OPTIONS.Monthly:
      series = seriesGranularityMonthlyFirtsLevel
      break
    default:
      series = seriesGranularityMonthlyFirtsLevel
  }
  // Simulate network delay so Suspense skeleton is visible during transitions
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { series } as Analytic
}

export const getBudgetsAnalytics = async ({
  granularity,
  year,
  select,
  lod,
  budgets,
}: BreakdownChartService) => {
  // Need to call getCorrectGranularity to ajust the granularity based on the level of detail
  // const selectGrannularity = getCorrectGranularity(granularity)
  // For now, it returns a mock response
  const analytics = await fetchAnalytics({
    granularity,
    year,
    select,
    lod,
    budgets,
  })

  const analiticsByBudget = getBreakdownAnalytics(analytics, budgets, granularity)
  return analiticsByBudget
}
