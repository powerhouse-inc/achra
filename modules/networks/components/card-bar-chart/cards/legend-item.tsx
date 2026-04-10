import { CircleIcon } from 'lucide-react'
import React from 'react'

interface LegendButtonProps {
  color?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

function ItemLegend({ color = 'fill-gray-400', children, style }: LegendButtonProps) {
  return (
    <div className="text-foreground flex cursor-default items-center gap-2 bg-transparent p-0 text-xs/4.5 font-semibold shadow-none sm:text-sm/5.5 xl:text-base/6">
      <span>
        <CircleIcon className={`h-2 w-2 xl:h-3 xl:w-3 ${color}`} style={style} />
      </span>
      {children}
    </div>
  )
}

export { ItemLegend }
