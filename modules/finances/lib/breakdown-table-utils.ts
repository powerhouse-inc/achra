import type { MetricValues } from '@/modules/finances/types'
import { getKeyMetric } from '../components/breakdown-table/table-header/cell-semi-annually'

export function filterMetricValues(
  metric: MetricValues,
  activeMetrics: string[],
): Partial<MetricValues> {
  const result: Partial<MetricValues> = {}
  activeMetrics.forEach((m) => {
    const key = getKeyMetric(m) as keyof MetricValues
    result[key] = metric[key]
  })
  return result
}
