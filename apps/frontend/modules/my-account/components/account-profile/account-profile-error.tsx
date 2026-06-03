import { UserRound } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/components/ui/empty'

interface AccountProfileErrorProps {
  onRetry: () => void
}

function AccountProfileError({ onRetry }: AccountProfileErrorProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UserRound aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>We couldn&apos;t load your profile</EmptyTitle>
        <EmptyDescription>Something went wrong. Try again in a moment.</EmptyDescription>
      </EmptyHeader>
      <Button variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </Empty>
  )
}

export { AccountProfileError }
