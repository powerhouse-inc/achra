export enum TABS {
  REALIZED_EXPENSES = 'Realized Expenses',
  OPERATIONAL_RESERVES = 'Operational Reserves',
  FORECAST = 'Forecast',
}

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

export enum REALIZED_EXPENSES_FILTER {
  ACTUALS = 'Actuals',
  PAYMENTS = 'Payments',
}
