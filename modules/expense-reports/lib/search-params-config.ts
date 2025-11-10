import { AuditorTabSection, CommonTabSection, DefaultTabSection, ViewMode } from '../types'

/**
 * Shared configuration for search parameter parsers.
 * This file contains the configuration that is used by both
 * server-side and client-side parsers to maintain consistency.
 */
export const searchParamsConfigValues = {
  viewMode: {
    values: Object.values(ViewMode),
    defaultValue: ViewMode.DEFAULT,
  },
  section: {
    defaultValue: CommonTabSection.ACCOUNT_SNAPSHOT,
    commonValues: Object.values(CommonTabSection),
    defaultValues: Object.values(DefaultTabSection),
    auditorValues: Object.values(AuditorTabSection),
  },
} as const
