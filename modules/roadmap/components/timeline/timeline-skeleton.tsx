import { MilestoneCardSkeleton } from '../milestone-card'
import { DesktopTimelineSkeleton } from './desktop-timeline'

function TimelineSkeleton() {
  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row lg:hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          // it is okay to use index as key here because the skeleton is static
          // eslint-disable-next-line react/no-array-index-key
          <MilestoneCardSkeleton key={index} />
        ))}
      </div>

      <DesktopTimelineSkeleton />
    </div>
  )
}

export { TimelineSkeleton }
