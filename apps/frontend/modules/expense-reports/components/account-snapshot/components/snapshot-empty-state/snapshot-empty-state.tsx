import { FileX2 } from 'lucide-react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'

function SnapshotEmptyState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileX2 />
        </EmptyMedia>
        <EmptyTitle>No snapshot report for this month</EmptyTitle>
        <EmptyDescription>
          There is no account snapshot data available for the selected period.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export { SnapshotEmptyState }
