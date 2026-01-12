import {
  type AnalyticMetric,
  type Budget,
  type BudgetMetric,
  GRANULARITY_OPTIONS,
} from '../../types'
import {
  existingColors,
  newBudgetMetric,
  removePatternAfterSlash,
  setMetric,
  transformPathToName,
} from '../../utils'
import { LimitedColorAssigner } from '../summary-section/colors'
import type {
  Analytic,
  AnalyticGranularity,
  AnalyticGranularityForBreakdownChart,
  AnalyticSeries,
  BreakdownBudgetAnalytic,
  BreakdownChartSeriesData,
  ValuesDataWithBorder,
} from './types'

export const removeBudgetWord = (name: string) => {
  const wordToRemove = /Budget\s*$/i

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

export const formatterBreakdownChart = (
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
  granularity: AnalyticGranularityForBreakdownChart,
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

export const getBarWidth = (
  isMobile: boolean,
  isTablet: boolean,
  isDesktop1024: boolean,
  isDesktop1280: boolean,
  selectedGranularity: GRANULARITY_OPTIONS,
) => {
  if (isMobile) {
    if (selectedGranularity === 'Quarterly') return 16
    if (selectedGranularity === 'Annually') return 96
    return 16
  } else if (isTablet) {
    return 23.8
  } else if (isDesktop1024) {
    return 30
  } else if (isDesktop1280) {
    return 40
  } else {
    if (selectedGranularity === 'Annually') return 168
    if (selectedGranularity === 'Quarterly') return 64
    return 40
  }
}

// Create a Budget metric empty for the chart with the correct granularity
export const getArrayAnalytic = (
  granularity: AnalyticGranularityForBreakdownChart,
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

export const getBreakdownAnalytics = (
  analytics: Analytic,
  budgets: Budget[],
  granularity: GRANULARITY_OPTIONS,
): BreakdownBudgetAnalytic => {
  const budgetsAnalytics: BreakdownBudgetAnalytic = {}

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
            budgetMetric.actuals = setMetric(row.value, row.unit)
            break
          case 'Forecast':
            budgetMetric.forecast = setMetric(row.value, row.unit)
            break
          case 'Budget':
            budgetMetric.budget = setMetric(row.value, row.unit)
            break
          case 'PaymentsOnChain':
            budgetMetric.paymentsOnChain = setMetric(row.value, row.unit)
            break
          case 'ProtocolNetOutflow':
            budgetMetric.protocolNetOutflow = setMetric(row.value, row.unit)
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

export const parseAnalyticsToSeriesBreakDownChart = (
  budgetsAnalytics: BreakdownBudgetAnalytic | undefined,
  budgets: Budget[],
  barWidth: number,
  metric: AnalyticMetric,
  allBudgets: Budget[],
) => {
  const series: BreakdownChartSeriesData[] = []

  if (budgetsAnalytics) {
    const searchCorrectBudget = budgets.length > 0 ? budgets : allBudgets
    const validPaths = new Set(searchCorrectBudget.map((b) => b.codePath))

    const budgetKeys = Object.keys(budgetsAnalytics)
      .filter((key) => validPaths.has(removePatternAfterSlash(key)))
      .sort()

    const uniqueKeysCount = new Set(budgetKeys.map((key) => removePatternAfterSlash(key))).size
    const colorAssigner = new LimitedColorAssigner(uniqueKeysCount, existingColors)

    budgetKeys.forEach((budgetKey, index) => {
      const nameBudget =
        searchCorrectBudget.find((budget) => budget.codePath === removePatternAfterSlash(budgetKey))
          ?.name ?? (budgetKey.endsWith('/*') ? 'Others' : undefined)

      const budgetData = budgetsAnalytics[budgetKey]
      if (Array.isArray(budgetData)) {
        const dataForSeries = budgetData.map((budgetMetric) =>
          getCorrectMetric(budgetMetric, metric),
        )

        series[index] = {
          name: nameBudget || transformPathToName(budgetKey),
          dataOriginal: dataForSeries,
          data: dataForSeries,
          type: 'bar',
          stack: 'x',
          barWidth,
          showBackground: false,
          itemStyle: {
            color: colorAssigner.getColor(budgetKey),
            colorOriginal: colorAssigner.getColor(budgetKey),
          },
          isVisible: true,
        }
      } else {
        const dataForSeries = getCorrectMetric(budgetData, metric)
        series[index] = {
          name: nameBudget || transformPathToName(budgetKey),
          dataOriginal: [dataForSeries],
          data: [dataForSeries],
          type: 'bar',
          stack: 'x',
          barWidth,
          showBackground: false,
          itemStyle: {
            color: colorAssigner.getColor(budgetKey),
            colorOriginal: colorAssigner.getColor(budgetKey),
          },
          isVisible: true,
        }
      }
    })
  }
  return series
}

export const setBorderRadiusForSeries = (
  series: BreakdownChartSeriesData[],
  barBorderRadius: number,
): BreakdownChartSeriesData[] => {
  const seriesLength = series[0]?.data.length

  for (let dataIndex = 0; dataIndex < seriesLength; dataIndex++) {
    let firstPositiveIndex = -1
    let lastPositiveIndex = -1
    let firstNegativeIndex = -1
    let lastNegativeIndex = -1
    let positiveCount = 0
    let negativeCount = 0

    // Identify first and last indices for positive and negative values
    series.forEach((s, seriesIndex) => {
      let value = s.data[dataIndex].value ?? 0
      value = Math.abs(value) < 0.004 ? 0 : value // if the values es too small, consider it as 0
      if (value > 0) {
        if (firstPositiveIndex === -1) firstPositiveIndex = seriesIndex
        lastPositiveIndex = seriesIndex
        positiveCount++
      } else if (value < 0) {
        if (firstNegativeIndex === -1) firstNegativeIndex = seriesIndex
        lastNegativeIndex = seriesIndex
        negativeCount++
      }
    })

    // Apply border styles based on position and value.
    series.forEach((s, seriesIndex) => {
      const isPositive = (s.data[dataIndex].value ?? 0) > 0
      const isNegative = (s.data[dataIndex].value ?? 0) < 0

      if (positiveCount + negativeCount === 1) {
        // Apply borders to the top or bottom depending of positive or negative
        s.data[dataIndex].itemStyle.borderRadius = isPositive
          ? [barBorderRadius, barBorderRadius, 0, 0]
          : [0, 0, barBorderRadius, barBorderRadius]
      } else if (isPositive && positiveCount === 1) {
        // Only one positive value, apply top borders
        s.data[dataIndex].itemStyle.borderRadius = [barBorderRadius, barBorderRadius, 0, 0]
      } else if (isPositive && seriesIndex === firstPositiveIndex) {
        // First positive value not bottom borders
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, 0, 0]
      } else if (isPositive && seriesIndex === lastPositiveIndex) {
        // Last positive value top borders
        s.data[dataIndex].itemStyle.borderRadius = [barBorderRadius, barBorderRadius, 0, 0]
      } else if (isNegative && negativeCount === 1) {
        // Only one negative value, apply bottom borders
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, barBorderRadius, barBorderRadius]
      } else if (isNegative && seriesIndex === firstNegativeIndex) {
        // First negative value, bottom borders zero
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, 0, 0]
      } else if (isNegative && seriesIndex === lastNegativeIndex) {
        // Last negative value, bottom edges (inverted)
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, barBorderRadius, barBorderRadius]
      } else {
        // No borders for intermediate values
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, 0, 0]
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
