import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@achra/ui/empty'
import { cn } from '@achra/ui/lib/utils'
import { type LucideIcon, ServerCrash } from 'lucide-react'

interface GenericErrorStateProps {
  icon?: LucideIcon
  title?: string
  description?: string
  showBorder?: boolean
  className?: string
}

function GenericErrorState({
  icon: Icon,
  title,
  description,
  showBorder = true,
  className,
}: GenericErrorStateProps) {
  return (
    <Empty
      className={cn(
        'bg-background mx-auto w-full max-w-sm md:p-6',
        showBorder && 'border border-solid',
        className,
      )}
    >
      <EmptyHeader>
        <EmptyMedia variant="icon">{Icon ? <Icon /> : <ServerCrash />}</EmptyMedia>
        <EmptyTitle>{title ?? 'Something went wrong'}</EmptyTitle>
        <EmptyDescription>
          {description ??
            'We ran into an unexpected error while loading this section. Please try again later.'}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export { GenericErrorState }
