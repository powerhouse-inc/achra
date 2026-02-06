import { useResourceTemplatesQuery } from '@/modules/__generated__/graphql/switchboard-generated'
import { ServicesPageContent } from './services-page-content'

export async function ServicesListSection() {
  const data = await useResourceTemplatesQuery.fetcher()()

  return <ServicesPageContent services={data.resourceTemplates} />
}
