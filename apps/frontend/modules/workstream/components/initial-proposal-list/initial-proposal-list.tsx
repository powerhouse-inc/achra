import type { FullQueryWorkstream } from '@/modules/__generated__/graphql/switchboard-generated'
import { getWorkstreamsProjects } from '@/modules/project/services/workstream-projects-services'
import { WorkstreamCard } from '@/modules/workstream/components/workstream-card'
import { getWorkstreams } from '@/modules/workstream/services/workstream-service'

interface InitialProposalListProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

async function InitialProposalList({ params }: Readonly<InitialProposalListProps>) {
  const { slug } = await params
  const networkFilter = [slug]

  const workstreams = await getWorkstreams({
    networkSlugs: networkFilter,
  })

  const projectsMap = await getWorkstreamsProjects({
    networkSlugs: networkFilter,
  })

  const workstreamsWithProjects = workstreams.map((workstream) => {
    const workstreamSlug = workstream.slug ?? 'unknown'
    const projects = projectsMap.get(workstreamSlug) ?? []

    return {
      workstream,
      projects,
    }
  })

  return (
    <div className="flex flex-col gap-8">
      {workstreamsWithProjects.map(({ workstream, projects }) => (
        <WorkstreamCard
          key={workstream.slug}
          workstream={workstream as FullQueryWorkstream}
          projects={projects}
          fullVersion={false}
        />
      ))}
    </div>
  )
}

export { InitialProposalList }
