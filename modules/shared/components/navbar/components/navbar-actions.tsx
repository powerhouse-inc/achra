'use client'

import { usePathname } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { isAchraMarketingHomePath } from '@/modules/shared/lib/achra-marketing-home-path'
import ff from '@/modules/shared/lib/feature-flags'
import * as NavbarPrimitives from '../primitives'
import { ThemeToggle, ThemeToggleOption } from './theme-toggle'
import { UserButton, UserOption } from './user-button'

function MobileNavbarActions({ showThemeToggle }: { showThemeToggle: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <NavbarPrimitives.ActionWithOptions
      className="flex md:hidden"
      open={mobileMenuOpen}
      onOpenChange={setMobileMenuOpen}
    >
      {ff.AUTH_ENABLED && (
        <>
          <UserOption />
          {showThemeToggle ? <NavbarPrimitives.ActionOptionSeparator /> : null}
        </>
      )}
      {showThemeToggle ? <ThemeToggleOption /> : null}
    </NavbarPrimitives.ActionWithOptions>
  )
}

function DesktopNavbarActions({ showThemeToggle }: { showThemeToggle: boolean }) {
  const [desktopUserMenuOpen, setDesktopUserMenuOpen] = useState(false)

  return (
    <NavbarPrimitives.ActionsGroup className="hidden md:flex">
      {showThemeToggle ? <ThemeToggle /> : null}
      {ff.AUTH_ENABLED && (
        <>
          {showThemeToggle ? <NavbarPrimitives.ActionSeparator /> : null}
          <UserButton open={desktopUserMenuOpen} onOpenChange={setDesktopUserMenuOpen} />
        </>
      )}
    </NavbarPrimitives.ActionsGroup>
  )
}

function NavbarActionsContent({ showThemeToggle }: { showThemeToggle: boolean }) {
  const showMobileMenu = ff.AUTH_ENABLED || showThemeToggle
  const showDesktopActions = ff.AUTH_ENABLED || showThemeToggle
  const isDesktop = useMediaQuery({ from: 'md' })

  return (
    <NavbarPrimitives.ActionsArea>
      {showMobileMenu ? (
        <MobileNavbarActions
          key={isDesktop ? 'mobile-hidden' : 'mobile-visible'}
          showThemeToggle={showThemeToggle}
        />
      ) : null}

      {showDesktopActions ? (
        <DesktopNavbarActions
          key={isDesktop ? 'desktop-visible' : 'desktop-hidden'}
          showThemeToggle={showThemeToggle}
        />
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
