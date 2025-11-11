import { parseAsString, parseAsStringEnum } from 'nuqs'
import { searchParamsConfigValues } from './search-params-config'
import type { TabSection, ViewMode } from '../types'

// Client-side parsers - these use nuqs which is for client components
export const viewModeSearchParamParser = parseAsStringEnum<ViewMode>(
  searchParamsConfigValues.viewMode.values,
).withDefault(searchParamsConfigValues.viewMode.defaultValue)

export const sectionSearchParamParser = parseAsStringEnum<TabSection>([
  ...searchParamsConfigValues.section.commonValues,
  ...searchParamsConfigValues.section.defaultValues,
  ...searchParamsConfigValues.section.auditorValues,
] as TabSection[]).withDefault(searchParamsConfigValues.section.defaultValue)

export const viewMonthSearchParamParser = parseAsString
