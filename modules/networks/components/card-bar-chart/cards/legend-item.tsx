import { CircleIcon } from 'lucide-react'
import React from 'react'

interface LegendButtonProps {
  color: string
  children: React.ReactNode
}

export function ItemLegend({ color = 'fill-gray-400', children }: LegendButtonProps) {
  return (
    <div className="flex cursor-default items-center gap-2 bg-transparent p-0 text-sm leading-4 font-semibold shadow-none xl:text-base xl:leading-6">
      <span>
        <CircleIcon className={`h-2 w-2 ${color}`} />
      </span>
      {children}
    </div>
  )
}
