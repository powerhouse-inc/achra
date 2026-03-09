import { LinkIcon } from 'lucide-react'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { getWorkstreamDetails } from '@/modules/workstream/services/workstream-service'
import { BudgetProjectCard } from './budget-project-card'
import type { Route } from 'next'

interface BudgetingSectionProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

async function BudgetingSection({ params }: Readonly<BudgetingSectionProps>) {
  const { slug, workstreamSlug } = await params
  const workstream = await getWorkstreamDetails(slug, workstreamSlug)

  if (!workstream) return null

  const sow = workstream.initialProposal?.sow
  const projects = sow?.projects ?? []
  const deliverables = sow?.deliverables ?? []
  const paymentTerms = workstream.initialProposal?.paymentTerms

  const totalBudget = paymentTerms?.totalAmount as number | null | undefined
  const currency = paymentTerms?.currency ?? 'USD'

  if (projects.length === 0) return null

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-foreground text-xl leading-[1.2] font-bold sm:text-2xl md:text-3xl">
            Budgeting
          </h2>
          <LinkIcon className="text-foreground/50 size-5 md:size-6" />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-foreground text-sm font-semibold sm:text-base/6">Total Budget</span>
          <div className="bg-secondary rounded-md border px-3 py-2">
            <span className="text-foreground text-sm font-semibold tabular-nums sm:text-base/6">
              {totalBudget == null
                ? '2000 USD'
                : `${usLocalizedNumber(totalBudget, 2)} ${currency}`}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {projects.map((project) => {
          const projectDeliverableIds = project.scope?.deliverables ?? []
          const projectDeliverables = deliverables.filter((d) =>
            projectDeliverableIds.includes(d.id),
          )

          return (
            <BudgetProjectCard
              key={project.id}
              project={project}
              deliverables={projectDeliverables}
              detailsHref={
                `/network/${slug}/workstream/${workstreamSlug}/initial-proposal/${project.slug}/project-details` as Route
              }
            />
          )
        })}
      </div>
    </section>
  )
}

export { BudgetingSection }
