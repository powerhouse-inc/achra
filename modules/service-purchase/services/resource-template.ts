import {
  type ResourceTemplate_ResourceTemplateState,
  useResourceTemplateQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getResourceTemplate(
  docId: string,
): Promise<ResourceTemplate_ResourceTemplateState | undefined> {
  const data = await useResourceTemplateQuery.fetcher({ docId })()
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
    faqFields: [],
    ...state,
  }
}
