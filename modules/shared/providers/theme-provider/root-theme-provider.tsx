'use client'

import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import { isAchraMarketingHomePath } from '@/modules/shared/lib/achra-marketing-home-path'
import { ThemeProvider } from './theme-provider'

interface RootThemeProviderProps {
  children: React.ReactNode
}

const rootThemeProviderProps = {
  attribute: 'class' as const,
  defaultTheme: 'light',
  disableTransitionOnChange: true,
}

function PathnameAwareTheme({ children }: RootThemeProviderProps) {
  const pathname = usePathname()
  const forcedTheme = isAchraMarketingHomePath(pathname) ? 'light' : undefined

  return (
    <ThemeProvider {...rootThemeProviderProps} forcedTheme={forcedTheme}>
      {children}
    </ThemeProvider>
  )
}

function RootThemeProvider({ children }: RootThemeProviderProps) {
  return (
    <Suspense fallback={<ThemeProvider {...rootThemeProviderProps}>{children}</ThemeProvider>}>
      <PathnameAwareTheme>{children}</PathnameAwareTheme>
    </Suspense>
  )
}

export { RootThemeProvider }
