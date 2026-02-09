import { Folder } from 'lucide-react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'

export default function EmptyStateService() {
  return (
    <div className="flex h-fit flex-col gap-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Folder />
          </EmptyMedia>
          <EmptyTitle>No services found</EmptyTitle>
          <EmptyDescription>
            There are no services available for this combination of filters
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}
