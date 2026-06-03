import { FilePenLine } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'

function NoDeliverables() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FilePenLine />
        </EmptyMedia>
        <EmptyTitle>No deliverables available</EmptyTitle>
        <EmptyDescription>
          There are no deliverables in this proposal yet. Create an alternative proposal to get
          started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button className="w-fit">
          <span>Create Alternative Proposal</span>
          <FilePenLine className="size-4" />
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export { NoDeliverables }
