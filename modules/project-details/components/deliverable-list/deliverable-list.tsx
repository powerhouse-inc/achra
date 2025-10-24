import { ScopeOfWork_DeliverableStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { DeliverableStatusChip } from '@/modules/shared/components/chips/deliverable-status-chip'
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar'
import { Separator } from '@/modules/shared/components/ui/separator'
import { cn } from '@/modules/shared/lib/utils'
import { AvatarTitle } from '../avatar-title'
import { DeliverableListPopover } from '../deliverable-list-popover/deliverable-list-popover'
import { DescriptionItem } from '../description-item/description-item'
import { ProgressComponent } from '../progress-component/progress-component'
import type { Deliverable } from '../../types'

export interface DeliverableListProps {
  deliverables: Deliverable[]
  tooltip: string | null
  hoveredRowIndex: number | null
  className?: string
}

export function DeliverableList({ deliverables, className }: DeliverableListProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {deliverables.map((deliverable) => (
        <div
          key={deliverable.id}
          className="flex cursor-pointer flex-col gap-2 rounded-xl p-2 shadow-xs sm:gap-0"
          onClick={() => {
            // TODO: Remove this once decide widht the client how to navigate to the deliverable details page
          }}
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="sm: flex min-w-0 flex-row items-center gap-1 sm:w-47">
                <div className="flex items-center gap-1">
                  <Avatar className={cn('size-8', className)}>
                    <AvatarImage src={deliverable.image} alt={deliverable.title} />
                    <AvatarTitle avatar={deliverable.image} title={deliverable.title} />
                    <AvatarFallback>
                      {deliverable.title.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col items-start">
                  <span className="truncate text-sm/5.5 font-semibold">{deliverable.title}</span>
                  <div className="flex sm:hidden">
                    <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.Draft} />
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden flex-col justify-between sm:flex sm:gap-1">
              <div className="flex flex-row items-center justify-between">
                <div className="text-xs/4.5 font-medium">Status</div>
                <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.Draft} />
              </div>
              <div className="flex min-w-54">
                <ProgressComponent progress={deliverable.progress} className="flex sm:flex" />
              </div>
            </div>
            <DeliverableListPopover
              title={deliverable.title}
              code="DEL 001"
              keyResults={deliverable.keyResults}
              className="flex justify-end sm:min-w-34"
            />
          </div>

          <ProgressComponent progress={deliverable.progress} className="flex sm:hidden" />
          <Separator className="text-border my-2 hidden w-full sm:flex" />
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-between">
            <DescriptionItem label="QTY" value={`${deliverable.qyt} USD`} />
            <DescriptionItem label="Unit Budget" value={`${deliverable.unitBudget} USD`} />
            <DescriptionItem label="Subtotal" value={`${deliverable.subtotal} USD`} />
          </div>
        </div>
      ))}
    </div>
  )
}
