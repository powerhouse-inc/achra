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
