import { TabSection } from '../types'

/**
 * Shared configuration for search parameter parsers.
 * This file contains the configuration that is used by both
 * server-side and client-side parsers to maintain consistency.
 */
export const searchParamsConfigValues = {
  section: {
    defaultValue: TabSection.ACCOUNT_SNAPSHOT,
    values: Object.values(TabSection),
  },
} as const
