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
  // actualAccountTab param uses dynamic wallet names, so no enum validation
  // default is null (first wallet will be selected based on data)
  actualAccountTab: {
    defaultValue: null,
  },
} as const
