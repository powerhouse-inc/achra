import { Breadcrumb } from '@/modules/shared/components/breadcrumb'
import type { Route } from 'next'

interface WorkstreamDetailsBreadcrumbProps {
  networkName: string
  networkSlug: string
  workstreamName: string
  workstreamSlug: string
}

function WorkstreamDetailsBreadcrumb({
  networkName,
  networkSlug,
  workstreamName,
  workstreamSlug,
}: WorkstreamDetailsBreadcrumbProps) {
  return (
    <Breadcrumb
      items={[
        { label: networkName, href: `/network/${networkSlug}` as Route },
        {
          label: workstreamName,
          href: `/network/${networkSlug}/workstream/${workstreamSlug}` as Route,
        },
      ]}
    />
  )
}

export { WorkstreamDetailsBreadcrumb }
