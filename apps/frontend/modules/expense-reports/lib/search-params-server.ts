import { createSearchParamsCache, parseAsString, parseAsStringEnum } from 'nuqs/server'
import { searchParamsConfigValues } from './search-params-config'
import type { TabSection } from '../types'

export const sectionSearchParamParser = parseAsStringEnum<TabSection>(
  searchParamsConfigValues.section.values,
).withDefault(searchParamsConfigValues.section.defaultValue)

export const viewMonthSearchParamParser = parseAsString

export const expenseReportsSearchParams = {
  section: sectionSearchParamParser,
  viewMonth: viewMonthSearchParamParser,
}

export const expenseReportsSearchParamsCache = createSearchParamsCache(expenseReportsSearchParams)
