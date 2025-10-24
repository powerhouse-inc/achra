import { NAVBAR_BLUR_BACKGROUND_ROUTES } from '../../../config/navbar-config'
import { RootPositioning } from './root-positioning'
import { RootProvider } from './root-provider'

/**
 * Props for Root component
 */
export interface RootProps {
  children: React.ReactNode
}

/**
 * Root container for the navbar
 * Provides context and positioning for all navbar elements
 */
function Root({ children }: RootProps) {
  return (
    <RootProvider>
      <RootPositioning routesWithBlurBackground={NAVBAR_BLUR_BACKGROUND_ROUTES}>
        <div className="bg-muted/30 fixed top-0 right-0 left-0 z-150 rounded-3xl p-0 shadow-lg md:mx-6 md:p-2.5 md:shadow-none xl:container xl:px-2.5 2xl:mx-14 2xl:max-w-[calc(100%-108px)]">
          <header className="bg-popover flex h-full flex-1 items-center justify-between rounded-none pr-4 md:rounded-2xl">
            <div className="flex w-full items-center justify-between">{children}</div>
          </header>
        </div>
      </RootPositioning>
    </RootProvider>
  )
}

Root.displayName = 'NavbarRoot'

export { Root }
