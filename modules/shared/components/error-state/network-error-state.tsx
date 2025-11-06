import { CheckIcon, RefreshCcwIcon, WifiOffIcon } from 'lucide-react'
import { useErrorBoundary } from 'react-error-boundary'
import { useNetworkState } from 'react-use'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../ui/empty'
import { Spinner } from '../ui/spinner'

function NetworkErrorState() {
  const { resetBoundary } = useErrorBoundary()
  const { online } = useNetworkState()

  return (
    <Empty className="bg-background mx-auto w-full max-w-sm border border-solid md:p-6">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <WifiOffIcon />
        </EmptyMedia>
        <EmptyTitle>You are offline</EmptyTitle>
        <EmptyDescription>Please check your internet connection and try again.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Badge variant={online ? 'success' : 'outline'}>
          {online ? <CheckIcon className="color-status-success" /> : <Spinner />}
          {online ? 'Your connection is back!' : 'Checking your connection...'}
        </Badge>
        <Button onClick={resetBoundary}>
          <RefreshCcwIcon /> Try again
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export { NetworkErrorState }
