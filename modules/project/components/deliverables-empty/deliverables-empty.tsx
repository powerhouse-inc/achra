import { Folder } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/modules/shared/components/ui/empty'

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
