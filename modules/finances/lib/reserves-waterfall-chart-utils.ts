import type { Analytic, AnalyticGranularity, Budget, MetricValues } from '@/modules/finances/types'
import { removePatternAfterSlash } from '@/modules/finances/utils'
import type { EChartsOption } from 'echarts-for-react'

const UMBRAL_CHART_WATERFALL = 0.004

const getArrayLengthByGranularity = (granularity: AnalyticGranularity) => {
  switch (granularity) {
    case 'monthly':
      return 12
    case 'quarterly':
      return 4
    case 'annual':
    case 'total':
      return 1
    case 'semiAnnual':
      return 2
    case 'weekly':
      return 52
    case 'daily':
      return 365
    case 'hourly':
      return 24
    default:
      return 12
  }
}

type WaterfallReserves = Pick<MetricValues, 'ProtocolNetOutflow' | 'PaymentsOnChain'>
const EMPTY_METRIC_VALUE: WaterfallReserves = {
  PaymentsOnChain: 0,
  ProtocolNetOutflow: 0,
}

const twoSignificantDigitsHumanization = (num: number) => {
  const abs = Math.abs(num)
  const sign = num < 0 ? '-' : ''
  const toPair = (value: number, suffix: string) => {
    const fixed = value.toFixed(1)
    return {
      value: `${sign}${fixed}`,
      suffix,
    }
  }

  if (abs < 1000) return toPair(abs, '')
  if (abs < 1_000_000) return toPair(abs / 1000, 'K')
  if (abs < 1_000_000_000) return toPair(abs / 1_000_000, 'M')
  if (abs < 1_000_000_000_000) return toPair(abs / 1_000_000_000, 'B')
  return toPair(abs / 1_000_000_000_000, 'T')
}

export const getWaterfallAxisLabels = (granularity: AnalyticGranularity, isMobile: boolean) => {
  switch (granularity) {
    case 'total':
      return [isMobile ? '' : 'START', 'TOTAL', isMobile ? '' : 'FINISH']
    case 'semiAnnual':
      return [isMobile ? '' : 'START', 'H1', 'H2', isMobile ? '' : 'FINISH']
    case 'monthly':
      return [
        isMobile ? 'S' : 'START',
        'J',
        'F',
        'M',
        'A',
        'M',
        'J',
        'J',
        'A',
        'S',
        'O',
        'N',
        'D',
        isMobile ? 'F' : 'FINISH',
      ]
    case 'quarterly':
      return [isMobile ? '' : 'START', 'Q1', 'Q2', 'Q3', 'Q4', isMobile ? '' : 'FINISH']
    case 'weekly':
      return [isMobile ? '' : 'START', 'W1', 'W2', 'W3', 'W4', isMobile ? '' : 'FINISH']
    case 'daily':
      return [isMobile ? '' : 'START', 'D1', 'D2', 'D3', 'D4', isMobile ? '' : 'FINISH']
    case 'hourly':
      return [isMobile ? '' : 'START', 'H1', 'H2', 'H3', 'H4', isMobile ? '' : 'FINISH']
    case 'annual':
      return [isMobile ? '' : 'START', 'Year', isMobile ? '' : 'FINISH']
    default:
      return [
        isMobile ? 'S' : 'START',
        'J',
        'F',
        'M',
        'A',
        'M',
        'J',
        'J',
        'A',
        'S',
        'O',
        'N',
        'D',
        isMobile ? 'F' : 'FINISH',
      ]
  }
}

const getArraysWaterfall = (data: number[]) => {
  const inFlow: Array<number | '-'> = []
  const outFlow: Array<number | '-'> = []
  const auxiliaryArray: number[] = []
  inFlow.unshift('-')
  outFlow.unshift('-')
  auxiliaryArray.push(data[0] ?? 0)
  for (let i = 1, sum = 0; i < data.length; i++) {
    if ((data[i] ?? 0) >= 0) {
      inFlow.push(data[i] ?? 0)
      outFlow.push('-')
    } else {
      inFlow.push('-')
      outFlow.push(-(data[i] ?? 0))
    }

    sum += data[i - 1] ?? 0
    const auxValue = (data[i] ?? 0) < 0 ? sum + (data[i] ?? 0) : sum
    auxiliaryArray.push(+auxValue.toFixed(3))
  }

  return {
    inFlow,
    outFlow,
    auxiliaryArray,
  }
}

export const buildWaterfallSeries = (
  data: number[],
  isMobile: boolean,
  isTablet: boolean,
  isDesktop1024: boolean,
): NonNullable<EChartsOption['series']> => {
  const { inFlow, outFlow, auxiliaryArray } = getArraysWaterfall(data)

  const lastInFlow = inFlow[inFlow.length - 1]
  const lastOutFlow = outFlow[outFlow.length - 1]
  if (typeof lastInFlow === 'number') {
    auxiliaryArray.push((auxiliaryArray[auxiliaryArray.length - 1] ?? 0) + lastInFlow)
  } else if (typeof lastOutFlow === 'number') {
    auxiliaryArray.push(auxiliaryArray[auxiliaryArray.length - 1] ?? 0)
  } else {
    auxiliaryArray.push(auxiliaryArray[auxiliaryArray.length - 1] ?? 0)
  }

  const help = auxiliaryArray.map((element, index) => {
    if (index === 0) {
      return data[index] ?? 0
    }
    return element
  })

  const mobileStyle = {
    fontSize: 10,
    fontFamily: 'Open Sans Condensed, sans-serif',
    fontWeight: 700,
    position: 'top',
  }

  const helpBarColors = help.map((_, index: number) => {
    if (index === 0 || index === help.length - 1) {
      return '#329DFF'
    }
    return 'rgba(0,0,0,0)'
  })

  const barWidth = isMobile ? 16 : isTablet ? 32 : isDesktop1024 ? 44 : 48
  return [
    {
      name: 'Reserves Balance',
      barWidth,
      data: help.map((item) => (Math.abs(item) < UMBRAL_CHART_WATERFALL ? 0 : item)),
      emphasis: {
        disabled: true,
      },
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        color: (params: { dataIndex: number }) => helpBarColors[params.dataIndex],
      },
      label: {
        formatter: (params: { value: number; dataIndex: number }) => {
          const formatted = twoSignificantDigitsHumanization(params.value)
          if (formatted.value === '0.0') return ''
          if (isMobile) {
            if (params.dataIndex === 0 || params.dataIndex === help.length - 1) {
              return `{colorful|${formatted.value}\n${formatted.suffix}}`
            }
            return `{hidden|${formatted.value}}`
          }
          if (params.dataIndex === 0 || params.dataIndex === help.length - 1) {
            return `{colorful|${formatted.value}${formatted.suffix}}`
          }
          return `{hidden|${formatted.value}}`
        },
        rich: {
          colorful: {
            color: 'var(--color-foreground)',
            fontWeight: 700,
            fontSize: isMobile ? 10 : isTablet ? 12 : 14,
            fontFamily: 'Open Sans Condensed, sans-serif',
            align: 'center',
          },
          hidden: {
            color: 'rgba(0,0,0,0)',
          },
        },
        show: true,
        position: 'top',
      },
      stack: 'all',
      type: 'bar',
    },
    {
      name: 'Outflow',
      barWidth,
      data: outFlow,
      emphasis: {
        disabled: true,
      },
      itemStyle: {
        borderRadius: isMobile ? 4 : 8,
        color: '#EA4335',
      },
      label: {
        show: true,
        color: '#EA4335',
        fontWeight: 700,
        fontFamily: 'Open Sans Condensed, sans-serif',
        fontSize: isMobile ? 10 : isTablet ? 12 : 14,
        position: 'bottom',
        formatter: (params: { value: number | '-' }) => {
          if (typeof params.value !== 'number') return ''
          const { value, suffix } = twoSignificantDigitsHumanization(params.value)
          if (value === '0.0') return ''
          if (isMobile) {
            const numberWithoutZero = value.replace('0.', '.')
            return `{value|${numberWithoutZero}}\n{suffix|${suffix}}`
          }
          return `-${value}${suffix}`
        },
        rich: {
          value: {
            ...mobileStyle,
            color: '#EA4335',
          },
          suffix: {
            ...mobileStyle,
            color: '#EA4335',
          },
        },
      },
      stack: 'all',
      type: 'bar',
    },
    {
      name: 'Inflow',
      barWidth,
      data: inFlow,
      emphasis: {
        disabled: true,
      },
      itemStyle: {
        borderRadius: isMobile ? 4 : 8,
        color: '#34A853',
      },
      label: {
        show: true,
        color: '#34A853',
        fontSize: isMobile ? 10 : isTablet ? 12 : 14,
        fontFamily: 'Open Sans Condensed, sans-serif',
        fontWeight: 700,
        position: 'top',
        formatter: (params: { value: number | '-' }) => {
          if (typeof params.value !== 'number') return ''
          const { value, suffix } = twoSignificantDigitsHumanization(params.value)
          if (value === '0.0') return ''
          if (isMobile) {
            const numberWithoutZero = value.replace('0.', '.')
            return `{value|${numberWithoutZero}}\n{suffix|${suffix}}`
          }
          return `+${value}${suffix}`
        },
        rich: {
          value: {
            color: '#34A853',
            fontSize: 10,
            fontFamily: 'Open Sans Condensed, sans-serif',
            fontWeight: 700,
            position: 'top',
          },
          suffix: {
            color: '#34A853',
            fontSize: 10,
            fontFamily: 'Open Sans Condensed, sans-serif',
            fontWeight: 700,
            position: 'top',
          },
        },
      },
      stack: 'all',
      type: 'bar',
    },
  ]
}

export const getAnalyticForWaterfall = (
  budgets: Budget[],
  granularity: AnalyticGranularity,
  analytics: Analytic | undefined,
  allBudgets: Budget[],
) => {
  const budgetAnalyticMap = new Map<string, WaterfallReserves[]>()
  const arrayLength = getArrayLengthByGranularity(granularity)
  const summaryValues = new Map<string, number[]>()
  const totalToStartEachBudget = new Map<string, number>()
  const accumulator = new Map<string, WaterfallReserves>()

  budgets.forEach((budget) => {
    budgetAnalyticMap.set(
      budget.codePath,
      Array.from({ length: arrayLength }, () => ({ ...EMPTY_METRIC_VALUE })),
    )
    totalToStartEachBudget.set(budget.codePath, 0)
  })

  if (!analytics || analytics.series.length === 0) {
    if (budgets.length > 0) {
      budgets.forEach((budget) => {
        summaryValues.set(
          budget.codePath,
          Array.from({ length: arrayLength }, () => 0),
        )
        totalToStartEachBudget.set(budget.codePath, 0)
      })
    }
    return {
      summaryValues,
      totalToStartEachBudget,
    }
  }

  if (budgets.length === 0) {
    const values = Array.from({ length: arrayLength }, () => ({
      ...EMPTY_METRIC_VALUE,
    }))

    analytics.series.forEach((periods, index) => {
      periods.rows.forEach((row) => {
        const analyticPath = row.dimensions[0].path
        if (!accumulator.has(analyticPath)) {
          accumulator.set(analyticPath, { ...EMPTY_METRIC_VALUE })
        }

        const accumulatorForCurrentPath = accumulator.get(analyticPath) as WaterfallReserves
        if (index === 0) {
          if (row.metric === 'ProtocolNetOutflow') {
            accumulatorForCurrentPath.ProtocolNetOutflow += row.sum - row.value
          }
          if (row.metric === 'PaymentsOnChain') {
            accumulatorForCurrentPath.PaymentsOnChain += row.sum - row.value
          }

          const difference =
            accumulatorForCurrentPath.ProtocolNetOutflow - accumulatorForCurrentPath.PaymentsOnChain
          const checkValueLessZero = Math.abs(difference) < UMBRAL_CHART_WATERFALL ? 0 : difference
          totalToStartEachBudget.set(removePatternAfterSlash(analyticPath), checkValueLessZero)
        }
        if (values[index]) {
          if (row.metric === 'ProtocolNetOutflow') {
            values[index].ProtocolNetOutflow += row.value
          }
          if (row.metric === 'PaymentsOnChain') {
            values[index].PaymentsOnChain += row.value
          }
        }

        budgetAnalyticMap.set(removePatternAfterSlash(analyticPath), values)
      })
    })
  } else {
    analytics.series.forEach((periods, index) => {
      periods.rows.forEach((row) => {
        const analyticPath = row.dimensions[0].path
        if (!accumulator.has(analyticPath)) {
          accumulator.set(analyticPath, { ...EMPTY_METRIC_VALUE })
        }
        let values = budgetAnalyticMap.get(analyticPath)
        values ??= Array.from({ length: arrayLength }, () => ({
          ...EMPTY_METRIC_VALUE,
        }))

        const accumulatorForCurrentPath = accumulator.get(analyticPath) as WaterfallReserves
        if (index === 0) {
          if (row.metric === 'ProtocolNetOutflow') {
            accumulatorForCurrentPath.ProtocolNetOutflow += row.sum - row.value
          }
          if (row.metric === 'PaymentsOnChain') {
            accumulatorForCurrentPath.PaymentsOnChain += row.sum - row.value
          }

          const difference =
            accumulatorForCurrentPath.ProtocolNetOutflow - accumulatorForCurrentPath.PaymentsOnChain
          const checkValueLessZero = Math.abs(difference) < UMBRAL_CHART_WATERFALL ? 0 : difference
          totalToStartEachBudget.set(analyticPath, checkValueLessZero)
        }
        if (values[index]) {
          if (row.metric === 'ProtocolNetOutflow') {
            values[index].ProtocolNetOutflow += row.value
          }
          if (row.metric === 'PaymentsOnChain') {
            values[index].PaymentsOnChain += row.value
          }
        }

        budgetAnalyticMap.set(analyticPath, values)
      })
    })
  }

  Array.from(budgetAnalyticMap.keys()).forEach((element) => {
    const values = budgetAnalyticMap.get(element) ?? []
    const sumOfDifferences =
      values.length > 0
        ? values.map((item) => item.ProtocolNetOutflow - item.PaymentsOnChain)
        : Array.from({ length: arrayLength }, () => 0)
    summaryValues.set(element, sumOfDifferences)
  })

  if (budgets.length === 0) {
    Array.from(summaryValues.keys()).forEach((key) => {
      const findCorrectBudget = allBudgets.find((item) => item.codePath === key)?.code ?? 'No-key'
      if (summaryValues.has(key)) {
        const value = summaryValues.get(key) ?? []
        summaryValues.delete(key)
        summaryValues.set(findCorrectBudget, value)
      }
    })
    Array.from(totalToStartEachBudget.keys()).forEach((key) => {
      const findCorrectBudget = allBudgets.find((item) => item.codePath === key)?.code ?? 'No-key'
      if (totalToStartEachBudget.has(key)) {
        const value = totalToStartEachBudget.get(key) ?? 0
        totalToStartEachBudget.delete(key)
        totalToStartEachBudget.set(findCorrectBudget, value)
      }
    })
  }

  return {
    summaryValues,
    totalToStartEachBudget,
  }
}

export const sumValuesFromMapKeys = (
  budgetAnalyticMap: Map<string, number[]>,
  activeItems: string[],
  granularity: AnalyticGranularity,
) => {
  const length = getArrayLengthByGranularity(granularity)
  let sums = Array.from({ length }).map(() => 0)

  budgetAnalyticMap.forEach((values, key) => {
    if (activeItems.includes(key)) {
      sums = sums.map((sum, index) => sum + (values[index] ?? 0))
    }
  })
  return sums
}

export const processDataForWaterfall = (
  data: number[],
  activeElements: string[],
  totalToStartEachBudget: Map<string, number>,
): number[] => {
  let total = 0
  totalToStartEachBudget.forEach((value, key) => {
    if (activeElements.includes(key)) {
      total += value
    }
  })

  const result: number[] = [...data]
  if (data.reduce((acc, actual) => acc + actual, 0) === 0 && total === 0) return data
  for (let i = 0; i < result.length; i++) {
    if (Math.abs(result[i] ?? 0) < UMBRAL_CHART_WATERFALL) {
      result[i] = 0
    }
  }
  result.unshift(total)
  return result
}
