import { Skeleton } from '@/shared/components/ui/skeleton'
import { cn } from '@/shared/lib/utils'
import { MilestoneCardSkeleton } from '../../milestone-card'

const containerBaseClasses = 'flex items-stretch gap-10 xl:gap-18.25 2xl:gap-25.75'
const spacingUpClasses = 'pr-32.5 xl:pr-45 2xl:pr-48.75'
const spacingDownClasses = 'pl-32.5 xl:pl-45 2xl:pl-48.75'
const milestoneBaseClasses = 'relative w-full max-w-72.75 xl:max-w-76'
const lineBaseClasses =
  'desktop-timeline-line bg-accent-foreground/30 absolute left-1/2 z-0 ml-4 h-px w-0'
const dotBaseClasses = 'absolute left-1/2 z-10 h-4 w-4 -translate-x-1/2'

function DesktopTimelineSkeleton() {
  return (
    <div className="mx-auto hidden w-full max-w-[1083px] flex-col lg:flex xl:max-w-full">
      {/* Upper row - 3 milestones */}
      <div className={cn(containerBaseClasses, spacingUpClasses)}>
        {Array.from({ length: 3 }).map((_, index) => (
          // it is okay to use index as key here because the skeleton is static
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={cn(milestoneBaseClasses, 'pb-6')}>
            <div className={cn(lineBaseClasses, '-bottom-px')} />
            <div className={cn(dotBaseClasses, '-bottom-2')}>
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <MilestoneCardSkeleton />
          </div>
        ))}
      </div>

      {/* Lower row - 3 milestones */}
      <div className={cn(containerBaseClasses, spacingDownClasses)}>
        {Array.from({ length: 3 }).map((_, index) => (
          // it is okay to use index as key here because the skeleton is static
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={cn(milestoneBaseClasses, 'pt-6')}>
            <div className={cn(lineBaseClasses, 'top-0')} />
            <div className={cn(dotBaseClasses, '-top-2')}>
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <MilestoneCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  )
}

export { DesktopTimelineSkeleton }
