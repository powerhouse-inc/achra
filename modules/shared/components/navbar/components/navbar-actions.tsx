'use client'

import { usePathname } from 'next/navigation'
import ff from '@/modules/shared/lib/feature-flags'
import { isAchraMarketingHomePath } from '@/modules/shared/lib/achra-marketing-home-path'
import * as NavbarPrimitives from '../primitives'
import { ThemeToggle, ThemeToggleOption } from './theme-toggle'
import { UserButton, UserOption } from './user-button'

/**
 * Shared navbar actions (theme toggle and user button)
 */
function NavbarActions() {
  const pathname = usePathname()
  const showThemeToggle = !isAchraMarketingHomePath(pathname)
  const showMobileMenu = ff.NAV_BAR_LOGIN_BUTTON_ENABLED || showThemeToggle
  const showDesktopActions = ff.NAV_BAR_LOGIN_BUTTON_ENABLED || showThemeToggle

  return (
    <NavbarPrimitives.ActionsArea>
      {showMobileMenu ? (
        <NavbarPrimitives.ActionWithOptions className="flex md:hidden">
          {ff.NAV_BAR_LOGIN_BUTTON_ENABLED && (
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
          {ff.NAV_BAR_LOGIN_BUTTON_ENABLED && (
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

NavbarActions.displayName = 'NavbarActions'

export { NavbarActions }
