import type {
  BuilderProject,
  ScopeOfWork_Deliverable,
  ScopeOfWork_DeliverableSetStatus,
  ScopeOfWork_Progress,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { BudgetMetricCard } from '@/modules/project/components/budget-metric-card'
import { KeyResultsMetricCard } from '@/modules/project/components/key-results-metric-card'
import { StatusMetricCard } from '@/modules/project/components/status-metric-card'
import { getProgressPercentage } from '@/modules/roadmap/lib/type-helpers'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { Card, CardContent, CardHeader } from '@/modules/shared/components/ui/card'

interface ProjectCardProps {
  project: BuilderProject
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="gap-4 p-3">
      <CardHeader className="flex items-center justify-between p-0 sm:items-end">
        <div className="flex items-baseline gap-1">
          <div className="text-lg leading-[120%] font-bold lg:text-2xl">{project.title}</div>
          <div className="text-foreground/50 text-sm/5.5 font-semibold uppercase lg:text-base/6">
            {project.code}
          </div>
        </div>

        <InternalLink href="#" size="icon" className="sm:hidden" />
        <InternalLink href="#" className="hidden sm:flex">
          View Project
        </InternalLink>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        <p className="text-sm/5.5 lg:text-base/6">{project.abstract ?? ''}</p>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <BudgetMetricCard value={project.budget ?? 0} unit={project.currency ?? 'DAI'} />
          <StatusMetricCard
            status={project.scope?.status as unknown as ScopeOfWork_DeliverableSetStatus}
            // TODO: this function is commonly used in the app, we should move it to a shared space
            progress={getProgressPercentage(
              // TODO: This is another instance of unified types issues from the backend
              project.scope?.progress as unknown as ScopeOfWork_Progress,
            )}
          />
          <KeyResultsMetricCard
            completed={project.scope?.deliverablesCompleted.completed ?? 0}
            total={project.scope?.deliverablesCompleted.total ?? 0}
            deliverables={project.scope?.deliverables as unknown as ScopeOfWork_Deliverable[]}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export { ProjectCard }
