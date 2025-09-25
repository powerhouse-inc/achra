export interface StackedAreaSeries {
  type: string
  name: string
  stack: string
  stackStrategy: string
  areaStyle: object
  emphasis: { focus: string }
  showSymbol: false
  data: number[]
  itemStyle: { color: string }
}

export const TABS = {
  REALIZED_EXPENSES: 'Realized Expenses',
  OPERATIONAL_RESERVES: 'Operational Reserves',
  FORECAST: 'Forecast',
} as const

export type TabValue = (typeof TABS)[keyof typeof TABS]

export const TABS_CONFIG = [
  {
    id: TABS.REALIZED_EXPENSES,
    longName: 'Realized Expenses',
    shortName: 'Realized Exp.',
    className: 'rounded-tl-lg sm:rounded-none',
  },
  {
    id: TABS.OPERATIONAL_RESERVES,
    longName: 'Operational Reserves',
    shortName: 'Op. Reserves',
  },
  {
    id: TABS.FORECAST,
    longName: 'Forecast',
    shortName: 'Forecast',
    className: 'rounded-tr-lg sm:rounded-none',
  },
]
