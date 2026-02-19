import {
  type RsResourceTemplate,
  type RsResourceTemplatesFilter,
  useResourceProfileQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getResourceProfile(
  filter: RsResourceTemplatesFilter,
): Promise<RsResourceTemplate | undefined> {
  const data = await useResourceProfileQuery.fetcher({ filter })()
  const resourceProfile = data.resourceTemplates.at(0)

  if (!resourceProfile) {
    return undefined
  }

  return {
    facetTargets: [],
    infoLink: null,
    lastModified: '',
    optionGroups: [],
    recurringServices: [],
    services: [],
    setupServices: [],
    targetAudiences: [],
    ...resourceProfile,
  }
}
