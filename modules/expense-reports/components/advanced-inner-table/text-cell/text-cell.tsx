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
    <div className={cn(textCellVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}
