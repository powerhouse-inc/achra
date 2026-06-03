import { notFound } from 'next/dist/client/components/not-found'
import { Suspense } from 'react'
import type {
  ScopeOfWork_Deliverable,
  ScopeOfWork_Project,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { ProjectDetailsBreadcrumb } from '@/modules/project/components/breadcrumb-project'
import { ProjectCardItem } from '@/modules/project/components/project-card-item/project-card-item'
import { resolveProjectDeliverables } from '@/modules/project/lib/utils'
import {
  getWorkstreamProjectBySlug,
  getWorkstreamProjects,
} from '@/modules/project/services/workstream-projects-services'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'
import ff from '@/modules/shared/lib/feature-flags'

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string; workstreamSlug: string; projectSlug: string }>
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  if (!ff.workstreams.PROJECT_DETAILS_ENABLED) {
    return notFound()
  }

  const { slug, workstreamSlug, projectSlug } = await params
  const workstream = await getWorkstreamProjects(slug, workstreamSlug)
  const project = await getWorkstreamProjectBySlug(slug, workstreamSlug, projectSlug)

  if (!workstream) notFound()

  const { initialProposal } = workstream

  const sowDeliverables = (initialProposal?.sow?.deliverables ??
    []) as unknown as ScopeOfWork_Deliverable[]

  const firstContributor = initialProposal?.sow?.contributors[0]
  const builderIcon = firstContributor?.icon
  const builderName = firstContributor?.name
  const builderId = firstContributor?.slug

  if (!project) notFound()

  const projectDeliverables = resolveProjectDeliverables(
    sowDeliverables,
    project.scope?.deliverables,
  )

  return (
    <main>
      <PageBreadcrumbContainer>
        <Suspense fallback={<BreadcrumbSkeleton segments={4} />}>
          <ProjectDetailsBreadcrumb params={params} />
        </Suspense>
      </PageBreadcrumbContainer>

      <PageContent className="gap-8" variant="with-breadcrumb">
        <ProjectCardItem
          project={project as ScopeOfWork_Project}
          deliverables={projectDeliverables as unknown as ScopeOfWork_Deliverable[]}
          builderName={builderName ?? 'Unknown'}
          builderId={builderId ?? ''}
          params={params}
          builderIcon={builderIcon ?? ''}
        />
      </PageContent>
    </main>
  )
}
