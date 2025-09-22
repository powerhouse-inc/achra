import { InfoIcon } from 'lucide-react'
import React from 'react'

interface SpendingItemProps extends React.PropsWithChildren {
  title: string
  mobileTitle?: string
}

export function SpendingItem({ title, mobileTitle, children }: SpendingItemProps) {
  return (
    <div className="relative flex flex-col items-center rounded-xl border border-gray-200 p-2 pt-3 pr-2 pb-2 pl-[23px] md:h-[129px] md:flex-1 md:items-start md:justify-center md:bg-none md:py-6 md:pr-4 md:pl-8 xl:h-[120px] xl:p-6">
      <div className="absolute -top-2.5 left-8 flex items-center gap-2 bg-white px-2 md:-top-2 md:rounded-lg md:md:bg-gray-50">
        <span className="text-xs leading-6 font-medium text-gray-500 md:left-8 md:py-0 md:text-sm md:leading-5 md:font-semibold md:text-gray-600 xl:left-4 xl:text-base xl:leading-6">
          {mobileTitle && <span className="block md:hidden">{mobileTitle}</span>}
          <span className={mobileTitle ? 'hidden md:block' : ''}>{title}</span>
        </span>
        <InfoIcon className="h-4 w-4" />
      </div>
      <div className="flex gap-6 md:flex-col md:gap-4 xl:gap-6">{children}</div>
    </div>
  )
}
