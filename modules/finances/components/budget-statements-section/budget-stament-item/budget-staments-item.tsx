'use client'

import type { Builder } from '@/modules/__generated__/graphql/switchboard-generated'
import { BudgetStamentTable } from '../budget-stament-table/budget-stament-table'

import { useBudgetStamentData } from './useBudgetStamentData'

export interface BudgetStatementsItemProps {
  builders: Builder[]
}

export function BudgetStatementsItem({ builders }: BudgetStatementsItemProps) {
  const { buildersProcessed } = useBudgetStamentData({ builders })

  return <BudgetStamentTable builders={buildersProcessed} className="hidden lg:block" />
}
