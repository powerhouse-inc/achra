'use client'

import sortBy from 'lodash/sortBy'
import { useMemo, useState } from 'react'
import useSWRImmutable from 'swr/immutable'
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

const DEFAULT_GRANULARITY = 'monthly'

const granularityOptions = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Annually', value: 'annual' },
] as const

const apiGranularityByValue: Record<
  (typeof granularityOptions)[number]['value'],
  GRANULARITY_OPTIONS
> = {
  monthly: GRANULARITY_OPTIONS.Monthly,
  quarterly: GRANULARITY_OPTIONS.Quarterly,
  annual: GRANULARITY_OPTIONS.Annually,
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

  const [activeElements, setActiveElements] = useState<string[] | null>(null)
  const [selectedGranularity, setSelectedGranularity] =
    useState<(typeof granularityOptions)[number]['value']>(DEFAULT_GRANULARITY)

  const levelOfDetail = codePath.split('/').length + 1

  const titleChart = useMemo(() => {
    const levelBudget = allBudgets.find((budget) => budget.codePath === codePath)
    const titleLevelBudget = formatBudgetName(levelBudget?.name ?? '')
    return titleLevelBudget === '' ? 'MakerDAO Finances' : titleLevelBudget
  }, [allBudgets, codePath])

  const { data: analytics, isLoading } = useSWRImmutable(
    [selectedGranularity, year, codePath, levelOfDetail],
    async () =>
      getFinancesReservesAnalytics({
        granularity: apiGranularityByValue[selectedGranularity],
        year,
        lod: levelOfDetail,
        budgets,
      }),
  )

  const { summaryValues, totalToStartEachBudget } = useMemo(
    () => getAnalyticForWaterfall(budgets, selectedGranularity, analytics, allBudgets),
    [allBudgets, analytics, budgets, selectedGranularity],
  )

  const selectAll = useMemo(() => Array.from(summaryValues.keys()), [summaryValues])
  const selectedElements = activeElements ?? selectAll

  const series = useMemo(() => {
    const valuesToShow = sumValuesFromMapKeys(summaryValues, selectedElements, selectedGranularity)
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
    selectedGranularity,
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
  const canReset =
    selectedGranularity !== DEFAULT_GRANULARITY ||
    (activeElements !== null && activeElements.length !== selectAll.length)

  const onReset = () => {
    setSelectedGranularity(DEFAULT_GRANULARITY)
    setActiveElements(null)
  }

  return {
    titleChart,
    isLoading,
    series,
    selectedGranularity,
    setSelectedGranularity,
    granularityOptions,
    categoryOptions,
    selectedCategoryOptions,
    setActiveElements,
    canReset,
    onReset,
  }
}

export { useReservesWaterfallChart }
