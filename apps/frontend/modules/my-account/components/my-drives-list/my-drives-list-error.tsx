import { HardDrive } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/components/ui/empty'

interface MyDrivesListErrorProps {
  onRetry: () => void
}

function MyDrivesListError({ onRetry }: MyDrivesListErrorProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HardDrive aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>We couldn&apos;t load your drives</EmptyTitle>
        <EmptyDescription>Something went wrong. Try again in a moment.</EmptyDescription>
      </EmptyHeader>
      <Button variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </Empty>
  )
}

export { MyDrivesListError }
