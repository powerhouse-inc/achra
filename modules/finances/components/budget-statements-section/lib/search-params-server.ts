import { createSearchParamsCache, parseAsStringEnum, parseAsStringLiteral } from 'nuqs/server'
import { METRIC_OPTIONS } from '@/modules/finances/types'

export const budgetStatementsSearchParamsCache = createSearchParamsCache({
  metrics: parseAsStringEnum(
    Object.values(METRIC_OPTIONS).filter((m) => m !== METRIC_OPTIONS.Budget),
  ).withDefault(METRIC_OPTIONS.Actuals),
  sort: parseAsStringLiteral([
    'reporting_newest',
    'reporting_oldest',
    'modified_newest',
    'modified_oldest',
  ] as const).withDefault('reporting_newest'),
})
