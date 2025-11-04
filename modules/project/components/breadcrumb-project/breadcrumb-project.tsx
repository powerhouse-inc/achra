import { Breadcrumb } from '@/modules/shared/components/breadcrumb'
import type { Route } from 'next'

interface ProjectDetailsBreadcrumbProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

export async function ProjectDetailsBreadcrumb({ params }: ProjectDetailsBreadcrumbProps) {
  const { slug, workstreamSlug } = await params
  const items = [
    { label: 'Powerhouse', href: `/network/${slug}` as Route },
    { label: 'Vetra Beta Launch', href: `/network/${slug}/workstream/${workstreamSlug}` as Route },
    {
      label: 'Initiative Proposal',
      href: `/network/${slug}/workstream/${workstreamSlug}/initial-proposal` as Route,
    },
    {
      label: 'PRJ-1 - Front-end Development',
      href: `/network/${slug}/workstream/${workstreamSlug}/initial-proposal/project` as Route,
    },
  ]
  return <Breadcrumb items={items} />
}
