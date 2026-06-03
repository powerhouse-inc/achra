export const mockBudgetColumns = [
  {
    header: 'Budget Category',
    type: 'text' as const,
    align: 'left',
    width: '200px',
    minWidth: '150px',
    isCardHeader: true,
  },
  {
    header: 'Budget',
    type: 'number' as const,
    align: 'right',
    width: '120px',
    minWidth: '100px',
  },
  {
    header: 'Forecast',
    type: 'number' as const,
    align: 'right',
    width: '120px',
    minWidth: '100px',
  },
  {
    header: 'Actuals',
    type: 'number' as const,
    align: 'right',
    width: '120px',
    minWidth: '100px',
  },
  {
    header: 'Payments',
    type: 'number' as const,
    align: 'right',
    width: '120px',
    minWidth: '100px',
  },
]

export function makeBudgetRow(
  category: string,
  budget: number,
  forecast: number,
  actuals: number,
  payments: number,
  type: 'normal' | 'total' = 'normal',
) {
  return {
    type,
    items: mockBudgetColumns.map((col, i) => ({
      column: col,
      value: i === 0 ? category : [budget, forecast, actuals, payments][i - 1],
    })),
  }
}

export const mockBudgetRows = [
  makeBudgetRow('Compensation & Benefits', 80000, 75000, 72000, 70000),
  makeBudgetRow('Travel & Entertainment', 15000, 12000, 11500, 11500),
  makeBudgetRow('Software & Subscriptions', 8000, 8000, 7800, 7800),
  makeBudgetRow('Totals', 103000, 95000, 91300, 89300, 'total'),
]
