import { Briefcase, SearchX } from 'lucide-react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'

interface WorkstreamEmptyProps {
  /**
   * Whether the empty state is due to search/filter results
   * @default false
   */
  hasActiveFilters?: boolean
}

const emptyStates = {
  filtered: {
    icon: SearchX,
    title: 'No workstreams found',
    description:
      'No workstreams match your search criteria. Try adjusting your filters or search terms.',
  },
  default: {
    icon: Briefcase,
    title: 'No workstreams yet',
    description: 'There are no workstreams available at this time.',
  },
} as const

function WorkstreamEmpty({ hasActiveFilters = false }: WorkstreamEmptyProps) {
  const state = hasActiveFilters ? emptyStates.filtered : emptyStates.default
  const Icon = state.icon

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{state.title}</EmptyTitle>
        <EmptyDescription>{state.description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export { WorkstreamEmpty }
