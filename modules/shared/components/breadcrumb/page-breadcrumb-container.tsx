import { cn } from '@/modules/shared/lib/utils'

function PageBreadcrumbContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background fixed top-18 z-50 w-full px-4 pt-4 pb-2 sm:px-0 sm:py-0 md:top-22">
      <div
        className={cn(
          'bg-secondary rounded-xl p-2', // mobile classes
          'sm:bg-background border-accent sm:rounded-none sm:border-b sm:px-0 sm:py-3',
        )}
      >
        <div className="sm:container">{children}</div>
      </div>
    </div>
  )
}

export { PageBreadcrumbContainer }
