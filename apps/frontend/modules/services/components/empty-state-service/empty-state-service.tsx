import { Folder } from 'lucide-react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'

interface EmptyStateServiceProps {
  title: string
  description: string
}

function EmptyStateService({ title, description }: Readonly<EmptyStateServiceProps>) {
  return (
    <div className="flex h-fit flex-col gap-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Folder />
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}

export { EmptyStateService }
