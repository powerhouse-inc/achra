import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import {
  type Network,
  ScopeOfWork_DeliverableStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { DeliverableStatusChip } from '@/modules/shared/components/chips/deliverable-status-chip'
import { NavigationHeader } from '@/modules/shared/components/navigation-header'
import { Button } from '@/modules/shared/components/ui/button'

interface RoadmapSectionHeaderProps {
  network?: Pick<Network, 'name' | 'logo' | 'darkThemeLogo'>
  workstreamSlug: string
  title: string
  description: string
  roadmapSlug: string
  networkSlug: string
  workstreamTitle: string
}
function Header({
  network,
  workstreamSlug,
  title,
  description,
  roadmapSlug,
  networkSlug,
  workstreamTitle,
}: RoadmapSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-foreground text-lg/5.5 font-bold">{title}</span>
            {/* TODO: integrate with the roadmaps general status, currently not available in the workstream query */}
            <DeliverableStatusChip status={ScopeOfWork_DeliverableStatus.InProgress} />
          </div>
          <NavigationHeader
            network={network}
            title={workstreamTitle}
            workstreamSlug={workstreamSlug}
          />
        </div>
        <Button variant="outline" asChild className="w-fit">
          <Link href={`/network/${networkSlug}/roadmap/${roadmapSlug}`}>
            Roadmap Details
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      {description && <p className="text-foreground/50 text-sm/5.5 font-medium">{description}</p>}
    </div>
  )
}

export { Header }
