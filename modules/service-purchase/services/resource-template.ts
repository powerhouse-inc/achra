import {
  type PurchaseResourceTemplateFieldsFragment,
  type RsResourceTemplatesFilter,
  useResourceTemplateQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getResourceTemplate(
  filter: RsResourceTemplatesFilter,
): Promise<PurchaseResourceTemplateFieldsFragment | undefined> {
  const data = await useResourceTemplateQuery.fetcher({ filter })()
  return data.resourceTemplates.at(0)
}
