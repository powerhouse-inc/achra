import type { FullQueryWorkstream } from '@/modules/__generated__/graphql/switchboard-generated'
import { Breadcrumb } from '@/modules/shared/components/breadcrumb'
import { slugify } from '@/modules/shared/lib/slug'
import type { Route } from 'next'

interface WorkstreamDetailsBreadcrumbProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
  workstream: FullQueryWorkstream
}

async function WorkstreamDetailsBreadcrumb({
  params,
  workstream,
}: WorkstreamDetailsBreadcrumbProps) {
  const { slug, workstreamSlug } = await params
  const networkSlug = slugify(workstream.client?.name ?? 'Unknown')
  const workstreamTitle = workstream.title ?? 'Unknown'

  return (
    <Breadcrumb
      items={[
        { label: networkSlug, href: `/network/${networkSlug}` as Route },
        {
          label: workstreamTitle,
          href: `/network/${slug}/workstream/${workstreamSlug}` as Route,
        },
      ]}
    />
  )
}

export { WorkstreamDetailsBreadcrumb }
