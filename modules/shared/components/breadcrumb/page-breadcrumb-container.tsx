import { cn } from '@/modules/shared/lib/utils'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

type PageBreadcrumbContainerProps<E extends ElementType = 'div'> = {
  as?: E
  children?: React.ReactNode
} & Omit<ComponentPropsWithoutRef<E>, 'as' | 'children'>

function PageBreadcrumbContainer<E extends ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: PageBreadcrumbContainerProps<E>) {
  const Component = as ?? 'div'

  return (
    <Component
      data-slot="page-breadcrumb-container"
      className={cn(
        'bg-background fixed top-18 z-50 w-full px-4 pt-4 pb-2 sm:top-22 sm:px-0 sm:py-0',
        className,
      )}
      {...props}
    >
      <div
        data-slot="page-breadcrumb-container-wrapper"
        className={cn(
          'bg-secondary rounded-xl p-2', // mobile classes
          'sm:bg-background border-accent sm:rounded-none sm:border-b sm:px-0 sm:py-3',
        )}
      >
        <div data-slot="page-breadcrumb-container-content" className="sm:container">
          {children}
        </div>
      </div>
    </Component>
  )
}

export { PageBreadcrumbContainer }
export type { PageBreadcrumbContainerProps }
