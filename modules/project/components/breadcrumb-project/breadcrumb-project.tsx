import { getNetworkBySlug } from '@/modules/networks/services/networks-service'
import { Breadcrumb } from '@/modules/shared/components/breadcrumb'
import { getWorkstreamDetails } from '@/modules/workstream/services/workstream-service'
import type { Route } from 'next'

interface ProjectDetailsBreadcrumbProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

export async function ProjectDetailsBreadcrumb({ params }: ProjectDetailsBreadcrumbProps) {
  const { slug, workstreamSlug } = await params
  const networkData = await getNetworkBySlug(slug)
  const workstreamData = await getWorkstreamDetails(slug, workstreamSlug)
  const networkName = networkData?.name ?? ''
  const workstreamName = workstreamData?.title ?? ''
  const title = workstreamData?.initialProposal?.sow?.title ?? 'Unknown'
  const items = [
    { label: networkName, href: `/network/${slug}` as Route },
    { label: workstreamName, href: `/network/${slug}/workstream/${workstreamSlug}` as Route },
    {
      label: 'Initiative Proposal',
      href: `/network/${slug}/workstream/${workstreamSlug}/initial-proposal` as Route,
    },
    {
      label: title,
      href: `/network/${slug}/workstream/${workstreamSlug}/initial-proposal/project` as Route,
    },
  ]
  return <Breadcrumb items={items} />
}
