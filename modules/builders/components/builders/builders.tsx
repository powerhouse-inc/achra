import { mockBuilderTeams } from '@/modules/networks/mocks/builders-section'
import { BuildersTable } from './components/builders-table/builders-table'

export interface BuildersProps {
  className?: string
}

export function Builders({ className }: BuildersProps) {
  return (
    <div className={className}>
      <BuildersTable builders={mockBuilderTeams} />
    </div>
  )
}
