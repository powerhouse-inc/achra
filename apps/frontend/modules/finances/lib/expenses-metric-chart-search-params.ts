import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringEnum,
  parseAsStringLiteral,
} from 'nuqs/server'
import { GRANULARITY_OPTIONS } from '@/modules/finances/types'

export const CUMULATIVE_TYPE_OPTIONS = ['relative', 'absolute'] as const

export type CumulativeType = (typeof CUMULATIVE_TYPE_OPTIONS)[number]

export const granularityParser = parseAsStringEnum(Object.values(GRANULARITY_OPTIONS))
  .withDefault(GRANULARITY_OPTIONS.Monthly)
  .withOptions({
    shallow: true,
    history: 'replace',
  })

export const cumulativeParser = parseAsStringLiteral(['true', 'false'] as const)
  .withDefault('false')
  .withOptions({
    shallow: true,
    history: 'replace',
  })

export const cumulativeTypeParser = parseAsStringLiteral(CUMULATIVE_TYPE_OPTIONS)
  .withDefault('relative')
  .withOptions({
    shallow: true,
    history: 'replace',
  })

export const year = parseAsString.withDefault('2025')

export const expensesMetricChartFiltersConfig = {
  granularity: granularityParser,
  cumulative: cumulativeParser,
  cumulativeType: cumulativeTypeParser,
  year,
} as const

export const expensesMetricChartSearchParamsCache = createSearchParamsCache(
  expensesMetricChartFiltersConfig,
)
