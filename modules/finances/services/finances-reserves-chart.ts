import {
  seriesGranularityAnnuallyFirstLevelFinancesReserves,
  seriesGranularityMonthlyFirstLevelFinancesReserves,
  seriesGranularityQuarterlyFirstLevelFinancesReserves,
} from '@/modules/finances/mocks/reserves-waterfall-chart'
import { type Analytic, type Budget, GRANULARITY_OPTIONS } from '@/modules/finances/types'

interface FinancesReservesChartService {
  granularity: GRANULARITY_OPTIONS
  year: string
  lod: number
  budgets: Budget[]
}

const fetchAnalytics = async ({
  granularity,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  year,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lod,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  budgets,
}: FinancesReservesChartService): Promise<Analytic> => {
  let series
  switch (granularity) {
    case GRANULARITY_OPTIONS.Annually:
      series = seriesGranularityAnnuallyFirstLevelFinancesReserves
      break
    case GRANULARITY_OPTIONS.Quarterly:
      series = seriesGranularityQuarterlyFirstLevelFinancesReserves
      break
    case GRANULARITY_OPTIONS.Monthly:
      series = seriesGranularityMonthlyFirstLevelFinancesReserves
      break
    default:
      series = seriesGranularityMonthlyFirstLevelFinancesReserves
  }

  await new Promise((resolve) => setTimeout(resolve, 800))
  return { series } as Analytic
}

export const getFinancesReservesAnalytics = async (props: FinancesReservesChartService) =>
  fetchAnalytics(props)
