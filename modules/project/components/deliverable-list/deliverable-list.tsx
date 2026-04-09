import type { ScopeOfWork_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'
import { getProgressPercentage } from '@/modules/roadmap/lib/type-helpers'
import { DeliverableStatusChip } from '@/modules/shared/components/chips/deliverable-status-chip'
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar'
import { Separator } from '@/modules/shared/components/ui/separator'
import { cn } from '@/modules/shared/lib/utils'
import { DeliverableListPopover } from '../deliverable-list-popover/deliverable-list-popover'
import { DescriptionItem } from '../description-item/description-item'
import { ProgressComponent } from '../progress-component/progress-component'
import { calculateDeliverableSubtotal } from '../utils'

export interface DeliverableListProps {
  deliverables: ScopeOfWork_Deliverable[]
  className?: string
}

export function DeliverableList({ deliverables, className }: DeliverableListProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {deliverables.map((deliverable) => (
        <div
          key={deliverable.id}
          className="bg-popover flex cursor-default flex-col gap-2 rounded-xl p-2 shadow-xs sm:gap-0"
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="min-w-0 flex-row items-center gap-1 sm:flex sm:w-47">
                <div className="flex items-center gap-1">
                  <Avatar className={cn('size-8', className)}>
                    <AvatarImage
                      src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/DEWIZ/DEWIZ_logo.png"
                      alt={deliverable.title}
                    />

                    <AvatarFallback>
                      {deliverable.title.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="max-w-56 truncate text-sm font-semibold sm:max-w-36 md:max-w-50">
                      {deliverable.title}
                    </span>
                    <div className="flex sm:hidden">
                      <DeliverableStatusChip status={deliverable.status} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden flex-col justify-between sm:flex sm:gap-1">
              <div className="flex flex-row items-center justify-between">
                <div className="text-foreground/30 text-xs/4.5 font-medium">Status</div>
                <DeliverableStatusChip status={deliverable.status} />
              </div>
              <div className="flex min-w-54">
                <ProgressComponent
                  progress={getProgressPercentage(deliverable.workProgress ?? undefined)}
                  className="flex sm:flex"
                  aria-label={`Work progress for ${deliverable.title}: ${getProgressPercentage(deliverable.workProgress ?? undefined)}%`}
                />
              </div>
            </div>
            <DeliverableListPopover
              title={deliverable.title}
              code={deliverable.code}
              keyResults={deliverable.keyResults}
              count={deliverable.keyResults.length}
              className="flex justify-end sm:min-w-34"
            />
          </div>

          <ProgressComponent
            progress={getProgressPercentage(deliverable.workProgress ?? undefined)}
            className="flex sm:hidden"
            aria-label={`Work progress for ${deliverable.title}: ${getProgressPercentage(deliverable.workProgress ?? undefined)}%`}
          />
          <Separator className="text-border my-2 hidden w-full sm:flex" />
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-between">
            <DescriptionItem
              label="QTY"
              value={deliverable.budgetAnchor?.quantity.toString() ?? '0'}
            />
            <DescriptionItem label="Unit Budget" value={deliverable.budgetAnchor?.unit} />
            <DescriptionItem
              label="Subtotal"
              value={calculateDeliverableSubtotal(deliverable).toLocaleString()}
              className="sm:justify-end"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
