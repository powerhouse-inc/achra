import {
  type ResourceProfileFieldsFragment,
  type RsResourceTemplatesFilter,
  useResourceProfileQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getResourceProfile(
  filter: RsResourceTemplatesFilter,
): Promise<ResourceProfileFieldsFragment | undefined> {
  const data = await useResourceProfileQuery.fetcher({ filter })()
  return data.resourceTemplates.at(0)
}
