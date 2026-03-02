import type { Analytic, Budget, GRANULARITY_OPTIONS } from '@/modules/finances/types'
import { getBreakdownAnalytics } from '../lib'
import { seriesGranularityMonthlyFirtsLevel } from './mocks'

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
  // This is a work still in progress this values are need when API is ready
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  return Promise.resolve({
    series: seriesGranularityMonthlyFirtsLevel,
  } as Analytic)
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
