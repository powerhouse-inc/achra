import { FileX } from 'lucide-react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'

function BudgetStatementsEmptyState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileX />
        </EmptyMedia>
        <EmptyTitle>No Expense Reports Data</EmptyTitle>
        <EmptyDescription>There&apos;s no Expense reports data for this builder.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export { BudgetStatementsEmptyState }
