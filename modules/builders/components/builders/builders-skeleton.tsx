import { BuildersListSkeleton } from './components/builders-list/builders-list-skeleton'
import { BuildersTableSkeleton } from './components/builders-table/builders-table-skeleton'

function BuildersSkeleton() {
  return (
    <>
      <BuildersTableSkeleton className="hidden lg:flex" />
      <BuildersListSkeleton className="flex lg:hidden" />
    </>
  )
}

export { BuildersSkeleton }
