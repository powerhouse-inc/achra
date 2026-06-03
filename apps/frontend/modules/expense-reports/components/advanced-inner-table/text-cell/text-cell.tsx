import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const textCellVariants = cva('flex items-center md:text-sm/4.5 lg:text-base/6 md:p-4', {
  variants: {
    variant: {
      text: 'md:px-2 lg:px-4 font-normal text-foreground',
      comment:
        'text-xs/4.5 md:text-xs/4.5 lg:text-base/6 md:py-1 md:px-2 lg:px-4 text-foreground/70 font-semibold',
      header: 'px-6 md:px-2 lg:px-4 py-2 text-foreground font-semibold',
      sectionHeader: 'md:px-2 lg:px-4 font-semibold text-foreground/70',
    },
  },
  defaultVariants: {
    variant: 'text',
  },
})

export interface TableCellProps extends React.ComponentProps<'div'> {
  variant?: VariantProps<typeof textCellVariants>['variant']
}

function TextCell({
  className,
  children,
  variant,

  ...props
}: TableCellProps) {
  return (
    <div className={cn(textCellVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}

export { TextCell }
