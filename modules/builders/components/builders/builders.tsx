import { createLoader, parseAsArrayOf, parseAsString, parseAsStringEnum } from 'nuqs/server'
import { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/modules/shared/components/ui/empty'
import { getBuilders } from '../../services/builders'
import { BuildersList } from './components/builders-list/builders-list'
import { BuildersTable } from './components/builders-table/builders-table'

const filtersParser = createLoader({
  search: parseAsString.withDefault(''),
  skills: parseAsArrayOf(parseAsStringEnum(Object.values(BuilderSkill))).withDefault([]),
})

export interface BuildersProps {
  className?: string
  networkSlug: string
  searchParams: Promise<{
    search?: string
    skills?: string[]
  }>
}

export async function Builders({ className, networkSlug, searchParams }: BuildersProps) {
  const { search, skills } = await filtersParser(searchParams)
  const builders = await getBuilders({
    slug: networkSlug,
    skills,
    name: search,
  })

  if (builders.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No builders found</EmptyTitle>
          <EmptyDescription>There are no builders to display at this time.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className={className}>
      <BuildersTable builders={builders} networkSlug={networkSlug} className="hidden lg:block" />
      <BuildersList builders={builders} networkSlug={networkSlug} className="flex lg:hidden" />
    </div>
  )
}
