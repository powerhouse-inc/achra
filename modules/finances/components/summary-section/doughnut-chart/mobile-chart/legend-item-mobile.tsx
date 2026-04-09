import {
  threeDigitsPrecisionHumanization,
  usLocalizedNumber,
} from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import { getPercentDisplay } from '../utils'

interface LegendItemProps {
  inline: boolean
  name: string
  code?: string
  color: string
  value: number
  percentage: number
}

function LegendItemMobile({
  inline = false,
  name,
  code,
  color,
  value,
  percentage,
}: LegendItemProps) {
  const valueFormatted = threeDigitsPrecisionHumanization(value)
  const formattedPercentage = `${getPercentDisplay(percentage)}%`

  return (
    <div
      data-slot="legend-item"
      className={cn(
        'relative flex pl-3.5',
        inline ? 'flex-row gap-1 leading-3.75' : 'flex-col gap-1 leading-4.5',
      )}
    >
      {/* Dot indicator */}
      <span
        data-slot="legend-dot"
        className={cn('absolute left-0 h-2 w-2 rounded-full', inline ? 'top-1' : 'top-2')}
        style={{ backgroundColor: color }}
      />

      <div data-slot="legend-name" className="text-foreground text-xs font-semibold">
        {inline ? (code ?? name) : name}
      </div>

      <div
        data-slot="legend-line"
        className="flex items-center gap-1 text-xs leading-normal font-medium"
      >
        {inline ? (
          <>
            <span data-slot="legend-value" className="text-muted-foreground font-semibold">
              {usLocalizedNumber(value, 2)}
            </span>
            <span data-slot="legend-percentage" className="text-muted-foreground">
              ({formattedPercentage})
            </span>
          </>
        ) : (
          <>
            <span data-slot="legend-percentage" className="text-muted-foreground">
              ({formattedPercentage})
            </span>
            <span data-slot="legend-value" className="text-muted-foreground font-semibold">
              {valueFormatted.value} {valueFormatted.suffix}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export { LegendItemMobile }
