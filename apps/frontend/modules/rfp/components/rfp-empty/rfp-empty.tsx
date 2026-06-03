import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@achra/ui/empty'
import { Folder } from 'lucide-react'

interface RfpEmptyProps {
  title?: string
  description?: string
}

function RfpEmpty({
  title = 'No request for proposal found',
  description = 'No request for proposal found for this workstream.',
}: RfpEmptyProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export { RfpEmpty }
