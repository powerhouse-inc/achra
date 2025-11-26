import { ArrowRight } from 'lucide-react'
import { Suspense } from 'react'
import BuilderDomain from '@/modules/shared/components/builder-domain/builder-domain'
import BuilderProfile from '@/modules/shared/components/builder-profile/builder-profile'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import type { Team } from '@/modules/shared/types/team'
import { ProfileUpdatedDate, ProfileUpdatedDateSkeleton } from '../../../profile-updated-date'
import RoleBadge from '../role-badge/role-badge'

export interface LargeItemProps {
  team: Team
  className?: string
}

export default function LargeItem({ team, className }: LargeItemProps) {
  return (
    <div
      className={cn(
        'bg-popover hover:bg-accent grid w-full grid-cols-[25%_17%_17%_14%_auto] items-center justify-between rounded-xl px-2 py-3 shadow-xs hover:shadow-sm',
        className,
      )}
    >
      <BuilderProfile
        name={team.name}
        shortCode={team.shortCode}
        status={team.status}
        image={team.image}
      />
      <BuilderDomain team={team} />
      <RoleBadge type={team.type} />
      <div className="flex flex-col">
        <span className="text-foreground text-sm/5.5 font-semibold">Profile Updated</span>
        <Suspense fallback={<ProfileUpdatedDateSkeleton />}>
          <ProfileUpdatedDate
            className="text-foreground/50 text-sm/5.5 font-semibold"
            team={team}
          />
        </Suspense>
      </div>
      <Button variant="outline" size="icon" aria-label="View builder team details">
        <ArrowRight className="size-4" />
      </Button>
    </div>
  )
}
