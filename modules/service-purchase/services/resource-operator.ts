import {
  type BuilderProfileState,
  type BuildersFilter,
  useResourceOperatorQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getResourceOperator(
  filter: BuildersFilter,
): Promise<BuilderProfileState | undefined> {
  const data = await useResourceOperatorQuery.fetcher({ filter })()
  const operator = data.builders[0]
  if (!operator) return undefined
  return {
    isOperator: true,
    links: [],
    operationalHubMember: {
      name: '',
      phid: '',
    },
    products: [],
    projects: [],
    scopes: [],
    skills: [],
    ...operator,
  }
}
