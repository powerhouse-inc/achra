import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const textCellVariants = cva('flex items-center text-base/6 p-4', {
  variants: {
    variant: {
      text: 'font-normal text-foreground',
      comment: 'py-1 text-foreground/50 font-semibold',
      header: 'text-foreground font-semibold',
      sectionHeader: 'font-semibold text-foreground/50',
    },
  },
  defaultVariants: {
    variant: 'text',
  },
})

export interface TableCellProps extends React.ComponentProps<'div'> {
  variant?: VariantProps<typeof textCellVariants>['variant']
}

export function TextCell({
  className,
  children,
  variant,

  ...props
}: TableCellProps) {
  return (
    <div
      className={cn(
        textCellVariants({ variant }),

        // 'flex items-center text-base/6',
        // isHeader ? 'p-4' : 'px-4 py-1',

        // (bold || isSection) && !isHeader ? 'font-semibold' : 'font-normal',

        // // Base font weight
        // 'font-semibold',
        // // Line height - mobile
        // isHeader ? (bold ? 'leading-[19px]' : 'leading-[18px]') : 'leading-[15px]',
        // // Padding - mobile
        // isHeader ? 'p-4' : 'px-0 py-0',
        // // Text align - mobile
        // isHeader ? 'text-left' : 'text-right',
        // // Font size - mobile
        // isHeader ? 'text-base' : 'text-sm',
        // // Padding left - mobile
        // 'pl-6',
        // // Colors - light mode
        // isSection ? 'text-[#9da0a1] dark:text-[#5b646d]' : 'text-gray-900 dark:text-gray-50',
        // // Responsive styles - tablet and up (md:)
        // 'md:pl-4 md:text-left md:text-base md:leading-[19px]',
        // isHeader ? 'md:p-4' : 'md:px-0 md:py-2',
        // isHeader ? (bold ? 'md:font-semibold' : 'md:font-normal') : 'md:font-normal',
        // // Bold children
        // '[&>b]:font-bold',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
