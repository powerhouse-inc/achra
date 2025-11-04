import { Breadcrumb } from '@/modules/shared/components/breadcrumb'
import type { Route } from 'next'

interface WorkstreamDetailsBreadcrumbProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

async function WorkstreamDetailsBreadcrumb({ params }: WorkstreamDetailsBreadcrumbProps) {
  const { slug, workstreamSlug } = await params

  return (
    <Breadcrumb
      items={[
        { label: 'Powerhouse', href: '/network/powerhouse' },
        {
          label: 'Vetra Beta Launch',
          href: `/network/${slug}/workstream/${workstreamSlug}` as Route,
        },
      ]}
    />
  )
}

export { WorkstreamDetailsBreadcrumb }
