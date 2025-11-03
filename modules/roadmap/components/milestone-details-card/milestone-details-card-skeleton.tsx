import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'
import { ContributorsSkeleton } from './contributors-skeleton'
import { CoordinatorsSkeleton } from './coordinators-skeleton'
import { DeliverablesSectionSkeleton } from './deliverables-section-skeleton'
import { MilestoneProgressSkeleton } from './milestone-progress-skeleton'
import { TargetDataSkeleton } from './target-data-skeleton'
import { TitleAndDescriptionSkeleton } from './title-and-description-skeleton'

function MilestoneDetailsCardSkeleton() {
  return (
    <article className="relative scroll-mt-[155px] md:flex md:flex-col md:gap-6 lg:flex-row lg:gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:sticky lg:top-[160px] lg:h-fit">
        <aside
          className={cn(
            // Layout
            'flex flex-col gap-2',
            // Border and background
            'bg-accent/30 rounded-xl border',
            // Padding
            'px-4 pt-8 pb-4',
            // Responsive widths and spacing
            'w-full',
            'md:w-1/2',
            'lg:w-[304px] lg:gap-4 lg:px-4 lg:pt-4 lg:pb-6',
            'xl:w-[379px] xl:px-6',
            '2xl:w-[416px]',
          )}
        >
          <Skeleton className="inline-flex h-9.5 w-16 rounded-md px-2 py-1" />

          <MilestoneProgressSkeleton />
          <TargetDataSkeleton />
          <CoordinatorsSkeleton />
          <ContributorsSkeleton />
        </aside>

        <div className="block md:w-1/2 lg:hidden">
          <TitleAndDescriptionSkeleton />
        </div>
      </div>

      <main
        className={cn(
          'mt-4 flex w-full flex-col',
          // Responsive margin and gap
          'lg:mt-5 lg:max-w-[calc(100%-304px-24px)] lg:gap-6',
          'xl:max-w-[calc(100%-379px-32px)]',
          '2xl:max-w-[calc(100%-416px-32px)]',
        )}
      >
        <div className="hidden lg:block">
          <TitleAndDescriptionSkeleton />
        </div>

        <DeliverablesSectionSkeleton />
      </main>
    </article>
  )
}

export { MilestoneDetailsCardSkeleton }
