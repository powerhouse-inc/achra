import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import type { AnalyticMetric, DoughnutSeries } from './types'

/**
 * Chunks an array into smaller arrays of specified size
 */
export function chunkArray<T>(array: T[], chunkSize: number): Map<number, T[]> {
  const chunks = new Map<number, T[]>()
  let chunkIndex = 0

  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.set(chunkIndex, array.slice(i, i + chunkSize))
    chunkIndex++
  }

  return chunks
}

/**
 * Gets the correct metric key for overview chart
 */
export function getCorrectMetricValuesOverViewChart(
  selectedMetric: string,
): keyof DoughnutSeries['metrics'] {
  switch (selectedMetric) {
    case 'Budget':
      return 'budget'
    case 'PaymentsOnChain':
      return 'paymentsOnChain'
    case 'ProtocolNetOutflow':
      return 'protocolNetOutflow' as keyof DoughnutSeries['metrics']
    case 'Forecast':
      return 'forecast' as keyof DoughnutSeries['metrics']
    case 'Actuals':
      return 'actuals' as keyof DoughnutSeries['metrics']
    default:
      return 'budget'
  }
}

export const getShortCode = (code?: string) => {
  if (!code) return ''
  const parts = code.split('-')
  if (!parts.length) return code

  return parts[0]
}

export const sortDoughnutSeriesByValue = (series: DoughnutSeries[]): DoughnutSeries[] =>
  series.sort((a, b) => b.value - a.value)

export const formatValueScientificNotation = (value: number) => {
  const precisionValue = value.toPrecision(3)
  if (precisionValue.includes('e')) {
    // To avoid scientific notation, we use toFixed
    return parseFloat(precisionValue).toFixed(0)
  }
  return precisionValue
}

export const threeDigitsPrecisionHumanization = (num = 0, isHasAbsoluteValue = false) => {
  const absNum = isHasAbsoluteValue ? Math.abs(num) : num
  let value, suffix

  if (absNum >= 1_000_000) {
    value = num / 1_000_000
    suffix = 'M'
  } else if (absNum >= 1_000) {
    value = num / 1_000
    suffix = 'K'
  } else {
    value = num
    suffix = ''
  }

  // Formatter values for scientific notation
  const formattedValue = formatValueScientificNotation(value)

  return {
    value: formattedValue,
    suffix,
  }
}

export const getPercentDisplay = (percent: number) => {
  if (percent === 0) return 0
  if (percent < 0.1) return '<0.1'
  if (percent < 1) return usLocalizedNumber(percent, 2)
  return usLocalizedNumber(percent, 1)
}

export function getTooltipSelectedMetricLabel(selectedMetric: AnalyticMetric) {
  switch (selectedMetric) {
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
