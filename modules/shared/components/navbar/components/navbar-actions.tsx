'use client'

import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import { isAchraMarketingHomePath } from '@/modules/shared/lib/achra-marketing-home-path'
import ff from '@/modules/shared/lib/feature-flags'
import * as NavbarPrimitives from '../primitives'
import { ThemeToggle, ThemeToggleOption } from './theme-toggle'
import { UserButton, UserOption } from './user-button'

function NavbarActionsContent({ showThemeToggle }: { showThemeToggle: boolean }) {
  const showMobileMenu = ff.AUTH_ENABLED || showThemeToggle
  const showDesktopActions = ff.AUTH_ENABLED || showThemeToggle

  return (
    <NavbarPrimitives.ActionsArea>
      {showMobileMenu ? (
        <NavbarPrimitives.ActionWithOptions className="flex md:hidden">
          {ff.AUTH_ENABLED && (
            <>
              <UserOption />
              {showThemeToggle ? <NavbarPrimitives.ActionOptionSeparator /> : null}
            </>
          )}
          {showThemeToggle ? <ThemeToggleOption /> : null}
        </NavbarPrimitives.ActionWithOptions>
      ) : null}

      {showDesktopActions ? (
        <NavbarPrimitives.ActionsGroup className="hidden md:flex">
          {showThemeToggle ? <ThemeToggle /> : null}
          {ff.AUTH_ENABLED && (
            <>
              {showThemeToggle ? <NavbarPrimitives.ActionSeparator /> : null}
              <UserButton />
            </>
          )}
        </NavbarPrimitives.ActionsGroup>
      ) : null}
    </NavbarPrimitives.ActionsArea>
  )
}

function NavbarActionsWithPathname() {
  const pathname = usePathname()
  const showThemeToggle = !isAchraMarketingHomePath(pathname)
  return <NavbarActionsContent showThemeToggle={showThemeToggle} />
}

/**
 * Shared navbar actions (theme toggle and user button).
 * Pathname is wrapped in Suspense for Cache Components / static prerender compatibility.
 */
function NavbarActions() {
  return (
    <Suspense fallback={<NavbarActionsContent showThemeToggle />}>
      <NavbarActionsWithPathname />
    </Suspense>
  )
}

NavbarActions.displayName = 'NavbarActions'

export { NavbarActions }
