import { ArrowRight } from 'lucide-react'
import { Suspense } from 'react'
import type { Builder } from '@/modules/__generated__/graphql/switchboard-generated'
import BuilderProfile from '@/modules/shared/components/builder-profile/builder-profile'
import BuilderSkills from '@/modules/shared/components/builder-skills'
import BuildersScopesChip from '@/modules/shared/components/chips/builders-scopes-chip/builders-scopes-chip'
import { Button } from '@/modules/shared/components/ui/button'
import { Separator } from '@/modules/shared/components/ui/separator'
import { cn } from '@/modules/shared/lib/utils'
import { ProfileUpdatedDate, ProfileUpdatedDateSkeleton } from '../../../profile-updated-date'
import { useCompactItem } from './use-compact-item'

export interface CompactItemProps {
  builder: Builder
  className?: string
}

export default function CompactItem({ builder, className }: CompactItemProps) {
  const { scopeSizeVariant } = useCompactItem({ builder })
  return (
    <div
      className={cn(
        'bg-popover relative flex w-full flex-col gap-2 overflow-x-hidden rounded-xl p-2 pb-0 shadow-xs',
        className,
      )}
    >
      <div className="flex justify-between">
        <BuilderProfile
          name={builder.name}
          code={builder.code}
          status={builder.status}
          image={builder.icon}
        />
        <Button variant="outline" size="icon" aria-label="View builder team details">
          <ArrowRight className="size-4" />
        </Button>
      </div>
      <Separator className="sm:hidden" />
      <div className="flex flex-wrap justify-between gap-1 sm:mt-2">
        <div className="flex gap-1">
          {builder.scopes.map((scope) => (
            <BuildersScopesChip key={scope} scope={scope} size={scopeSizeVariant} />
          ))}
        </div>
        <BuilderSkills skills={builder.skils} isMobile />
      </div>
      <div className="bg-background border-border -ml-2 flex h-7.5 w-[calc(100%+16px)] items-center justify-between border-t px-4">
        <span className="text-foreground text-xs/4.5 font-medium">Profile Updated</span>
        <Suspense fallback={<ProfileUpdatedDateSkeleton />}>
          <ProfileUpdatedDate
            className="text-foreground/50 text-sm/5.5 font-semibold"
            lastModified={builder.lastModified}
          />
        </Suspense>
      </div>
    </div>
  )
}
