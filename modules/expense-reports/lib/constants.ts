export const STABLECOIN_UNITS: readonly string[] = ['USDC', 'USDT', 'USDS', 'DAI']

export const ACTUALS_BREAKDOWN_QUERY_PARAM = 'actual-account'

export const FORECAST_BREAKDOWN_QUERY_PARAM = 'forecast-account'

export const BREAKDOWN_VIEW_QUERY_KEY = 'breakdownView'

export const AUDITOR_VIEW_STORAGE_COLLECTION_KEY = 'auditorView'

/**
 * Constants for AdvancedInnerTable component
 */

export const COLUMN_HEADERS = {
  COMMENTS: 'Comments',
  REASONS: 'Reason(s)',
} as const

export const CELL_VALUES = {
  TOTAL: 'Total',
  SUBTOTAL: 'Subtotal',
} as const

export const DEFAULT_COLUMN_WIDTH = '120px'
export const DEFAULT_MIN_WIDTH = 'unset'
