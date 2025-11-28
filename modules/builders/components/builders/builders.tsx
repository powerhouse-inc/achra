import { mockBuilderTeams } from '@/modules/networks/mocks/builders-section'
import { BuildersList } from './components/builders-list/builders-list'
import { BuildersTable } from './components/builders-table/builders-table'

export interface BuildersProps {
  className?: string
}

export function Builders({ className }: BuildersProps) {
  return (
    <div className={className}>
      <BuildersTable builders={mockBuilderTeams} className="hidden lg:block" />
      <BuildersList builders={mockBuilderTeams} className="flex lg:hidden" />
    </div>
  )
}
