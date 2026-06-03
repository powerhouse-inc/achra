import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@achra/ui/empty'
import { Receipt } from 'lucide-react'

function TransactionEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Receipt />
        </EmptyMedia>
        <EmptyTitle>No transactions this month</EmptyTitle>
      </EmptyHeader>
    </Empty>
  )
}

export { TransactionEmpty }
