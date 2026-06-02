import { CheckIcon, WifiOffIcon } from 'lucide-react'
import { useNetworkState } from 'react-use'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/badge'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../ui/empty'
import { Spinner } from '../ui/spinner'

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
