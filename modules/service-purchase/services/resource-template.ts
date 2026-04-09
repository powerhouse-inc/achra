import {
  type RsResourceTemplate,
  type RsResourceTemplatesFilter,
  useResourceTemplateQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getResourceTemplate(
  filter: RsResourceTemplatesFilter,
): Promise<RsResourceTemplate | undefined> {
  const data = await useResourceTemplateQuery.fetcher({ filter })()
  const template = data.resourceTemplates.at(0)

  if (!template) {
    return undefined
  }

  return {
    facetTargets: [],
    lastModified: '',
    optionGroups: [],
    recurringServices: [],
    setupServices: [],
    targetAudiences: [],
    services: [],
    ...template,
  }
}
