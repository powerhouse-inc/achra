import {
  type Analytic,
  type AnalyticGranularity,
  type AnalyticGranularityForExpensesMetricChart,
  type AnalyticMetric,
  type AnalyticSeries,
  type Budget,
  type BudgetMetric,
  type ExpensesMetricBudgetAnalytic,
  type ExpensesMetricChartSeriesData,
  GRANULARITY_OPTIONS,
  type ValuesDataWithBorder,
} from '../types'
import { newBudgetMetric, setMetric } from '../utils'
import type { CumulativeType } from './expenses-metric-chart-search-params'

export const removeBudgetWord = (name: string) => {
  const wordToRemove = /\s+Budget\s*$/i

  return name.replace(wordToRemove, '')
}

export const getMonthAbbreviationToolTip = (month: number) => {
  const monthKeys = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ]

  const key = monthKeys[month]
  return key
}

export const replaceAllNumberLetOneBeforeDot = (num: number, isShowNegative = false) => {
  // Need to be sure that its negative
  const isNegative = num < 0
  const mathAbsolute = Math.abs(num)

  let result

  if (mathAbsolute < 1000) {
    result = mathAbsolute.toString()
  } else if (mathAbsolute < 1000000) {
    result = `${(mathAbsolute / 1000).toFixed(1).replace(/\.?0+$/g, '')}K`
  } else if (mathAbsolute < 1000000000) {
    result = `${(mathAbsolute / 1000000).toFixed(1).replace(/\.?0+$/g, '')}M`
  } else if (mathAbsolute < 1000000000000) {
    result = `${(mathAbsolute / 1000000000).toFixed(1).replace(/\.?0+$/g, '')}B`
  } else if (mathAbsolute < 1000000000000000) {
    result = `${(mathAbsolute / 1000000000000).toFixed(1).replace(/\.?0+$/g, '')}T`
  } else {
    result = mathAbsolute.toString()
  }

  return isShowNegative && isNegative ? `-${result}` : result
}

export const getLegendValue = (
  seriesElement: ExpensesMetricChartSeriesData,
  isCumulative = false,
) => {
  const points = seriesElement.data.map((item) => item.value ?? 0)

  if (isCumulative) {
    return points.at(-1) ?? 0
  }

  const lastQuarter = points.slice(-3)

  return lastQuarter.reduce((previous, current) => previous + current, 0)
}

export const formatterExpensesMetricChart = (
  granularity: Extract<AnalyticGranularity, 'monthly' | 'quarterly' | 'annual'>,
  isMobile: boolean,
  year: string,
  value: string,
  isLessMobile: boolean,
) => {
  switch (granularity) {
    case 'monthly':
      if (isMobile || isLessMobile) return value
      return value
    case 'quarterly':
      return value
    case 'annual':
      return year
    default:
      return value
  }
}

export const getMonthlyBarChartLabels = (
  isMobile: boolean,
  isWaterfall = false,
  useShortLabels = false,
): string[] => {
  const fullLabels = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ]
  const shortLabels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

  // Select the label set based on the options provided.
  const labels = useShortLabels || isMobile ? shortLabels : fullLabels

  if (isWaterfall) {
    const startLabel = isMobile ? 'S' : 'START'
    const endLabel = isMobile ? 'F' : 'FINISH'
    return [startLabel, ...labels, endLabel].filter(Boolean)
  }

  return labels
}

export const barChartAxisLabelsQuarterly = (isMobile: boolean, isWaterfall = false) => {
  const defaultArray = ['Q’1', 'Q’2', 'Q’3', 'Q’4']

  if (isWaterfall) {
    const start = isMobile ? '' : 'START'
    const finish = isMobile ? '' : 'FINISH'
    defaultArray.unshift(start)
    defaultArray.push(finish)
  }

  return defaultArray
}
const barChartAxisLabelsAnnually = (isMobile: boolean, isWaterfall: boolean) => {
  const defaultArray = ['Year']
  if (isWaterfall) {
    const start = isMobile ? '' : 'START'
    const finish = isMobile ? '' : 'FINISH'
    defaultArray.unshift(start)
    defaultArray.push(finish)
  }
  return defaultArray
}

export const getChartAxisLabelByGranularity = (
  granularity: AnalyticGranularityForExpensesMetricChart,
  isMobile: boolean,
  isWaterfall = false,
  useShortLabels = false,
) => {
  switch (granularity) {
    case 'monthly':
      return getMonthlyBarChartLabels(isMobile, isWaterfall, useShortLabels)
    case 'quarterly':
      return barChartAxisLabelsQuarterly(isMobile, isWaterfall)
    case 'annual':
      return barChartAxisLabelsAnnually(isMobile, isWaterfall)
    default:
      barChartAxisLabelsQuarterly(isMobile, isWaterfall)
  }
}

export const getSelectMetricText = (metric?: AnalyticMetric): string => {
  if (!metric) return 'Budget'
  switch (metric) {
    case 'PaymentsOnChain':
      return 'Net Expenses On-Chain'
    case 'ProtocolNetOutflow':
      return 'Net Protocol Outflow'
    case 'Budget':
      return 'Budget'
    case 'Forecast':
      return 'Forecast'
    case 'Actuals':
      return 'Actuals'
    default:
      return 'Budget'
  }
}

// Create a Budget metric empty for the chart with the correct granularity
export const getArrayAnalytic = (
  granularity: AnalyticGranularityForExpensesMetricChart,
): BudgetMetric[] => {
  const createBudgetMetric = () => ({
    actuals: {
      value: 0,
      unit: 'DAI',
    },
    budget: {
      value: 0,
      unit: 'DAI',
    },
    forecast: {
      value: 0,
      unit: 'DAI',
    },
    paymentsOnChain: {
      value: 0,
      unit: 'DAI',
    },
    paymentsOffChainIncluded: {
      value: 0,
      unit: 'DAI',
    },
    protocolNetOutflow: {
      value: 0,
      unit: 'DAI',
    },
  })

  let arrayLength
  switch (granularity) {
    case 'monthly':
      arrayLength = 12
      break
    case 'quarterly':
      arrayLength = 4
      break
    case 'annual':
      arrayLength = 1
      break
    default:
      arrayLength = 4
  }

  return Array.from({ length: arrayLength }, createBudgetMetric)
}

export const getCorrectMetric = (
  budgetMetric: BudgetMetric,
  selectedMetric: AnalyticMetric,
): ValuesDataWithBorder => {
  let metricKey: keyof BudgetMetric
  switch (selectedMetric) {
    case 'Budget':
      metricKey = 'budget'
      break
    case 'Actuals':
      metricKey = 'actuals'
      break
    case 'Forecast':
      metricKey = 'forecast'
      break
    case 'PaymentsOnChain':
      metricKey = 'paymentsOnChain'
      break
    case 'ProtocolNetOutflow':
      metricKey = 'protocolNetOutflow'
      break
    default:
      throw new Error('Unsupported Metric')
  }

  return {
    value: budgetMetric[metricKey].value || 0,
    itemStyle: {
      borderRadius: [0, 0, 0, 0],
    },
  }
}

export const getCorrectGranularity = (granularity: GRANULARITY_OPTIONS) => {
  switch (granularity) {
    case GRANULARITY_OPTIONS.Monthly:
      return 'monthly'
    case GRANULARITY_OPTIONS.Quarterly:
      return 'quarterly'
    case GRANULARITY_OPTIONS.Annually:
      return 'annual'
    default:
      return 'monthly'
  }
}

export const getExpensesMetricAnalytics = (
  analytics: Analytic,
  budgets: Budget[],
  granularity: GRANULARITY_OPTIONS,
): ExpensesMetricBudgetAnalytic => {
  const budgetsAnalytics: ExpensesMetricBudgetAnalytic = {}

  const analyticGranularity = getCorrectGranularity(granularity)

  if (Array.isArray(analytics.series) && analytics.series.length > 0) {
    // add all the data to budget analytics
    analytics.series.forEach((item: AnalyticSeries, index: number) => {
      item.rows.forEach((row) => {
        const codePath = row.dimensions[0].path
        if (!Object.hasOwn(budgetsAnalytics, codePath)) {
          // set empty values for the current code path
          budgetsAnalytics[codePath] = getArrayAnalytic(analyticGranularity)
        }

        const budgetMetric = budgetsAnalytics[codePath][index] ?? newBudgetMetric()

        switch (row.metric) {
          case 'Actuals':
            budgetMetric.actuals = setMetric(row.value, row.unit, row.sum)
            break
          case 'Forecast':
            budgetMetric.forecast = setMetric(row.value, row.unit, row.sum)
            break
          case 'Budget':
            budgetMetric.budget = setMetric(row.value, row.unit, row.sum)
            break
          case 'PaymentsOnChain':
            budgetMetric.paymentsOnChain = setMetric(row.value, row.unit, row.sum)
            break
          case 'ProtocolNetOutflow':
            budgetMetric.protocolNetOutflow = setMetric(row.value, row.unit, row.sum)
            break
        }

        budgetsAnalytics[codePath][index] = budgetMetric
      })
    })
  }

  // check if there are budgets that are not in the analytics
  // in that case we need to add them with empty values
  budgets.forEach((budget) => {
    if (!Object.hasOwn(budgetsAnalytics, budget.codePath)) {
      budgetsAnalytics[budget.codePath] = getArrayAnalytic(analyticGranularity)
    }
  })

  return budgetsAnalytics
}

export const parseAnalyticsToSeriesExpensesMetricChart = (
  budgetsAnalytics: ExpensesMetricBudgetAnalytic | undefined,
  budgets: Budget[],
  allBudgets: Budget[],
  options?: {
    isCumulative?: boolean
    cumulativeType?: CumulativeType
  },
) => {
  const metricSeriesConfig: Array<{
    name: string
    metricKey: keyof BudgetMetric
    color: string
  }> = [
    { name: 'Budget', metricKey: 'budget', color: '#F99374' },
    { name: 'Forecast', metricKey: 'forecast', color: '#58A6FF' },
    { name: 'Net Protocol Outflow', metricKey: 'protocolNetOutflow', color: '#B794F4' },
    { name: 'Net Expenses On-chain', metricKey: 'paymentsOnChain', color: '#F5A623' },
    { name: 'Actuals', metricKey: 'actuals', color: '#6FCF97' },
  ]

  const series: ExpensesMetricChartSeriesData[] = []

  if (budgetsAnalytics) {
    const budgetsAtCurrentLevel = budgets.length > 0 ? budgets : allBudgets
    const selectedPaths = budgetsAtCurrentLevel.map((budget) => budget.codePath)
    const monthCount = Math.max(...selectedPaths.map((path) => budgetsAnalytics[path].length), 0)
    const isCumulative = options?.isCumulative ?? false
    const cumulativeType = options?.cumulativeType ?? 'relative'

    metricSeriesConfig.forEach((config, index) => {
      const rawPoints = Array.from({ length: monthCount }, (_, monthIndex) => {
        const aggregatedPoint = selectedPaths.reduce(
          (acc, path) => {
            const metricValue = budgetsAnalytics[path][monthIndex][config.metricKey]
            return {
              value: acc.value + metricValue.value,
              sum: acc.sum + (metricValue.sum ?? metricValue.value),
            }
          },
          { value: 0, sum: 0 },
        )

        const divisor = selectedPaths.length > 0 ? selectedPaths.length : 1

        return {
          value: aggregatedPoint.value / divisor,
          sum: aggregatedPoint.sum / divisor,
        }
      })

      let runningTotal =
        isCumulative && cumulativeType === 'absolute' && rawPoints.length > 0
          ? rawPoints[0].sum - rawPoints[0].value
          : 0

      const dataForSeries = rawPoints.map((point) => {
        if (isCumulative) {
          runningTotal += point.value
        }

        return {
          value: isCumulative ? runningTotal : point.value,
          itemStyle: {
            borderRadius: [0, 0, 0, 0],
          },
        }
      })

      series[index] = {
        name: config.name,
        dataOriginal: dataForSeries,
        data: dataForSeries,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbolSize: 5,
        connectNulls: false,
        lineStyle: {
          width: 2,
          color: config.color,
          colorOriginal: config.color,
        },
        itemStyle: {
          color: config.color,
          colorOriginal: config.color,
        },
        isVisible: true,
      }
    })
  }
  return series
}

export const getMetricValue = (stringMetric: string): AnalyticMetric => {
  const getMetric =
    stringMetric === 'Net Protocol Outflow'
      ? 'ProtocolNetOutflow'
      : stringMetric === 'Net Expenses On-Chain'
        ? 'PaymentsOnChain'
        : stringMetric
  return getMetric as AnalyticMetric
}
