import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@achra/ui/empty'
import { Folder } from 'lucide-react'

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
