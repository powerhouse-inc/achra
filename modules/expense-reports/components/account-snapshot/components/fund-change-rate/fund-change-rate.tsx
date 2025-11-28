import { DynamicCountUpPresets } from '@/modules/shared/components/count-up'
import { Card } from '@/modules/shared/components/ui/card'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { NumberWithSignCard } from './number-with-sign-card'
import type { ReactNode } from 'react'

export type NumberColor = 'normal' | 'green'

interface FundChangeRateProps {
  netChange?: number
  leftValue?: number
  leftValueColor?: NumberColor
  leftText: string | ReactNode
  rightValue?: number
  rightValueColor?: NumberColor
  rightText: string | ReactNode
  dynamicChanges?: boolean
}

function FundChangeRate({
  netChange,
  leftValue,
  leftValueColor = 'normal',
  leftText,
  rightValue,
  rightValueColor = 'normal',
  rightText,
  dynamicChanges = false,
}: FundChangeRateProps) {
  return (
    <Card className="bg-popover w-full gap-0 border-none p-2 md:px-4 md:pt-2 md:pb-4 lg:px-4 lg:py-4 xl:px-8 xl:py-4">
      {/* Change Container with Arrows */}
      <div className="flex w-full">
        {/* Left Arrow Container */}
        <div className="flex w-full md:mr-2">
          <div className="min-w-[85px] md:min-w-[85px] lg:min-w-[118px] 2xl:min-w-[155px]" />
          <div className="border-border relative mt-6 h-[calc(100%-24px)] w-full rounded-tl-[20px] border-t-2 border-l-2">
            <div
              className="border-border absolute bottom-px left-[-7.4px] size-3.25 rotate-225 rounded-tl border-t-2 border-l-2"
              aria-hidden="true"
            />
            <div
              className="bg-border absolute top-[-8px] right-0 h-3.5 w-0.5 rounded-sm"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Center Net Change Content */}
        <div className="flex flex-col items-center px-2 pb-2 md:px-0 md:pb-2">
          <div className="text-foreground/30 flex items-baseline gap-1 text-base/6 font-semibold md:font-medium">
            {netChange !== undefined ? (
              <>
                {netChange > 0 && '+'}
                {dynamicChanges ? (
                  <DynamicCountUpPresets value={Math.round(netChange)} />
                ) : (
                  usLocalizedNumber(Math.round(netChange))
                )}
                <div className="text-foreground/30 text-sm/5.5 font-semibold lg:text-base/6">
                  USD
                </div>
              </>
            ) : (
              'N/A'
            )}
          </div>
          <div className="text-foreground/30 text-xs/4.5 whitespace-nowrap md:font-medium lg:text-sm/5.5">
            Net Change
          </div>
        </div>

        {/* Right Arrow Container */}
        <div className="flex w-full md:ml-2">
          <div className="border-border relative mt-6 h-[calc(100%-24px)] w-full rounded-tr-[20px] border-t-2 border-r-2">
            <div
              className="border-border absolute right-[-7.4px] bottom-px size-3.25 rotate-225 rounded-tl border-t-2 border-l-2"
              aria-hidden="true"
            />
            <div
              className="bg-border absolute top-[-8px] left-0 h-3.5 w-0.5 rounded-sm"
              aria-hidden="true"
            />
          </div>
          <div className="min-w-[65px] md:min-w-[65px] lg:min-w-[85px] 2xl:min-w-[120px]" />
        </div>
      </div>

      {/* Values Container */}
      <div className="mt-2 flex w-full flex-row gap-2 md:gap-8 lg:gap-6 xl:gap-8">
        <NumberWithSignCard
          dynamicChanges={dynamicChanges}
          value={leftValue}
          valueColor={leftValueColor}
          sign="positive"
          text={leftText}
        />
        <NumberWithSignCard
          dynamicChanges={dynamicChanges}
          value={rightValue}
          valueColor={rightValueColor}
          sign="negative"
          text={rightText}
        />
      </div>
    </Card>
  )
}

export { FundChangeRate }
