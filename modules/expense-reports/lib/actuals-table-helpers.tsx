import type {
  ExpenseReportLineItem,
  ExpenseReportWallet,
} from '@/modules/__generated__/graphql/switchboard-generated'
import type { BreakdownTotals, InnerTableRow } from '@/modules/expense-reports/types'
import { BREAKDOWN_COLUMNS } from '../components/expense-reports-actuals/breakdown-actuals-section/breakdown-columns'
import { getCurrencyValue, isUsdsLineItem } from './budget-statement-utils'
import { type GroupTree, HEADCOUNT_GROUP_LABEL, NON_HEADCOUNT_GROUP_LABEL } from './group-tree'

const COLUMNS_MAP = {
  label: BREAKDOWN_COLUMNS[0],
  budget: BREAKDOWN_COLUMNS[1],
  forecast: BREAKDOWN_COLUMNS[2],
  actuals: BREAKDOWN_COLUMNS[3],
  difference: BREAKDOWN_COLUMNS[4],
  comments: BREAKDOWN_COLUMNS[5],
  payments: BREAKDOWN_COLUMNS[6],
}

/** Indices of numeric columns (budget, forecast, actuals, difference, payments). */
const NUMERIC_COLUMN_INDICES = [1, 2, 3, 4, 6] as const

function buildRowCells(
  item: ExpenseReportLineItem | BreakdownTotals,
): InnerTableRow['items'] | null {
  const rowItems: InnerTableRow['items'] = [
    {
      column: COLUMNS_MAP.label,
      value: 'label' in item ? item.label : 'Total',
    },
    {
      column: COLUMNS_MAP.budget,
      value: getCurrencyValue(item.budget),
    },
    {
      column: COLUMNS_MAP.forecast,
      value: getCurrencyValue(item.forecast),
    },
    {
      column: COLUMNS_MAP.actuals,
      value: getCurrencyValue(item.actuals),
    },
    {
      column: COLUMNS_MAP.difference,
      value: getCurrencyValue(item.forecast) - getCurrencyValue(item.actuals),
    },
    {
      column: COLUMNS_MAP.comments,
      value: 'comments' in item ? item.comments : '',
    },
    {
      column: COLUMNS_MAP.payments,
      value: getCurrencyValue(item.payments),
    },
  ]

  // Return null when all numeric columns are 0 (except the label and non-numeric columns)
  const allNumericZero = NUMERIC_COLUMN_INDICES.every((i) => (rowItems[i].value as number) === 0)
  if (allNumericZero) {
    return null
  }

  return rowItems
}

interface SectionConfig {
  filter: (item: ExpenseReportLineItem) => boolean
  sectionTitle: string
  subHeader: string
}

function buildSectionRows(
  wallet: ExpenseReportWallet,
  sectionConfig: SectionConfig,
): InnerTableRow[] {
  const categoryRows: InnerTableRow[] = []

  wallet.lineItems
    .filter((item) => isUsdsLineItem(item) && sectionConfig.filter(item))
    .forEach((item) => {
      const rowCells = buildRowCells(item)
      if (rowCells) {
        categoryRows.push({
          type: 'category',
          showHeader: true,
          subHeader: sectionConfig.subHeader,
          category: 'General',
          items: rowCells,
        })
      }
    })

  if (categoryRows.length === 0) {
    return []
  }

  return [
    {
      type: 'section',
      items: [
        {
          column: BREAKDOWN_COLUMNS[0],
          value: sectionConfig.sectionTitle,
        },
      ],
    } satisfies InnerTableRow,
    ...categoryRows,
  ]
}

/**
 * Builds table rows for the actuals breakdown UI from a wallet and group tree.
 * Returns section rows (headcount / non-headcount) plus a total row when there is data.
 */
export function getActualsBreakdownItemsForTable(
  wallet: ExpenseReportWallet,
  groupTree: GroupTree,
): InnerTableRow[] {
  const rows: InnerTableRow[] = []

  const headcountRows = buildSectionRows(wallet, {
    filter: (item) => groupTree.isGroupIdHeadcountExpense(item.groupId),
    sectionTitle: HEADCOUNT_GROUP_LABEL,
    subHeader: HEADCOUNT_GROUP_LABEL,
  })
  if (headcountRows.length > 0) {
    rows.push(...headcountRows)
  }

  const nonHeadcountRows = buildSectionRows(wallet, {
    filter: (item) => groupTree.isGroupIdNonHeadcountExpense(item.groupId),
    sectionTitle: NON_HEADCOUNT_GROUP_LABEL,
    subHeader: NON_HEADCOUNT_GROUP_LABEL,
  })
  if (nonHeadcountRows.length > 0) {
    rows.push(...nonHeadcountRows)
  }

  if (rows.length > 0) {
    const { budget, forecast, actuals, payments } = wallet.lineItems.filter(isUsdsLineItem).reduce(
      (acc, item) => ({
        budget: acc.budget + getCurrencyValue(item.budget),
        forecast: acc.forecast + getCurrencyValue(item.forecast),
        actuals: acc.actuals + getCurrencyValue(item.actuals),
        payments: acc.payments + getCurrencyValue(item.payments),
      }),
      { budget: 0, forecast: 0, actuals: 0, payments: 0 } satisfies BreakdownTotals,
    )

    rows.push({
      type: 'total',
      showHeader: false,
      items: buildRowCells({ budget, forecast, actuals, payments }) ?? [],
    })
  }

  return rows
}
