import { Receipt } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/modules/shared/components/ui/empty'

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
