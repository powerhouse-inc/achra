import { Breadcrumb } from '@/modules/shared/components/breadcrumb'
import type { Route } from 'next'

interface WorkstreamRfpBreadcrumbProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
  workstreamName: string
}

async function WorkstreamRfpBreadcrumb({ params, workstreamName }: WorkstreamRfpBreadcrumbProps) {
  const { slug, workstreamSlug } = await params

  return (
    <Breadcrumb
      items={[
        { label: 'Powerhouse', href: `/network/${slug}` as Route },
        {
          label: workstreamName,
          href: `/network/${slug}/workstream/${workstreamSlug}` as Route,
        },
        {
          label: 'Request For Proposal',
          href: `/network/${slug}/workstream/${workstreamSlug}/rfp` as Route,
        },
      ]}
    />
  )
}

export { WorkstreamRfpBreadcrumb }
