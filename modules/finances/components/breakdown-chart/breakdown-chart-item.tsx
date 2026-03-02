import { replaceAllNumberLetOneBeforeDot } from '@/modules/finances/lib/breakdown-chart-utils'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { formatBudgetName, removeBudgetWord } from '../../utils'
import type { BreakdownChartSeriesData } from '../../types'

interface BreakdownChartItemProps {
  element: BreakdownChartSeriesData
  onLegendItemHover: (legendName: string) => void
  onLegendItemLeave: (legendName: string) => void
  handleToggleSeries: (series: string) => void
  className?: string
  showLegendValue?: boolean
  value?: number
}

export function BreakdownChartItem({
  element,
  onLegendItemHover,
  onLegendItemLeave,
  handleToggleSeries,
  className,
  showLegendValue = true,
  value,
}: Readonly<BreakdownChartItemProps>) {
  return (
    <Button
      variant="ghost"
      data-slot="legend-item-container"
      className={cn(
        'flex h-fit w-fit cursor-pointer flex-row items-center justify-start gap-2 p-0',
        className,
      )}
      onMouseEnter={() => {
        onLegendItemHover(element.name)
      }}
      onMouseLeave={() => {
        onLegendItemLeave(element.name)
      }}
      onClick={() => {
        handleToggleSeries(element.name)
      }}
    >
      <div data-slot="svg-container" className="flex items-center">
        <svg
          data-slot="legend-indicator"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 13 13"
          fill="none"
          className="h-3 w-3 md:h-4 md:w-4"
        >
          <circle cx="6.5" cy="6.5" r="5.5" stroke={element.itemStyle.colorOriginal} />
          <circle cx="6.5" cy="6.5" r="4" fill={element.itemStyle.colorOriginal} />
        </svg>
      </div>
      <div
        data-slot="legend-name"
        className={cn(
          'text-foreground text-center text-xs leading-[18px] font-semibold',
          'md:w-fit md:max-w-[212px] md:overflow-hidden md:text-start md:text-sm md:leading-[22px] md:text-ellipsis md:whitespace-nowrap',
          'xl:max-w-[250px] xl:text-base xl:leading-[24px]',
        )}
      >
        {removeBudgetWord(formatBudgetName(element.name))}
      </div>
      {showLegendValue && (
        <div
          data-slot="legend-value"
          className={cn(
            'text-muted-foreground text-xs leading-[18px] font-semibold',
            'md:text-sm md:leading-[22px]',
            'xl:text-base xl:leading-[24px]',
          )}
        >
          {replaceAllNumberLetOneBeforeDot(value ?? 0, true)}
        </div>
      )}
    </Button>
  )
}
