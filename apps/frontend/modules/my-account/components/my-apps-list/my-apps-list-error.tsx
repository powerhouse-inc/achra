import { Button } from '@achra/ui/button'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@achra/ui/empty'
import { HardDrive } from 'lucide-react'

interface MyAppsListErrorProps {
  onRetry: () => void
}

function MyAppsListError({ onRetry }: MyAppsListErrorProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HardDrive aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>We couldn&apos;t load your apps</EmptyTitle>
        <EmptyDescription>Something went wrong. Try again in a moment.</EmptyDescription>
      </EmptyHeader>
      <Button variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </Empty>
  )
}

export { MyAppsListError }
