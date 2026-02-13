import {
  RsTemplateStatus,
  useResourceTemplatesQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import type { Service } from '@/modules/shared/types/services'

const STATUS_PRIORITY: Record<string, number> = {
  [RsTemplateStatus.Active]: 0,
  [RsTemplateStatus.ComingSoon]: 1,
}

export async function getServices(): Promise<Service[]> {
  const data = await useResourceTemplatesQuery.fetcher()()

  return data.resourceTemplates
    .filter(
      (service) =>
        service.status !== RsTemplateStatus.Draft && service.status !== RsTemplateStatus.Deprecated,
    )
    .sort((a, b) => (STATUS_PRIORITY[a.status] ?? 2) - (STATUS_PRIORITY[b.status] ?? 2))
}
