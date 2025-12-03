import { notFound } from 'next/dist/client/components/not-found'
import { Suspense } from 'react'
import type {
  ScopeOfWork_Deliverable,
  ScopeOfWork_Project,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { ProjectDetailsBreadcrumb } from '@/modules/project/components'
import { ProjectCardItem } from '@/modules/project/components/project-card-item/project-card-item'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'
import { getWorkstreamDetails } from '@/modules/workstream/services/workstream-service'
// Improve this when its ready to be used
const BUILDER_ID = 'builder-1'

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug, workstreamSlug } = await params

  const workstream = await getWorkstreamDetails(slug, workstreamSlug)

  if (!workstream) {
    notFound()
  }

  const proposal = workstream.initialProposal
  const projects = proposal?.sow?.projects ?? []
  const builderName = proposal?.author.name ?? 'Unknown'
  const rawDeliverables = proposal?.sow?.deliverables ?? []

  const deliverablesMap = new Map(rawDeliverables.map((d) => [d.id, d]))

  return (
    <main>
      <PageBreadcrumbContainer>
        <Suspense fallback={<BreadcrumbSkeleton segments={4} />}>
          <ProjectDetailsBreadcrumb params={params} />
        </Suspense>
      </PageBreadcrumbContainer>

      <PageContent className="gap-8" variant="with-breadcrumb">
        {projects.map((project) => {
          const projectDeliverableIds = project.scope?.deliverables ?? []

          const projectDeliverables = projectDeliverableIds.flatMap((id) => {
            const deliverable = deliverablesMap.get(id)
            return deliverable ? [deliverable] : []
          })

          return (
            <ProjectCardItem
              key={project.id}
              project={project as ScopeOfWork_Project}
              deliverables={projectDeliverables as unknown as ScopeOfWork_Deliverable[]}
              builderName={builderName}
              builderId={BUILDER_ID}
              params={params}
            />
          )
        })}
      </PageContent>
    </main>
  )
}
