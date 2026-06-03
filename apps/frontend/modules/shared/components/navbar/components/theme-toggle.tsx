'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'
import { Button } from '@/shared/components/ui/button'
import * as NavbarPrimitives from '../primitives'

/**
 * Theme toggle hook
 */
function useThemeToggle() {
  const { setTheme, theme } = useTheme()

  const handleThemeToggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [setTheme, theme])

  return { handleThemeToggle, theme }
}

/**
 * Theme toggle button for desktop
 */
function ThemeToggle() {
  const { handleThemeToggle } = useThemeToggle()

  return (
    <div>
      <Button variant="outline" size="icon" onClick={handleThemeToggle} aria-label="Toggle theme">
        <ThemeToggleIcons />
      </Button>
    </div>
  )
}
ThemeToggle.displayName = 'NavbarThemeToggle'

/**
 * Theme toggle option for mobile menu
 */
function ThemeToggleOption() {
  const { theme, handleThemeToggle } = useThemeToggle()

  return (
    <NavbarPrimitives.ActionOption onClick={handleThemeToggle}>
      <ThemeLabelIcon theme={theme} />
      <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
    </NavbarPrimitives.ActionOption>
  )
}

/**
 * Animated sun/moon icons
 */
function ThemeToggleIcons() {
  return (
    <>
      <Moon className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Sun className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </>
  )
}

/**
 * Theme icon for dropdown menu label
 */
function ThemeLabelIcon({ theme }: { theme: string | undefined }) {
  return theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />
}

export { ThemeToggle, ThemeToggleOption }
