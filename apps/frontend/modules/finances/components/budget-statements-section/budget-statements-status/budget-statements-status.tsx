import { useMemo } from 'react'
import {
  ExpenseReport_ExpenseReportStatus,
  type Maybe,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { GenericChip } from '@/modules/shared/components/chips/generic-chip/generic-chip'

interface BudgetStatementsStatusProps {
  status: Maybe<ExpenseReport_ExpenseReportStatus> | undefined
}

function BudgetStatementsStatus({ status }: Readonly<BudgetStatementsStatusProps>) {
  const { label, color } = useMemo(() => {
    if (!status) return { label: 'Unknown', color: 'gray' }
    switch (status) {
      case ExpenseReport_ExpenseReportStatus.Draft:
        return {
          label: 'Draft',
          color: 'gray',
        }
      case ExpenseReport_ExpenseReportStatus.Review:
        return {
          label: 'Review',
          color: 'blue',
        }
      case ExpenseReport_ExpenseReportStatus.Final:
        return {
          label: 'Final',
          color: 'green',
        }

      default:
        return { label: status, color: 'gray' }
    }
  }, [status])

  return (
    <GenericChip variant="filled" color={color}>
      {label}
    </GenericChip>
  )
}

export { BudgetStatementsStatus }
