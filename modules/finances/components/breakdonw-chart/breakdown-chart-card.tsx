import { encodeSectionId } from '@/modules/shared/components/section-activation'
import { SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'
import { Card } from '@/shared/components/ui/card'
import { FinancesSections } from '../config/const'
import TitleFilterSection from './title-filter-section'

export default function BreakdownChartCard() {
  return (
    <Card className="bg-popover flex w-full flex-col gap-4 border-none p-2 pb-4 shadow-xs md:p-4 lg:p-6">
      <section
        className={cn('flex w-full flex-col gap-6', SCROLL_MT_CLASSES)}
        id={encodeSectionId(FinancesSections.BreakdownChart)}
      >
        <TitleFilterSection />
        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row 2xl:gap-8">
          <div className="flex-1">Chart Container</div>
          <div className="d:w-65.75 flex lg:w-90.5 xl:w-88.75 2xl:w-98">Chart Legend</div>
        </div>
      </section>
    </Card>
  )
}
