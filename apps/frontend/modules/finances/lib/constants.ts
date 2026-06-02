import { encodeSectionId } from '@/modules/shared/components/section-activation'
import ff from '@/modules/shared/lib/feature-flags'

// Budget statements table constants

export interface BudgetStatementsTableColumn {
  header: string
  shortHeader?: string
  accessorKey: string
  hasSort: boolean
  sortReverse: boolean
  isNumeric: boolean
}

export const BUDGET_STATEMENTS_TABLE_COLUMNS: BudgetStatementsTableColumn[] = [
  {
    header: 'Contributors',
    accessorKey: 'name',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Reporting Month',
    accessorKey: 'month',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Actuals',
    accessorKey: 'actuals',
    hasSort: false,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    hasSort: false,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Last Modified',
    accessorKey: 'lastModifiedAtUtcIso',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
  },
]

// Finances sections constants

export enum FinancesSections {
  BudgetStatements = 'budget-statements',
  BreakdownChart = 'breakdown-chart',
  ExpensesMetricChart = 'expenses-metric-chart',
  ReservesWaterfallChart = 'reserves-waterfall-chart',
}

/**
 * Finances sections IDs encoded
 */
export const FINANCES_SECTIONS_ENCODED = [
  encodeSectionId(FinancesSections.BudgetStatements),

  ...(ff.finances.BREAKDOWN_CHART_SECTION_ENABLED
    ? [encodeSectionId(FinancesSections.BreakdownChart)]
    : []),
  ...(ff.finances.EXPENSES_METRIC_CHART_SECTION_ENABLED
    ? [encodeSectionId(FinancesSections.ExpensesMetricChart)]
    : []),
  ...(ff.finances.RESERVES_WATERFALL_CHART_SECTION_ENABLED
    ? [encodeSectionId(FinancesSections.ReservesWaterfallChart)]
    : []),
]

// Color assigner constants

/**
 * LimitedColorAssigner class is used to assign colors to a given key
 * It is used to assign colors to the doughnut chart series
 */
export class LimitedColorAssigner {
  private availableColors: string[]
  // map of key -> color index
  private assignedColors: Record<string, number>
  private assignedColorsAmount: number

  constructor(maxAssignedColor: number, handPickedColors: string[] = []) {
    this.assignedColorsAmount = 0
    this.availableColors = this.generateColorPalette(
      handPickedColors.length,
      maxAssignedColor - handPickedColors.length,
      handPickedColors,
    )
    this.assignedColors = {}
  }

  private generateColorPalette = (
    index: number,
    numColors: number,
    existingColors: string[] = [],
  ) => {
    const baseHue = (index * (360 / numColors)) % 360
    const colors = []

    for (let i = 0; i < numColors; i++) {
      let hue = (baseHue + i * (360 / numColors)) % 360
      if (hue < 10 || hue > 350) {
        // skip red hues, make them more orange
        hue = (hue + 30) % 360
      }
      const color = `hsl(${hue}, 70%, 50%)`
      colors.push(color)
    }

    return [...existingColors, ...colors]
  }

  private hashIndex(key: string) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      const charCode = key.charCodeAt(i)
      hash = (hash * 31 + charCode) % this.availableColors.length
    }
    return hash
  }

  getColor = (key: string): string => {
    if (typeof this.assignedColors[key] === 'number') {
      return this.availableColors[this.assignedColors[key]]
    }

    if (this.assignedColorsAmount >= this.availableColors.length) {
      throw Error('No more colors available')
    }

    let index = this.hashIndex(key)
    const takenIndexes = Object.values(this.assignedColors)
    while (takenIndexes.includes(index)) {
      index = (index + 1) % this.availableColors.length
    }

    this.assignedColors[key] = index
    this.assignedColorsAmount += 1
    return this.availableColors[index]
  }
}

export const getColorForString = (value: string): string => {
  let hash = 0
  let i

  for (i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}

// Metric constants

interface MetricItem {
  title: string
  description: string
}

export const metrics: MetricItem[] = [
  {
    title: 'Budget',
    description: 'The maximum amount allocated for a specific budget category or project.',
  },
  {
    title: 'Forecast',
    description:
      'The amount forecasted to be spent in a period, as self-reported by the corresponding team.',
  },
  {
    title: 'Actuals',
    description:
      'The actual amount spent or received in a period, as self-reported by the corresponding team.',
  },
  {
    title: 'Payments On-Chain',
    description: 'Transactions (expenses) made directly on the blockchain.',
  },
  {
    title: 'Payments Off-Chain Included',
    description:
      'Expense transactions based on the on-chain data combined with self-reported off-chain account balances.',
  },
]
