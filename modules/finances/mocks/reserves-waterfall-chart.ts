import type { AnalyticSeries, AnalyticSeriesRow } from '../types'

const BUDGET_PATHS = ['atlas/legacy', 'atlas/scopes', 'atlas/immutable'] as const

const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'] as const
const QUARTERS = ['01', '04', '07', '10'] as const

const MONTHLY_PROTOCOL_OUTFLOW: Record<(typeof BUDGET_PATHS)[number], number[]> = {
  'atlas/legacy': [
    68000, 71000, 69500, 63400, 71500, 72500, 62800, 72000, 70500, 62200, 69000, 71200,
  ],
  'atlas/scopes': [
    109000, 111500, 113000, 94200, 116500, 118000, 93600, 117500, 116000, 92500, 113500, 115000,
  ],
  'atlas/immutable': [
    83000, 84500, 85200, 70800, 87200, 88500, 70100, 88800, 87700, 69400, 85900, 87000,
  ],
}

const MONTHLY_PAYMENTS_ON_CHAIN: Record<(typeof BUDGET_PATHS)[number], number[]> = {
  'atlas/legacy': [
    63750, 64500, 65200, 64800, 65500, 66100, 66600, 65900, 65100, 64700, 64000, 64900,
  ],
  'atlas/scopes': [
    94500, 95500, 96200, 97000, 97900, 98800, 99500, 98700, 98000, 97200, 96800, 97500,
  ],
  'atlas/immutable': [
    70200, 71000, 71800, 72600, 73500, 74200, 74800, 74400, 73800, 73200, 72700, 73400,
  ],
}

const STARTING_BALANCE_BY_PATH: Record<(typeof BUDGET_PATHS)[number], number> = {
  'atlas/legacy': 14_000,
  'atlas/scopes': 22_000,
  'atlas/immutable': 18_000,
}

const createRowsForPeriod = (periodIndex: number): AnalyticSeriesRow[] => {
  return BUDGET_PATHS.flatMap((path) => {
    const protocolValue = MONTHLY_PROTOCOL_OUTFLOW[path][periodIndex] ?? 0
    const paymentsValue = MONTHLY_PAYMENTS_ON_CHAIN[path][periodIndex] ?? 0

    return [
      {
        dimensions: [{ name: 'budget', path }],
        metric: 'ProtocolNetOutflow',
        unit: 'DAI',
        value: protocolValue,
        // first period carries the mock "starting balance" in sum - value
        sum: periodIndex === 0 ? protocolValue + STARTING_BALANCE_BY_PATH[path] : protocolValue,
      },
      {
        dimensions: [{ name: 'budget', path }],
        metric: 'PaymentsOnChain',
        unit: 'DAI',
        value: paymentsValue,
        sum: periodIndex === 0 ? paymentsValue : paymentsValue,
      },
    ]
  })
}

export const seriesGranularityMonthlyFirstLevelFinancesReserves: AnalyticSeries[] = MONTHS.map(
  (month, index) => ({
    period: `2025/${month}`,
    start: `2025-${month}-01T00:00:00.000Z`,
    end: `2025-${month}-28T00:00:00.000Z`,
    rows: createRowsForPeriod(index),
  }),
)

export const seriesGranularityQuarterlyFirstLevelFinancesReserves: AnalyticSeries[] = QUARTERS.map(
  (month, index) => ({
    period: `2025/Q${index + 1}`,
    start: `2025-${month}-01T00:00:00.000Z`,
    end: `2025-${month}-28T00:00:00.000Z`,
    rows: createRowsForPeriod(index * 3),
  }),
)

export const seriesGranularityAnnuallyFirstLevelFinancesReserves: AnalyticSeries[] = [
  {
    period: '2025',
    start: '2025-01-01T00:00:00.000Z',
    end: '2025-12-31T00:00:00.000Z',
    rows: createRowsForPeriod(0),
  },
]
