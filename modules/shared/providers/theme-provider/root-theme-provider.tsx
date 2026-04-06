'use client'

import { usePathname } from 'next/navigation'
import { isAchraMarketingHomePath } from '@/modules/shared/lib/achra-marketing-home-path'
import { ThemeProvider } from './theme-provider'

interface RootThemeProviderProps {
  children: React.ReactNode
}

function RootThemeProvider({ children }: RootThemeProviderProps) {
  const pathname = usePathname()
  const forcedTheme = isAchraMarketingHomePath(pathname) ? 'light' : undefined

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
      forcedTheme={forcedTheme}
    >
      {children}
    </ThemeProvider>
  )
}

export { RootThemeProvider }
