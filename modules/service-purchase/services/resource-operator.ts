import {
  type BuilderProfileState,
  type BuildersFilter,
  useResourceOperatorQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getResourceOperator(
  filter: BuildersFilter,
): Promise<BuilderProfileState | undefined> {
  const data = await useResourceOperatorQuery.fetcher({ filter })()
  const operator = data.builders.at(0)

  if (!operator) {
    return undefined
  }

  return {
    operationalHubMember: {
      name: '',
      phid: '',
    },
    isOperator: true,
    links: [],
    products: [],
    projects: [],
    skills: [],
    scopes: [],
    ...operator,
  }
}
