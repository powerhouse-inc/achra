import { Breadcrumb } from '@/modules/shared/components/breadcrumb'
import type { Route } from 'next'

interface WorkstreamInitialProposalBreadcrumbProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

async function WorkstreamInitialProposalBreadcrumb({
  params,
}: WorkstreamInitialProposalBreadcrumbProps) {
  const { slug, workstreamSlug } = await params

  return (
    <Breadcrumb
      items={[
        { label: 'Powerhouse', href: `/network/${slug}` as Route },
        {
          label: 'Vetra Beta Launch',
          href: `/network/${slug}/workstream/${workstreamSlug}` as Route,
        },
        {
          label: 'Initial Proposal',
          href: `/network/${slug}/workstream/${workstreamSlug}/initial-proposal` as Route,
        },
      ]}
    />
  )
}

export { WorkstreamInitialProposalBreadcrumb }
