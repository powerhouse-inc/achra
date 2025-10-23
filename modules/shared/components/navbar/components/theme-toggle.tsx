'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'
import { Button } from '@/shared/components/ui/button'
import * as NavbarPrimitives from '../primitives'

/**
 * Shared hook for theme toggle functionality
 * Centralizes theme switching logic (DRY principle)
 */
function useThemeToggle() {
  const { setTheme, theme } = useTheme()

  const handleThemeToggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [setTheme, theme])

  return { handleThemeToggle, theme }
}

/**
 * Theme toggle button for desktop view
 * Displays animated sun/moon icons
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
 * Theme toggle option for mobile dropdown menu
 * Shows theme label with icon
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
 * Animated theme toggle icons (sun/moon) for button
 * Consolidates icon rendering logic (DRY principle)
 */
function ThemeToggleIcons() {
  return (
    <>
      <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </>
  )
}

/**
 * Theme icon for dropdown menu label
 * Shows opposite theme icon (sun in dark mode, moon in light mode)
 */
function ThemeLabelIcon({ theme }: { theme: string | undefined }) {
  return theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />
}

export { ThemeToggle, ThemeToggleOption }
