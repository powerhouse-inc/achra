import type { DoughnutSeries } from './types'

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
 * Sorts doughnut series by value in descending order
 */
export function sortDoughnutSeriesByValue(series: DoughnutSeries[]): DoughnutSeries[] {
  return [...series].sort((a, b) => {
    const aValue = Math.abs(a.value)
    const bValue = Math.abs(b.value)
    return bValue - aValue
  })
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
