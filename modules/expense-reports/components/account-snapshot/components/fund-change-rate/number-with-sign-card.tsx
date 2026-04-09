import { DynamicCountUpPresets } from '@/modules/shared/components/count-up'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import type { NumberColor } from './fund-change-rate'
import type { ReactNode } from 'react'

interface NumberWithSignCardProps {
  value?: number
  valueColor?: NumberColor
  sign: 'positive' | 'negative'
  text: string | ReactNode
  dynamicChanges?: boolean
}

function NumberWithSignCard({
  value,
  valueColor = 'normal',
  sign,
  text,
  dynamicChanges = false,
}: NumberWithSignCardProps) {
  return (
    <div className="flex w-full">
      {/* Sign Container */}
      <div className="mr-1 flex items-center md:mr-4 lg:mr-2">
        {sign === 'positive' ? (
          <svg
            className="size-4 lg:size-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="10" width="4" height="24" rx="2" className="fill-border" />
            <rect
              y="14"
              width="4"
              height="24"
              rx="2"
              transform="rotate(-90 0 14)"
              className="fill-border"
            />
          </svg>
        ) : (
          <svg
            className="h-1 w-4 lg:h-1 lg:w-6"
            viewBox="0 0 24 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="4"
              width="4"
              height="24"
              rx="2"
              transform="rotate(-90 0 4)"
              className="fill-border"
            />
          </svg>
        )}
      </div>

      {/* Card */}
      <div
        className={cn(
          'flex w-full flex-col items-start rounded-xl border px-1.75 pt-0.75 pb-1.75',
          'border-border bg-background',
          'lg:min-w-44 xl:px-3.75 xl:py-0.75 xl:pb-1.75',
        )}
      >
        {/* Text */}
        <div className="text-foreground text-xs/4.5 font-medium lg:mb-2">{text}</div>

        {/* Value */}
        <div
          className={cn(
            'flex items-baseline text-center text-base/6 font-semibold xl:text-lg/6',
            valueColor === 'green' ? 'text-green-500' : 'text-foreground',
          )}
        >
          {value !== undefined ? (
            <>
              {dynamicChanges ? (
                <DynamicCountUpPresets value={Math.round(value)} />
              ) : (
                usLocalizedNumber(Math.round(value))
              )}
              <div className="text-foreground/30 ml-1 text-sm/5.5 font-semibold lg:text-base/6">
                USD
              </div>
            </>
          ) : (
            'N/A'
          )}
        </div>
      </div>
    </div>
  )
}

export { NumberWithSignCard }
