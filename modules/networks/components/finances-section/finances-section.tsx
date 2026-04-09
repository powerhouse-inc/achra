import React from 'react'
import { CardBarChart } from '@/modules/networks/components/card-bar-chart/card-bar-chart'
import { CardStackedAreaChart } from '@/modules/networks/components/card-stacked-area-chart/card-stacked-area-chart'
import { UsdsIcon } from '@/modules/shared/components/svgs'
import { NetworkHomepageSections, SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'
import { encodeSectionId } from '../../../shared/components/section-activation/section-id-utils'
import SectionTitle from '../../../shared/components/section-title/section-title'

export function FinancesSection() {
  return (
    <div
      // Note: The -mt-2 is to compensate for the swiper pagination dots height
      className={cn('-mt-2 flex flex-col gap-2 sm:gap-6', SCROLL_MT_CLASSES)}
      id={encodeSectionId(NetworkHomepageSections.Finances)}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <SectionTitle title="Finances" hash="finances" />
        <div className="flex items-center gap-2 text-xs/5 font-semibold xl:text-sm">
          <UsdsIcon className="size-5 md:size-6" />
          *All values are converted to USDS
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 xl:flex-row xl:gap-8">
        <CardBarChart />
        <div className="flex w-full">
          <CardStackedAreaChart />
        </div>
      </div>
    </div>
  )
}
