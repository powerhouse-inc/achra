import { getNetworkBySlug } from '@/modules/networks/services/networks-service'
import { Breadcrumb } from '@/modules/shared/components/breadcrumb'
import { getWorkstreamDetails } from '@/modules/workstream/services/workstream-service'
import { formatSlugToTitle } from '../../utils'
import type { Route } from 'next'

interface ProjectDetailsBreadcrumbProps {
  params: Promise<{ slug: string; workstreamSlug: string; projectSlug?: string }>
}

export async function ProjectDetailsBreadcrumb({ params }: ProjectDetailsBreadcrumbProps) {
  const { slug, workstreamSlug, projectSlug } = await params
  const networkData = await getNetworkBySlug(slug)
  const workstreamData = await getWorkstreamDetails(slug, workstreamSlug)
  const networkName = networkData?.name ?? ''
  const workstreamName = workstreamData?.title ?? ''
  const items = [
    { label: networkName, href: `/network/${slug}` as Route },
    { label: workstreamName, href: `/network/${slug}/workstream/${workstreamSlug}` as Route },
    {
      label: 'Initiative Proposal',
      href: `/network/${slug}/workstream/${workstreamSlug}/initial-proposal` as Route,
    },
    {
      label: formatSlugToTitle(projectSlug ?? ''),
      href: `/network/${slug}/workstream/${workstreamSlug}/initial-proposal/project` as Route,
    },
  ]
  return <Breadcrumb items={items} />
}
