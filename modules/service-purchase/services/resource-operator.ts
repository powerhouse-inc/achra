import {
  type BuildersFilter,
  type ResourceOperatorFieldsFragment,
  useResourceOperatorQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getResourceOperator(
  filter: BuildersFilter,
): Promise<ResourceOperatorFieldsFragment | undefined> {
  const data = await useResourceOperatorQuery.fetcher({ filter })()
  return data.builders.at(0)
}
