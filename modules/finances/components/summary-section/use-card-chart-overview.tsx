import { useMemo, useState } from 'react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import {
  existingColors,
  formatBudgetName,
  getCorrectMetricValuesOverViewChart,
  hasSubLevels,
  percentageRespectTo,
  removeBudgetWord,
  removePatternAfterSlash,
  transformPathToName,
} from '../../utils'
import { LimitedColorAssigner } from './colors'
import type {
  AnalyticMetric,
  BreakdownBudgetAnalytic,
  Budget,
  BudgetMetricWithName,
  DoughnutSeries,
} from '../../types'

export const useCardChartOverview = (
  budgets: Budget[],
  budgetsAnalytics: BreakdownBudgetAnalytic | undefined,
  levelNumber: number,
  allBudgets: Budget[],
  codePath: string,
) => {
  const isTable = useMediaQuery({ from: 'sm', to: 'lg' })
  const isDesk1024 = useMediaQuery({ from: 'lg', to: 'xl' })
  const isDesk1280 = useMediaQuery({ from: 'xl', to: '2xl' })
  const isUpDesktop1536 = useMediaQuery({ from: '2xl' })

  const isHasSubLevels = hasSubLevels(codePath, allBudgets)

  const [selectedMetric, setSelectedMetric] = useState<AnalyticMetric>('Budget')
  const budgetWithNotChildren = useMemo(() => {
    const data = {
      budget: 0,
      paymentsOnChain: 0,
      forecast: 0,
      actuals: 0,
    }

    if (!budgetsAnalytics) {
      // return 0 values to avoid having an empty UI

      return data
    }

    const values = Object.values(budgetsAnalytics)
    values.forEach((item) => {
      item.forEach((element) => {
        data.budget += element.budget.value
        data.forecast += element.forecast.value
        data.actuals += element.actuals.value
        data.paymentsOnChain += element.paymentsOnChain.value
      })
    })

    return data
  }, [budgetsAnalytics])

  const { metric, budgetMetrics } = useMemo(() => {
    const metric: Record<string, number> = {
      actuals: 0,
      forecast: 0,
      budget: 0,
      paymentsOnChain: 0,
      protocolNetOutflow: 0,
      paymentsOffChainIncluded: 0,
    }

    const budgetMetrics: Record<string, BudgetMetricWithName> = {}
    budgets.forEach((budget) => {
      const budgetKey = budget.codePath
      const budgetName = budget.name
        ? formatBudgetName(budget.name)
        : transformPathToName(budget.codePath)
      const budgetCode = budget.code ? budget.code : transformPathToName(budget.codePath)
      if (budget.codePath in budgetMetrics) {
        const uniqueKey = `${budgetKey}-${budget.id}`
        budgetMetrics[uniqueKey] = {
          name: budgetName,
          code: budgetCode,
          actuals: {
            unit: 'DAI',
            value: 0,
          },
          forecast: {
            unit: 'DAI',
            value: 0,
          },
          budget: {
            unit: 'DAI',
            value: 0,
          },
          paymentsOnChain: {
            unit: 'DAI',
            value: 0,
          },
          paymentsOffChainIncluded: {
            unit: 'DAI',
            value: 0,
          },
          protocolNetOutflow: {
            unit: 'DAI',
            value: 0,
          },
        }
      } else {
        budgetMetrics[budgetKey] = {
          name: budgetName,
          code: budgetCode,
          actuals: {
            unit: 'DAI',
            value: 0,
          },

          forecast: {
            unit: 'DAI',
            value: 0,
          },
          budget: {
            unit: 'DAI',
            value: 0,
          },
          paymentsOnChain: {
            unit: 'DAI',
            value: 0,
          },
          paymentsOffChainIncluded: {
            unit: 'DAI',
            value: 0,
          },
          protocolNetOutflow: {
            unit: 'DAI',
            value: 0,
          },
        }
      }
    })
    if (budgetsAnalytics !== undefined) {
      // Filter budgetsAnalytics to only include budgets from the current level
      const currentLevelBudgetPaths = new Set(budgets.map((budget) => budget.codePath))

      for (const budgetMetricKey of Object.keys(budgetsAnalytics)) {
        const normalizedBudgetMetricKey = removePatternAfterSlash(budgetMetricKey)

        // Only process analytics for budgets at the current level
        if (!currentLevelBudgetPaths.has(normalizedBudgetMetricKey)) {
          continue
        }

        const budgetMetric = budgetsAnalytics[budgetMetricKey]
        const searchCorrectBudget = budgets.length > 0 ? budgets : allBudgets
        const correspondingBudget = searchCorrectBudget.find(
          (budget) => budget.codePath === normalizedBudgetMetricKey,
        )
        // use the name of budget or add label
        const budgetName = correspondingBudget
          ? formatBudgetName(correspondingBudget.name)
          : transformPathToName(budgetMetricKey)
        const budgetCode = correspondingBudget?.code ?? transformPathToName(budgetMetricKey)
        metric.actuals += budgetMetric[0].actuals.value || 0
        metric.forecast += budgetMetric[0].forecast.value || 0
        metric.budget += budgetMetric[0].budget.value || 0
        metric.paymentsOnChain += Math.abs(budgetMetric[0].paymentsOnChain.value || 0)
        metric.protocolNetOutflow += budgetMetric[0].protocolNetOutflow.value || 0
        // Use normalizedBudgetMetricKey to match with budget.codePath from current level
        budgetMetrics[normalizedBudgetMetricKey] = {
          name: budgetName,
          actuals: budgetMetric[0].actuals,
          forecast: budgetMetric[0].forecast,
          budget: budgetMetric[0].budget,
          paymentsOnChain: budgetMetric[0].paymentsOnChain,
          paymentsOffChainIncluded: budgetMetric[0].paymentsOffChainIncluded,
          protocolNetOutflow: budgetMetric[0].protocolNetOutflow,
          code: budgetCode,
        }
      }
    }

    // if we don't have any data, we need to add a default value to avoid having an empty UI
    // this mostly happens on leave nodes (last level)
    if (Object.keys(budgetMetrics).length === 0) {
      const emptyValue = {
        unit: 'DAI',
        value: 0,
      }
      budgetMetrics[codePath] = {
        name: transformPathToName(codePath),
        actuals: emptyValue,
        forecast: emptyValue,
        budget: emptyValue,
        paymentsOnChain: emptyValue,
        paymentsOffChainIncluded: emptyValue,
        protocolNetOutflow: emptyValue,
        code: transformPathToName(codePath),
      }
    }

    return {
      metric,
      budgetMetrics,
    }
  }, [allBudgets, budgets, budgetsAnalytics, codePath])

  const handleSelectedMetric = (metric: AnalyticMetric) => {
    setSelectedMetric(metric)
  }
  const doughnutSeriesData: DoughnutSeries[] = useMemo(() => {
    const colorAssigner = new LimitedColorAssigner(
      Object.keys(budgetMetrics).length,
      existingColors,
    )

    const keys = Object.keys(budgetMetrics)
    return keys.sort().map((item) => {
      let value
      switch (selectedMetric) {
        case 'Actuals':
          value = budgetMetrics[item].actuals.value || 0
          break
        case 'Forecast':
          value = budgetMetrics[item].forecast.value || 0
          break
        case 'PaymentsOnChain':
          value = budgetMetrics[item].paymentsOnChain.value || 0
          break
        case 'ProtocolNetOutflow':
          value = budgetMetrics[item].protocolNetOutflow.value || 0
          break
        case 'Budget':
          value = budgetMetrics[item].budget.value || 0
          break
        default:
          value = budgetMetrics[item].budget.value || 0
          break
      }
      const keyMetricValue = getCorrectMetricValuesOverViewChart(selectedMetric)

      const color =
        keys.length === 1 && value === 0 ? 'rgb(204, 204, 204)' : colorAssigner.getColor(item)
      return {
        name: removeBudgetWord(budgetMetrics[item].name),
        code: budgetMetrics[item].code,
        value,
        originalValue: value,
        metrics: budgetMetrics[item],
        percent: percentageRespectTo(Math.abs(value), metric[keyMetricValue]),
        color,
        isVisible: true,
        originalColor: color,
      }
    })
  }, [budgetMetrics, metric, selectedMetric])

  const numberItems = doughnutSeriesData.length
  const changeAlignment = numberItems > 4

  const showSwiper =
    ((isTable || isDesk1024) && numberItems >= 4) ||
    ((isDesk1280 || isUpDesktop1536) && numberItems >= 10)
  const isDeepLevel = doughnutSeriesData.length > 6

  const numberSliderPerLevel = (() => {
    if (isTable || isDesk1024) {
      return isDeepLevel ? 5 : 3
    }
    if (isDesk1280 || isUpDesktop1536) {
      return numberItems >= 10 ? 12 : 5
    }
    return 5
  })()

  return {
    paymentsOnChain: isHasSubLevels
      ? metric.paymentsOnChain
      : budgetWithNotChildren.paymentsOnChain,
    budgetCap: isHasSubLevels ? metric.budget : budgetWithNotChildren.budget,
    selectedMetric,
    handleSelectedMetric,
    doughnutSeriesData,
    changeAlignment,
    showSwiper,
    numberSliderPerLevel,
  }
}
