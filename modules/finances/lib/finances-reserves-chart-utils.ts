import { removePatternAfterSlash } from '../utils'
import type { Analytic, AnalyticGranularity, Budget } from '../types'
import type { EChartsOption } from 'echarts-for-react'

interface WaterfallReserves {
  PaymentsOnChain: number
  ProtocolNetOutflow: number
}

const EMPTY_METRIC_VALUE: WaterfallReserves = {
  PaymentsOnChain: 0,
  ProtocolNetOutflow: 0,
}

const UMBRAL_CHART_WATERFALL = 0.004

export const getArrayLengthByGranularity = (granularity: AnalyticGranularity) => {
  switch (granularity) {
    case 'total':
      return 1
    case 'semiAnnual':
      return 2
    case 'monthly':
      return 12
    case 'quarterly':
      return 4
    case 'weekly':
      return 52
    case 'daily':
      return 365
    case 'hourly':
      return 24
    case 'annual':
      return 1
  }
}

const getArraysWaterfall = (data: number[]) => {
  const inFlow: Array<number | '-'> = ['-']
  const outFlow: Array<number | '-'> = ['-']
  const auxiliaryArray: number[] = [data[0] ?? 0]

  for (let i = 1, sum = 0; i < data.length; i++) {
    const value = data[i] ?? 0
    if (value >= 0) {
      inFlow.push(value)
      outFlow.push('-')
    } else {
      inFlow.push('-')
      outFlow.push(-value)
    }

    sum += data[i - 1] ?? 0
    const auxValue = value < 0 ? sum + value : sum
    auxiliaryArray.push(+auxValue.toFixed(3))
  }

  return { inFlow, outFlow, auxiliaryArray }
}

const humanizeNumber = (num: number) => {
  const abs = Math.abs(num)
  if (abs < 1000) return num.toFixed(1).replace(/\.0$/, '')
  if (abs < 1_000_000) return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`
  if (abs < 1_000_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (abs < 1_000_000_000_000) return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`
  return `${(num / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '')}T`
}

export const buildWaterfallSeries = ({
  data,
  isMobile,
  isTablet,
  isDesktop1024,
}: {
  data: number[]
  isMobile: boolean
  isTablet: boolean
  isDesktop1024: boolean
}): NonNullable<EChartsOption['series']> => {
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

  const help = auxiliaryArray.map((element, index) => (index === 0 ? (data[index] ?? 0) : element))
  const helpBarColors = help.map((_, index) =>
    index === 0 || index === help.length - 1 ? '#329DFF' : 'rgba(0,0,0,0)',
  )
  const barWidth = isMobile ? 16 : isTablet ? 32 : isDesktop1024 ? 44 : 48

  return [
    {
      name: 'Reserves Balance',
      type: 'bar',
      stack: 'all',
      barWidth,
      data: help.map((item) => (Math.abs(item) < UMBRAL_CHART_WATERFALL ? 0 : item)),
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        color: (params: { dataIndex: number }) => helpBarColors[params.dataIndex],
      },
      label: {
        show: true,
        position: 'top',
        formatter: (params: { value: number; dataIndex: number }) => {
          if (Math.abs(params.value) < UMBRAL_CHART_WATERFALL) return ''
          const isStartOrEnd = params.dataIndex === 0 || params.dataIndex === help.length - 1
          if (!isStartOrEnd) return ''
          return humanizeNumber(params.value)
        },
        color: 'var(--color-foreground)',
        fontWeight: 700,
        fontSize: isMobile ? 10 : isTablet ? 12 : 14,
      },
      emphasis: { disabled: true },
    },
    {
      name: 'Outflow',
      type: 'bar',
      stack: 'all',
      barWidth,
      data: outFlow,
      itemStyle: {
        borderRadius: isMobile ? 4 : 8,
        color: '#EA4335',
      },
      label: {
        show: true,
        position: 'bottom',
        color: '#EA4335',
        fontWeight: 700,
        fontSize: isMobile ? 10 : isTablet ? 12 : 14,
        formatter: (params: { value: number | '-' }) => {
          if (typeof params.value !== 'number' || Math.abs(params.value) < UMBRAL_CHART_WATERFALL) {
            return ''
          }
          return `-${humanizeNumber(params.value)}`
        },
      },
      emphasis: { disabled: true },
    },
    {
      name: 'Inflow',
      type: 'bar',
      stack: 'all',
      barWidth,
      data: inFlow,
      itemStyle: {
        borderRadius: isMobile ? 4 : 8,
        color: '#34A853',
      },
      label: {
        show: true,
        position: 'top',
        color: '#34A853',
        fontWeight: 700,
        fontSize: isMobile ? 10 : isTablet ? 12 : 14,
        formatter: (params: { value: number | '-' }) => {
          if (typeof params.value !== 'number' || Math.abs(params.value) < UMBRAL_CHART_WATERFALL) {
            return ''
          }
          return `+${humanizeNumber(params.value)}`
        },
      },
      emphasis: { disabled: true },
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

  if (!analytics?.series.length) {
    budgets.forEach((budget) => {
      summaryValues.set(
        budget.codePath,
        Array.from({ length: arrayLength }, () => 0),
      )
      totalToStartEachBudget.set(budget.codePath, 0)
    })
    return { summaryValues, totalToStartEachBudget }
  }

  const isDeepWithoutBudgets = budgets.length === 0
  analytics.series.forEach((periods, index) => {
    periods.rows.forEach((row) => {
      const analyticPath = row.dimensions[0].path
      if (!accumulator.has(analyticPath)) {
        accumulator.set(analyticPath, { ...EMPTY_METRIC_VALUE })
      }

      const mapKey = isDeepWithoutBudgets ? removePatternAfterSlash(analyticPath) : analyticPath
      const values =
        budgetAnalyticMap.get(mapKey) ??
        Array.from({ length: arrayLength }, () => ({ ...EMPTY_METRIC_VALUE }))

      const acc = accumulator.get(analyticPath) as WaterfallReserves
      if (index === 0) {
        if (row.metric === 'ProtocolNetOutflow') acc.ProtocolNetOutflow += row.sum - row.value
        if (row.metric === 'PaymentsOnChain') acc.PaymentsOnChain += row.sum - row.value

        const difference = acc.ProtocolNetOutflow - acc.PaymentsOnChain
        const normalized = Math.abs(difference) < UMBRAL_CHART_WATERFALL ? 0 : difference
        totalToStartEachBudget.set(mapKey, normalized)
      }

      if (values[index]) {
        if (row.metric === 'ProtocolNetOutflow') values[index].ProtocolNetOutflow += row.value
        if (row.metric === 'PaymentsOnChain') values[index].PaymentsOnChain += row.value
      }

      budgetAnalyticMap.set(mapKey, values)
    })
  })

  Array.from(budgetAnalyticMap.keys()).forEach((key) => {
    const values = budgetAnalyticMap.get(key) ?? []
    summaryValues.set(
      key,
      values.length > 0
        ? values.map((item) => item.ProtocolNetOutflow - item.PaymentsOnChain)
        : Array.from({ length: arrayLength }, () => 0),
    )
  })

  if (budgets.length === 0) {
    Array.from(summaryValues.keys()).forEach((key) => {
      const correctKey = allBudgets.find((item) => item.codePath === key)?.code ?? key
      if (summaryValues.has(key)) {
        const value = summaryValues.get(key) ?? []
        summaryValues.delete(key)
        summaryValues.set(correctKey, value)
      }
    })
    Array.from(totalToStartEachBudget.keys()).forEach((key) => {
      const correctKey = allBudgets.find((item) => item.codePath === key)?.code ?? key
      if (totalToStartEachBudget.has(key)) {
        const value = totalToStartEachBudget.get(key) ?? 0
        totalToStartEachBudget.delete(key)
        totalToStartEachBudget.set(correctKey, value)
      }
    })
  }

  return { summaryValues, totalToStartEachBudget }
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
) => {
  let total = 0
  totalToStartEachBudget.forEach((value, key) => {
    if (activeElements.includes(key)) total += value
  })

  if (data.reduce((acc, value) => acc + value, 0) === 0 && total === 0) return data
  const result = data.map((value) => (Math.abs(value) < UMBRAL_CHART_WATERFALL ? 0 : value))
  result.unshift(total)
  return result
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
      return [isMobile ? '' : 'START', 'YEAR', isMobile ? '' : 'FINISH']
  }
}
