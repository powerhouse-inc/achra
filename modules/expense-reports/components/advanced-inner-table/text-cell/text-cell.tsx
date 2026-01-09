import { cn } from '@/shared/lib/utils'
import type { CSSProperties, JSX } from 'react'

export interface TableCellProps {
  children?: string | JSX.Element | JSX.Element[]
  style?: CSSProperties
  bold?: boolean
  isHeader?: boolean
  className?: string
  isSection?: boolean
}

export function TextCell({
  bold,
  className,
  isHeader,
  isSection,
  style,
  children,
}: TableCellProps) {
  return (
    <div
      className={cn(
        'flex items-center',
        // Base font weight
        'font-semibold',
        // Line height - mobile
        isHeader ? (bold ? 'leading-[19px]' : 'leading-[18px]') : 'leading-[15px]',
        // Padding - mobile
        isHeader ? 'p-4' : 'px-0 py-0',
        // Text align - mobile
        isHeader ? 'text-left' : 'text-right',
        // Font size - mobile
        isHeader ? 'text-base' : 'text-sm',
        // Padding left - mobile
        'pl-6',
        // Colors - light mode
        isSection ? 'text-[#9da0a1] dark:text-[#5b646d]' : 'text-gray-900 dark:text-gray-50',
        // Responsive styles - tablet and up (md:)
        'md:pl-4 md:text-left md:text-base md:leading-[19px]',
        isHeader ? 'md:p-4' : 'md:px-0 md:py-2',
        isHeader ? (bold ? 'md:font-semibold' : 'md:font-normal') : 'md:font-normal',
        // Bold children
        '[&>b]:font-bold',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}
