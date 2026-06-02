import { SlidersHorizontal, User } from 'lucide-react'
import type { WorkstreamDetailsProject } from '@/modules/project/types'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { ProposalKeyValueElement } from '@/modules/shared/components/proposal-key-value-element'
import { formatBudgetType, formatProjectBudget } from '@/modules/workstream/lib/utils'
import { BudgetDeliverableItem } from './budget-deliverable-item'
import type { Route } from 'next'

interface Deliverable {
  id: string
  code: string
  title: string
}

interface BudgetProjectCardProps {
  project: WorkstreamDetailsProject
  deliverables: Deliverable[]
  detailsHref: Route
}

function BudgetProjectCard({
  project,
  deliverables,
  detailsHref,
}: Readonly<BudgetProjectCardProps>) {
  return (
    <div className="bg-background flex flex-col gap-4 rounded-xl border p-3 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-end gap-1">
              <span className="text-foreground/70 text-sm font-semibold uppercase sm:text-base/6">
                {project.code}
              </span>
              <span className="text-foreground text-base leading-[1.2] font-bold sm:text-xl">
                {project.title}
              </span>
            </div>
            {project.projectOwner && (
              <div className="text-foreground/70 flex items-center gap-2 text-sm sm:text-base/6">
                <span>by</span>
                <div className="flex items-center gap-2">
                  <User className="size-5 sm:size-6" />
                  <span>{project.projectOwner.name}</span>
                </div>
              </div>
            )}
          </div>
          <InternalLink href={detailsHref} size="sm" className="w-fit shrink-0">
            Details
          </InternalLink>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProposalKeyValueElement
            keyValue="Budget type"
            keyIcon={SlidersHorizontal}
            value={formatBudgetType(project.budgetType)}
          />
          <ProposalKeyValueElement
            keyValue="Project Budget"
            keyIcon={SlidersHorizontal}
            value={formatProjectBudget(project.budget, project.currency)}
          />
        </div>

        {project.abstract && (
          <p className="text-foreground text-sm sm:text-base/6">{project.abstract}</p>
        )}
      </div>

      {deliverables.length > 0 && (
        <div className="flex flex-col gap-4">
          {deliverables.map((deliverable) => (
            <BudgetDeliverableItem
              key={deliverable.id}
              code={deliverable.code}
              title={deliverable.title}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { BudgetProjectCard }
