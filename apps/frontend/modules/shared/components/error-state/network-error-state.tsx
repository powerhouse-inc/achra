import { Badge } from '@achra/ui/badge'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@achra/ui/empty'
import { cn } from '@achra/ui/lib/utils'
import { Spinner } from '@achra/ui/spinner'
import { CheckIcon, WifiOffIcon } from 'lucide-react'
import { useNetworkState } from 'react-use'

interface NetworkErrorStateProps {
  showBorder?: boolean
  className?: string
}

function NetworkErrorState({ showBorder = true, className }: NetworkErrorStateProps) {
  const { online } = useNetworkState()

  return (
    <Empty
      className={cn(
        'bg-background mx-auto w-full max-w-sm md:p-6',
        showBorder && 'border border-solid',
        className,
      )}
    >
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
      </EmptyContent>
    </Empty>
  )
}

export { NetworkErrorState }
