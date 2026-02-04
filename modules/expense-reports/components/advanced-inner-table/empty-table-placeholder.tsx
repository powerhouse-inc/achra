import { Table2 } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/modules/shared/components/ui/empty'
import { cn } from '@/modules/shared/lib/utils'

interface EmptyTablePlaceholderProps {
  /** Builder or actor name/code shown in the message */
  actorName: string
  /** Whether to show the border outline. @default true */
  showBorder?: boolean
}

function EmptyTablePlaceholder({ actorName, showBorder = true }: EmptyTablePlaceholderProps) {
  return (
    <Empty className={cn('bg-background w-full md:p-6', showBorder && 'border border-solid')}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Table2 />
        </EmptyMedia>
        <EmptyTitle>No data reported by {actorName}</EmptyTitle>
      </EmptyHeader>
    </Empty>
  )
}

export { EmptyTablePlaceholder }
