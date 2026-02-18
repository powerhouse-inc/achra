import {
  type ResourceTemplate_ResourceTemplateState,
  useResourceProfileQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getResourceProfile(
  docId: string,
): Promise<ResourceTemplate_ResourceTemplateState | undefined> {
  const data = await useResourceProfileQuery.fetcher({ docId })()
  const state = data.ResourceTemplate?.getDocument?.state

  if (!state) {
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
    ...state,
  }
}
