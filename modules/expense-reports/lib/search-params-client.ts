import { parseAsString, parseAsStringEnum } from 'nuqs'
import { searchParamsConfigValues } from './search-params-config'
import type { TabSection } from '../types'

// Client-side parsers - these use nuqs which is for client components
export const sectionSearchParamParser = parseAsStringEnum<TabSection>(
  searchParamsConfigValues.section.values,
).withDefault(searchParamsConfigValues.section.defaultValue)

export const viewMonthSearchParamParser = parseAsString
