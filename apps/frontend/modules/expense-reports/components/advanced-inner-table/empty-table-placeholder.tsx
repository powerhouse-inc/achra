import { FileX } from 'lucide-react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'
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
          <FileX />
        </EmptyMedia>
        <EmptyTitle>No Expense Reports Data</EmptyTitle>
        <EmptyDescription>
          There&apos;s no Expense Reports data reported by {actorName}.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export { EmptyTablePlaceholder }
