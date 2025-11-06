import { type LucideIcon, ServerCrash } from 'lucide-react'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../ui/empty'

interface GenericErrorStateProps {
  icon?: LucideIcon
  title?: string
  description?: string
}

function GenericErrorState({ icon: Icon, title, description }: GenericErrorStateProps) {
  return (
    <Empty className="bg-background mx-auto w-full max-w-sm border border-solid md:p-6">
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
