import { notFound } from 'next/dist/client/components/not-found'
import { Suspense } from 'react'
import type { ScopeOfWork_Project } from '@/modules/__generated__/graphql/switchboard-generated'
import { ProjectDetailsBreadcrumb } from '@/modules/project/components'
import { ProjectCardItem } from '@/modules/project/components/project-card-item/project-card-item'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'
import { getWorkstreamDetails } from '@/modules/workstream/services/workstream-service'

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

  return (
    <main>
      <PageBreadcrumbContainer>
        <Suspense fallback={<BreadcrumbSkeleton segments={4} />}>
          <ProjectDetailsBreadcrumb params={params} />
        </Suspense>
      </PageBreadcrumbContainer>

      <PageContent className="gap-8" variant="with-breadcrumb">
        {projects.map((project) => {
          return (
            <ProjectCardItem
              key={project.id}
              project={project as ScopeOfWork_Project}
              deliverables={[]}
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
