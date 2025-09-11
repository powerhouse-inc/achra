import {
  type ScopeOfWork_Project,
  type ScopeOfWork_Agent,
  type ScopeOfWork_Deliverable,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { cn } from '@/modules/shared/lib/utils'
import { splitInRows } from '../../lib/deliverables'
import { DeliverableCard } from '../deliverable-card'

interface DeliverablesSectionProps {
  deliverables: ScopeOfWork_Deliverable[]
  contributors: ScopeOfWork_Agent[]
  projects: ScopeOfWork_Project[]
}

export default function DeliverablesSection({
  deliverables,
  contributors,
  projects,
}: DeliverablesSectionProps) {
  const deliverablesRows = splitInRows(deliverables, 2)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between self-stretch">
        <div className={cn('flex-start flex gap-3.5', 'text-lg font-bold lg:text-xl lg:font-bold')}>
          <h3>Deliverables</h3>
          <div>{deliverables.length}</div>
        </div>
      </div>

      <div
        className={cn(
          'flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-6 xl:gap-8',
          'md:[&>*]:w-full md:[&>*]:max-w-[calc(50%-12px)]',
          'xl:gap-7 xl:[&>*]:max-w-[calc(50%-16px)]',
        )}
      >
        {deliverables.length === 0 && (
          <div className="text-muted-foreground flex w-full max-w-full justify-center py-16 text-center text-2xl leading-normal font-semibold tracking-[0.025em] md:text-3xl">
            No Deliverable Available
          </div>
        )}

        {deliverablesRows.map((row) =>
          row.map((deliverable) => (
            <DeliverableCard
              key={deliverable.id}
              deliverable={deliverable}
              contributors={contributors}
              projects={projects}
              viewMode="detailed"
              maxKeyResultsOnRow={row
                .map((d) => d.keyResults.length)
                .reduce((a, b) => Math.max(a, b), 0)}
              isProjectCard={false}
            />
          )),
        )}
      </div>
    </div>
  )
}
