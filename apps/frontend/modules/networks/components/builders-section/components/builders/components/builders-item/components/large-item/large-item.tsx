import { ArrowRight } from 'lucide-react'
import { Suspense } from 'react'
import type { Builder } from '@/modules/__generated__/graphql/switchboard-generated'
import { BuilderProfile } from '@/modules/shared/components/builder-profile'
import { BuilderSkills } from '@/modules/shared/components/builder-skills'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import { ProfileUpdatedDate, ProfileUpdatedDateSkeleton } from '../../../profile-updated-date'

export interface LargeItemProps {
  builder: Builder
  className?: string
}

function LargeItem({ builder, className }: LargeItemProps) {
  return (
    <div
      className={cn(
        'bg-popover hover:bg-accent grid w-full grid-cols-[32%_22%_19%_auto] items-center justify-between rounded-xl px-2 py-3 shadow-xs hover:shadow-sm',
        className,
      )}
    >
      <BuilderProfile
        name={builder.name}
        code={builder.code}
        status={builder.status}
        image={builder.icon}
      />
      <BuilderSkills skills={builder.skills} />
      <div className="flex flex-col">
        <span className="text-foreground text-sm/5.5 font-semibold">Profile Updated</span>
        <Suspense fallback={<ProfileUpdatedDateSkeleton />}>
          <ProfileUpdatedDate
            className="text-foreground/50 text-sm/5.5 font-semibold"
            lastModified={builder.lastModified}
          />
        </Suspense>
      </div>
      <Button variant="outline" size="icon" aria-label="View builder team details">
        <ArrowRight className="size-4" />
      </Button>
    </div>
  )
}

export { LargeItem }
