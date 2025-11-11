import { createSearchParamsCache, parseAsString, parseAsStringEnum } from 'nuqs/server'
import { searchParamsConfigValues } from './search-params-config'
import type { TabSection, ViewMode } from '../types'

export const viewModeSearchParamParser = parseAsStringEnum<ViewMode>(
  searchParamsConfigValues.viewMode.values,
).withDefault(searchParamsConfigValues.viewMode.defaultValue)

export const sectionSearchParamParser = parseAsStringEnum<TabSection>([
  ...searchParamsConfigValues.section.commonValues,
  ...searchParamsConfigValues.section.defaultValues,
  ...searchParamsConfigValues.section.auditorValues,
] as TabSection[]).withDefault(searchParamsConfigValues.section.defaultValue)

export const viewMonthSearchParamParser = parseAsString

export const expenseReportsSearchParams = {
  view: viewModeSearchParamParser,
  section: sectionSearchParamParser,
  viewMonth: viewMonthSearchParamParser,
}

export const expenseReportsSearchParamsCache = createSearchParamsCache(expenseReportsSearchParams)
