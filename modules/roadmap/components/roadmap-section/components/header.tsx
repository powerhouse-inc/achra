import { ScopeOfWork_DeliverableStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { DeliverableStatusChip } from '@/modules/shared/components/chips/deliverable-status-chip'
import { NavigationHeader } from '@/modules/shared/components/navigation-header'
import type { Route } from 'next'

interface RoadmapSectionHeaderProps {
  title: string
  description: string
  id: string
}
export function Header({ title, description, id }: RoadmapSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-foreground text-lg/5.5 font-bold">{title}</span>
            <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.InProgress} />
          </div>
          <NavigationHeader title={title} href={`/network/powerhouse/roadmap/${id}` as Route} />
        </div>
        {/* Placeholder for Details button */}
        <span className="hidden">Details</span>
      </div>
      <p className="text-foreground/50 text-sm/5.5 font-medium">{description}</p>
    </div>
  )
}
