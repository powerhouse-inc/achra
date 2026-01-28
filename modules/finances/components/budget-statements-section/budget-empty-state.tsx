import { Folder } from 'lucide-react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'

export default function BudgetEmptyState() {
  return (
    <div className="flex h-fit flex-col gap-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Folder />
          </EmptyMedia>
          <EmptyTitle>No budget statements found</EmptyTitle>
          <EmptyDescription>
            There are no contributors available with this combination of filters
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}
