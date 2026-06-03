import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@achra/ui/empty'
import { Folder } from 'lucide-react'

function DeliverablesEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>No deliverables found</EmptyTitle>
      </EmptyHeader>
    </Empty>
  )
}

export { DeliverablesEmpty }
