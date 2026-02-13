import type { SnapshotAccount } from '@/modules/__generated__/graphql/switchboard-generated'
import type { JSX } from 'react'

export enum TabSection {
  ACCOUNT_SNAPSHOT = 'account-snapshot',
  EXPENSE_REPORTS = 'expense-reports',
}

export interface GroupTreeNode {
  id: string
  label: string
  children: GroupTreeNode[]
}

export interface Category {
  id: string
  parentId: string | null
  order: number
  name: string
  headcountExpense: boolean
}

export interface ExtendedCategory extends Category {
  isCollapsed: boolean
}

export interface CategoryTree extends ExtendedCategory {
  children: CategoryTree[]
}

// Account snapshot
export interface CalculatedBalance {
  startingBalance: number
  endingBalance: number
  inflow: number
  outflow: number
}

export type ExpenseComparisonLineItem = {
  reportedActuals: number
  onChainOnly: number
  onChainDifference: number
  offChainIncluded?: number
  offChainDifference?: number
} & ({ isTotals: true } | { isTotals?: false; month: string })

// Reserve account
export interface OperationalGroup {
  type: 'group'
  id: string
  label: string
  balance: CalculatedBalance
  children: SnapshotAccount[]
}

export type ReserveAccount = SnapshotAccount | OperationalGroup

// Advanced inner table
export interface InnerTableColumn {
  align?: string
  header: string | JSX.Element
  type?: 'number' | 'incomeNumber' | 'text' | 'custom'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cellRender?: (data: any) => JSX.Element
  headerAlign?: string
  isCardHeader?: boolean
  isCardFooter?: boolean
  width?: string
  minWidth?: string
  className?: string
  hidden?: boolean
  hasBorderRight?: boolean
  hasBorderBottomOnCard?: boolean
  handleOpenModal?: () => void
}

export interface InnerTableCell {
  column: InnerTableColumn
  value: unknown
  isBold?: boolean
}

export type RowType = 'normal' | 'total' | 'section' | 'groupTitle' | 'subTotal' | 'category'
export type CardSpacingSize = 'small' | 'large'

export interface InnerTableRow {
  type: RowType
  subHeader?: string
  category?: string
  categoryGroup?: string
  items: InnerTableCell[]
  borderTop?: boolean
  borderBottom?: boolean
  hideMobile?: boolean
  showHeader?: boolean
}

export interface AdvancedInnerTableProps {
  columns: InnerTableColumn[]
  items: InnerTableRow[]
  style?: React.CSSProperties
  cardsTotalPosition?: 'top' | 'bottom'
  tablePlaceholder?: JSX.Element
  longCode: string
  className?: string
  cardSpacingSize?: CardSpacingSize
  showSubHeader?: boolean
  spaceEachCards?: number
}

export type Alignment = 'left' | 'center' | 'right'
export type ItemType = RowType

// Actuals / breakdown
export interface BreakdownTotals {
  budget: number
  forecast: number
  actuals: number
  payments: number
}

// Group tree
export interface GroupTreeNodeToCategoryTreeOptions {
  headcountExpense: boolean
  order: number
  parentId: string | null
  expandedState: Map<string, boolean>
}

// Service / budget statement
export interface BudgetStatementMonthMeta {
  month: Date
  status: string | null
  lastUpdate: string | null
}
