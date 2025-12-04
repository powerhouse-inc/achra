import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const pageContentVariants = cva('container flex flex-col mb-8', {
  variants: {
    variant: {
      default: 'mt-8 mb-8',
      'with-breadcrumb': 'mt-20 sm:mt-20.5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface PageContentProps extends React.ComponentProps<'main'> {
  as?: React.ElementType
  variant?: VariantProps<typeof pageContentVariants>['variant']
}

function PageContent({
  children,
  as: Element = 'main',
  variant = 'default',
  className,
  ...props
}: PageContentProps) {
  return (
    <Element className={cn(pageContentVariants({ variant }), className)} {...props}>
      {children}
    </Element>
  )
}

export { PageContent }
