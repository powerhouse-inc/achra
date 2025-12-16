import { getBuilders } from '../../services/builders'
import { BuildersList } from './components/builders-list/builders-list'
import { BuildersTable } from './components/builders-table/builders-table'

export interface BuildersProps {
  className?: string
  networkSlug: string
}

export async function Builders({ className, networkSlug }: BuildersProps) {
  const builders = await getBuilders({ networkSlug })
  return (
    <div className={className}>
      <BuildersTable builders={builders} networkSlug={networkSlug} className="hidden lg:block" />
      <BuildersList builders={builders} networkSlug={networkSlug} className="flex lg:hidden" />
    </div>
  )
}
