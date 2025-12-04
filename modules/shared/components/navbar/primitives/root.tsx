import { Suspense } from 'react'
import { cn } from '@/modules/shared/lib/utils'
import { NAVBAR_BLUR_BACKGROUND_ROUTES } from '../../../config/navbar-config'
import { RootPositioning } from './root-positioning'

export interface RootProps {
  children: React.ReactNode
}

/**
 * Root navbar container
 */
function Root({ children }: RootProps) {
  return (
    <Suspense fallback={<RootContent>{children}</RootContent>}>
      <RootPositioning routesWithBlurBackground={NAVBAR_BLUR_BACKGROUND_ROUTES}>
        <RootContent>{children}</RootContent>
      </RootPositioning>
    </Suspense>
  )
}

function RootContent({ children }: RootProps) {
  return (
    <div
      className={cn(
        'bg-muted/30 fixed top-0 right-0 left-0 z-150 rounded-3xl p-0 shadow-lg sm:top-1.5',
        'sm:mx-4 sm:p-2.5 sm:shadow-none',
        'xl:mx-auto xl:max-w-[calc(var(--spacing)*300+20px)] xl:px-2.5',
        '2xl:max-w-[calc(var(--spacing)*328+20px)]',
      )}
    >
      <header className="bg-popover flex h-full flex-1 items-center justify-between rounded-none pr-4 sm:rounded-2xl">
        <div className="flex w-full items-center justify-between gap-2">{children}</div>
      </header>
    </div>
  )
}

Root.displayName = 'NavbarRoot'

export { Root }
