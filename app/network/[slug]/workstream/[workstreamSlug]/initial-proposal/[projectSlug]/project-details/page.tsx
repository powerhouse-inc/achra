import { notFound } from 'next/dist/client/components/not-found'
import { Suspense } from 'react'
import type {
  ScopeOfWork_Deliverable,
  ScopeOfWork_Project,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { ProjectDetailsBreadcrumb } from '@/modules/project/components'
import { ProjectCardItem } from '@/modules/project/components/project-card-item/project-card-item'
import { getWorkstreamProjects } from '@/modules/project/services/workstream-projects-services'
import { findProjectBySlug, resolveProjectDeliverables } from '@/modules/project/utils'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'
// Improve this when its ready to be used
const BUILDER_ID = 'builder-1'

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string; workstreamSlug: string; projectSlug: string }>
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug, workstreamSlug, projectSlug } = await params
  const workstream = await getWorkstreamProjects(slug, workstreamSlug)

  if (!workstream) notFound()

  const { initialProposal } = workstream
  const sowProjects = (initialProposal?.sow?.projects ?? []) as ScopeOfWork_Project[]
  const sowDeliverables = (initialProposal?.sow?.deliverables ??
    []) as unknown as ScopeOfWork_Deliverable[]
  const builderName = initialProposal?.author.name ?? 'Unknown'

  const project = findProjectBySlug(sowProjects, projectSlug)

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
          project={project}
          deliverables={projectDeliverables as unknown as ScopeOfWork_Deliverable[]}
          builderName={builderName}
          builderId={BUILDER_ID}
          params={params}
        />
      </PageContent>
    </main>
  )
}
