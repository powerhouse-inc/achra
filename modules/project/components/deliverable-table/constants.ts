import type { ScopeOfWork_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'
import { getProgressPercentage } from '@/modules/roadmap/lib/type-helpers'

import {
  calculateDeliverableSubtotal,
  getDeliverableQuantity,
  getDeliverableUnitCost,
} from '../utils/utils'

export interface DeliverableTableColumn {
  header: string
  shortHeader?: string
  accessorKey: string
  hasSort: boolean
  sortReverse: boolean
  isNumeric: boolean
  getValue: (deliverable: ScopeOfWork_Deliverable) => string | number | null | undefined
}

export const DELIVERABLES_TABLE_COLUMNS: DeliverableTableColumn[] = [
  {
    header: 'Title',
    accessorKey: 'title',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
    getValue: (deliverable: ScopeOfWork_Deliverable) => deliverable.title,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
    getValue: (deliverable: ScopeOfWork_Deliverable) => deliverable.status,
  },
  {
    header: 'Progress',
    accessorKey: 'progress',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
    getValue: (deliverable: ScopeOfWork_Deliverable) =>
      getProgressPercentage(deliverable.workProgress ?? undefined),
  },
  {
    header: 'QTY',
    accessorKey: 'quantity',
    hasSort: true,
    sortReverse: false,
    isNumeric: true,
    getValue: (deliverable: ScopeOfWork_Deliverable) => getDeliverableQuantity(deliverable),
  },
  {
    shortHeader: 'UB',
    header: 'Unit Budget',
    accessorKey: 'unitBudget',
    hasSort: true,
    sortReverse: false,
    isNumeric: true,
    getValue: (deliverable: ScopeOfWork_Deliverable) => getDeliverableUnitCost(deliverable),
  },
  {
    header: 'Subtotal',
    accessorKey: 'subtotal',
    hasSort: true,
    sortReverse: false,
    isNumeric: true,
    getValue: (deliverable: ScopeOfWork_Deliverable) => calculateDeliverableSubtotal(deliverable),
  },
]
