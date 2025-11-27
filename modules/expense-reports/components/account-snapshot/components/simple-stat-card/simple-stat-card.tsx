import { format, parseISO } from 'date-fns'
import { DynamicCountUpPresets } from '@/modules/shared/components/count-up'
import { Card } from '@/modules/shared/components/ui/card'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import EqualSign from '../svgs/equal.svg'

interface SimpleStatCardProps {
  date?: string
  value?: number
  caption: string
  mobileCaption?: string
  hasEqualSign?: boolean
  dynamicChanges?: boolean
}

function SimpleStatCard({
  date,
  value,
  caption,
  mobileCaption,
  hasEqualSign = false,
  dynamicChanges = false,
}: SimpleStatCardProps) {
  return (
    <Card className="bg-popover w-full gap-2 border-none p-2 md:p-4 lg:p-4 xl:px-8 xl:py-4">
      <div className="text-foreground/30 text-xs leading-4.5 uppercase md:font-medium">
        {date ? format(parseISO(date), 'd MMM y') : 'N/A'}
      </div>

      <div className="flex items-center md:mt-auto md:gap-4 lg:gap-0">
        {hasEqualSign && (
          <div className="-mt-0.75 mr-1 md:mt-0 md:mr-auto lg:mt-1.75 lg:mr-4">
            <EqualSign className="text-border h-2.5 w-4 md:h-2.5 md:w-4 lg:h-3.75 lg:w-6" />
          </div>
        )}
        <div className="border-border bg-background flex w-full flex-col rounded-xl border px-1.75 py-0.75 pb-1.75 lg:gap-2 xl:px-3.75">
          <div className="text-foreground text-xs/4.5 font-medium">
            {mobileCaption && <span className="inline-block md:hidden">{mobileCaption}</span>}
            <span
              className={cn({
                'hidden md:inline-block': mobileCaption,
                'inline-block md:hidden': !mobileCaption,
              })}
            >
              {caption}
            </span>
          </div>
          <div className="text-foreground flex items-baseline text-base/6 font-semibold lg:text-xl lg:font-bold xl:text-2xl xl:leading-[120%]">
            {value !== undefined ? (
              <>
                {dynamicChanges ? (
                  <DynamicCountUpPresets value={Math.round(value)} />
                ) : (
                  usLocalizedNumber(Math.round(value))
                )}
                <span className="text-foreground/30 ml-1 text-sm/5.5 font-semibold lg:text-base/6">
                  USD
                </span>
              </>
            ) : (
              'N/A'
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export { SimpleStatCard }
