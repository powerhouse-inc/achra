import { getNetworkBySlug } from '@/modules/networks/services/networks-service'
import { Breadcrumb } from '@/modules/shared/components/breadcrumb'
import { getWorkstreamDetails } from '../../services/workstream-service'
import type { Route } from 'next'

interface WorkstreamInitialProposalBreadcrumbProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

async function WorkstreamInitialProposalBreadcrumb({
  params,
}: WorkstreamInitialProposalBreadcrumbProps) {
  const { slug, workstreamSlug } = await params
  const networkData = await getNetworkBySlug(slug)
  const networkName = networkData?.name ?? ''
  const workstreamData = await getWorkstreamDetails(slug, workstreamSlug)
  const workstreamName = workstreamData?.title ?? ''

  return (
    <Breadcrumb
      items={[
        { label: networkName, href: `/network/${slug}` as Route },
        {
          label: 'Contribute',
          href: `/network/${slug}/workstream/${workstreamSlug}` as Route,
        },
        {
          label: workstreamName,
          href: `/network/${slug}/workstream/${workstreamSlug}/initial-proposal` as Route,
        },
      ]}
    />
  )
}

export { WorkstreamInitialProposalBreadcrumb }
