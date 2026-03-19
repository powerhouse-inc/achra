'use client'

import { useQuery } from '@tanstack/react-query'
import sortBy from 'lodash/sortBy'
import { useQueryState } from 'nuqs'
import { useMemo } from 'react'
import {
  reservesCategoriesParser,
  reservesGranularityParser,
} from '@/modules/finances/lib/finances-reserves-chart-search-params'
import {
  buildWaterfallSeries,
  getAnalyticForWaterfall,
  processDataForWaterfall,
  sumValuesFromMapKeys,
} from '@/modules/finances/lib/reserves-waterfall-chart-utils'
import { type Budget, GRANULARITY_OPTIONS } from '@/modules/finances/types'
import { formatBudgetName } from '@/modules/finances/utils'
import type { Option } from '@/modules/shared/components/form/multiselect'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { getFinancesReservesAnalytics } from '../../services/finances-reserves-chart'

const DEFAULT_GRANULARITY = GRANULARITY_OPTIONS.Monthly

const granularityOptions = [
  { label: GRANULARITY_OPTIONS.Monthly, value: GRANULARITY_OPTIONS.Monthly },
  { label: GRANULARITY_OPTIONS.Quarterly, value: GRANULARITY_OPTIONS.Quarterly },
  { label: GRANULARITY_OPTIONS.Annually, value: GRANULARITY_OPTIONS.Annually },
] as const

const apiGranularityByValue: Record<
  (typeof granularityOptions)[number]['value'],
  'monthly' | 'quarterly' | 'annual'
> = {
  [GRANULARITY_OPTIONS.Monthly]: 'monthly',
  [GRANULARITY_OPTIONS.Quarterly]: 'quarterly',
  [GRANULARITY_OPTIONS.Annually]: 'annual',
}

interface UseReservesWaterfallChartParams {
  codePath: string
  budgets: Budget[]
  allBudgets: Budget[]
  year: string
}

function useReservesWaterfallChart({
  codePath,
  budgets,
  allBudgets,
  year,
}: Readonly<UseReservesWaterfallChartParams>) {
  const isMobile = useMediaQuery({ to: 'sm' })
  const isTablet = useMediaQuery({ from: 'sm', to: 'lg' })
  const isDesktop1024 = useMediaQuery({ from: 'lg', to: 'xl' })

  const [selectedGranularity, setSelectedGranularity] = useQueryState(
    'reservesGranularity',
    reservesGranularityParser,
  )
  const [activeElements, setActiveElements] = useQueryState(
    'reservesCategories',
    reservesCategoriesParser,
  )

  const levelOfDetail = codePath.split('/').length + 1
  const granularityApiValue = apiGranularityByValue[selectedGranularity]

  const titleChart = useMemo(() => {
    const levelBudget = allBudgets.find((budget) => budget.codePath === codePath)
    const titleLevelBudget = formatBudgetName(levelBudget?.name ?? '')
    return titleLevelBudget === '' || titleLevelBudget === 'No-Name' ? 'Reserves' : titleLevelBudget
  }, [allBudgets, codePath])

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['reserves-waterfall-analytics', selectedGranularity, year, codePath, levelOfDetail],
    queryFn: async () =>
      getFinancesReservesAnalytics({
        granularity: selectedGranularity,
        year,
        lod: levelOfDetail,
        budgets,
      }),
  })

  const { summaryValues, totalToStartEachBudget } = useMemo(
    () => getAnalyticForWaterfall(budgets, granularityApiValue, analytics, allBudgets),
    [allBudgets, analytics, budgets, granularityApiValue],
  )

  const selectAll = useMemo(() => Array.from(summaryValues.keys()), [summaryValues])
  const activeElementsFiltered = useMemo(
    () => (activeElements ?? []).filter((element) => selectAll.includes(element)),
    [activeElements, selectAll],
  )
  const selectedElements = activeElements === null ? selectAll : activeElementsFiltered

  const series = useMemo(() => {
    const valuesToShow = sumValuesFromMapKeys(summaryValues, selectedElements, granularityApiValue)
    const dataReady = processDataForWaterfall(
      valuesToShow,
      selectedElements,
      totalToStartEachBudget,
    )
    return buildWaterfallSeries(dataReady, isMobile, isTablet, isDesktop1024)
  }, [
    isDesktop1024,
    isMobile,
    isTablet,
    selectedElements,
    granularityApiValue,
    summaryValues,
    totalToStartEachBudget,
  ])

  const categoryOptions: Option[] = useMemo(() => {
    const newElements = selectAll
      .filter((selectAllPath) => !allBudgets.some((budget) => budget.codePath === selectAllPath))
      .map((element) => ({
        name: element,
        codePath: element,
      }))
    const combinedElementsFromAnalytics = [...budgets, ...newElements]

    return sortBy(combinedElementsFromAnalytics, (subBudget) => subBudget.name).map((budget) => ({
      label: formatBudgetName(budget.name),
      value: budget.codePath,
    }))
  }, [allBudgets, budgets, selectAll])

  const selectedCategoryOptions = categoryOptions.filter((item) =>
    selectedElements.includes(item.value),
  )
  const canReset = selectedGranularity !== DEFAULT_GRANULARITY || activeElements !== null

  const onReset = () => {
    void setSelectedGranularity(null)
    void setActiveElements(null)
  }

  const onSetSelectedGranularity = (value: (typeof granularityOptions)[number]['value']) => {
    void setSelectedGranularity(value)
  }

  const onSetActiveElements = (values: string[] | null) => {
    void setActiveElements(values)
  }

  return {
    titleChart,
    isLoading,
    series,
    selectedGranularity: granularityApiValue,
    selectedGranularityFilter: selectedGranularity,
    setSelectedGranularity: onSetSelectedGranularity,
    granularityOptions,
    categoryOptions,
    selectedCategoryOptions,
    setActiveElements: onSetActiveElements,
    canReset,
    onReset,
  }
}

export { useReservesWaterfallChart }
