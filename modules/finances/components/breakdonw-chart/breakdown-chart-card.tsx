import { Card } from '@/shared/components/ui/card'
import TitleFilterSection from './title-filter-section'

export default function BreakdownChartCard() {
  return (
    <Card className="bg-popover flex w-full flex-col gap-4 border-none p-2 pb-4 shadow-xs md:p-4 lg:p-6">
      <TitleFilterSection />
      <div className="flex flex-col gap-4 sm:gap-6 md:flex-row 2xl:gap-8">
        <div className="flex-1">Chart Container</div>
        <div className="d:w-65.75 flex lg:w-90.5 xl:w-88.75 2xl:w-98">Chart Legend</div>
      </div>
    </Card>
  )
}
