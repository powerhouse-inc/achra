import { useMemo } from 'react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { getCorrectGranularity } from '../../lib/expenses-metric-chart-utils'
import {
  buildWaterfallSeries,
  getAnalyticForWaterfall,
  processDataForWaterfall,
  sumValuesFromMapKeys,
} from '../../lib/finances-reserves-chart-utils'
import type { Analytic, Budget, GRANULARITY_OPTIONS } from '../../types'

interface UseFinancesReservesChartParams {
  analytics: Analytic
  budgets: Budget[]
  allBudgets: Budget[]
  granularity: GRANULARITY_OPTIONS
  activeElements?: string[]
}

export function useFinancesReservesChart({
  analytics,
  budgets,
  allBudgets,
  granularity,
  activeElements,
}: Readonly<UseFinancesReservesChartParams>) {
  const isMobile = useMediaQuery({ to: 'sm' })
  const isTablet = useMediaQuery({ from: 'sm', to: 'lg' })
  const isDesktop1024 = useMediaQuery({ from: 'lg', to: 'xl' })

  const selectedGranularity = getCorrectGranularity(granularity)

  const { summaryValues, totalToStartEachBudget } = useMemo(
    () => getAnalyticForWaterfall(budgets, selectedGranularity, analytics, allBudgets),
    [allBudgets, analytics, budgets, selectedGranularity],
  )

  const selectAll = useMemo(() => Array.from(summaryValues.keys()), [summaryValues])
  const selectedElements = activeElements?.length ? activeElements : selectAll

  const series = useMemo(() => {
    const valuesToShow = sumValuesFromMapKeys(summaryValues, selectedElements, selectedGranularity)
    const data = processDataForWaterfall(valuesToShow, selectedElements, totalToStartEachBudget)
    return buildWaterfallSeries({
      data,
      isMobile,
      isTablet,
      isDesktop1024,
    })
  }, [
    isDesktop1024,
    isMobile,
    isTablet,
    selectedElements,
    selectedGranularity,
    summaryValues,
    totalToStartEachBudget,
  ])

  return {
    series,
    categories: selectAll,
  }
}
