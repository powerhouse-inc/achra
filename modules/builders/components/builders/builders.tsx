import { createLoader, parseAsArrayOf, parseAsString, parseAsStringEnum } from 'nuqs/server'
import { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import { getBuilders } from '../../services/builders'
import { BuildersList } from './components/builders-list/builders-list'
import { BuildersTable } from './components/builders-table/builders-table'

const filtersParser = createLoader({
  search: parseAsString.withDefault(''),
  skills: parseAsArrayOf(parseAsStringEnum(Object.values(BuilderSkill))).withDefault([]),
})

export interface BuildersProps {
  className?: string
  asSectionContent?: boolean
  networkSlug: string
  searchParams: Promise<{
    search?: string
    skills?: string[]
  }>
}

export async function Builders({
  className,
  networkSlug,
  searchParams,
  asSectionContent = false,
}: BuildersProps) {
  const { search, skills } = await filtersParser(searchParams)
  const builders = await getBuilders({
    networkSlug,
    skills,
    name: search,
  })

  const extendedBuilders = [
    ...builders.flatMap((builder) => builder),
    ...builders.flatMap((builder) => builder),
    ...builders.flatMap((builder) => builder),
    ...builders.flatMap((builder) => builder),
    ...builders.flatMap((builder) => builder),
    ...builders.flatMap((builder) => builder),
  ]

  return (
    <div className={className}>
      <BuildersTable
        builders={extendedBuilders}
        networkSlug={networkSlug}
        className="hidden lg:block"
        asSectionContent={asSectionContent}
      />
      <BuildersList
        builders={extendedBuilders}
        networkSlug={networkSlug}
        className="block lg:hidden"
        asSectionContent={asSectionContent}
      />
    </div>
  )
}
