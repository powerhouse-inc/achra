import { mockBuilderTeams } from '@/modules/networks/mocks/builders-section'
import { BuildersList } from './components/builders-list/builders-list'
import { BuildersTable } from './components/builders-table/builders-table'

export interface BuildersProps {
  className?: string
  networkSlug: string
}

export function Builders({ className, networkSlug }: BuildersProps) {
  return (
    <div className={className}>
      <BuildersTable
        builders={mockBuilderTeams}
        networkSlug={networkSlug}
        className="hidden lg:block"
      />
      <BuildersList
        builders={mockBuilderTeams}
        networkSlug={networkSlug}
        className="flex lg:hidden"
      />
    </div>
  )
}
