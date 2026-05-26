'use client'

import { usePathname } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import {
  ACHRA_MARKETING_HOME_PATHS,
  isAchraMarketingHomePath,
} from '@/modules/shared/lib/achra-marketing-home-path'
import { ThemeProvider } from './theme-provider'

interface RootThemeProviderProps {
  children: React.ReactNode
}

const rootThemeProviderProps = {
  attribute: 'class' as const,
  defaultTheme: 'light',
  disableTransitionOnChange: true,
}

type ForcedTheme = 'light' | undefined

// Read the pathname synchronously on the client so `forcedTheme` is already correct
// on the first render. This matters because next-themes' own mount effect runs
// `applyTheme(forcedTheme ?? savedTheme)` after first paint — if `forcedTheme` were
// still undefined there, it would repaint the saved (e.g. dark) theme for a frame on
// a marketing route before being corrected, which is the flash we're killing.
// On the server `window` is undefined, so it stays undefined (no dynamic API → static).
function getInitialForcedTheme(): ForcedTheme {
  if (typeof window === 'undefined') return undefined
  return isAchraMarketingHomePath(window.location.pathname) ? 'light' : undefined
}

// Runs before paint, right after next-themes' own inline script. The prerendered
// next-themes script can't know the pathname under Cache Components, so on a marketing
// route it would paint the saved (e.g. dark) theme for a frame. This forces light first.
const marketingThemeFlashScript = `(function(){try{var p=${JSON.stringify(
  ACHRA_MARKETING_HOME_PATHS,
)};if(p.indexOf(location.pathname)!==-1){var d=document.documentElement;d.classList.remove('dark');d.classList.add('light');d.style.colorScheme='light';}}catch(e){}})();`

function MarketingThemeFlashScript() {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: marketingThemeFlashScript }}
    />
  )
}

// `usePathname` is dynamic under Cache Components, so it must read inside a Suspense
// boundary. It keeps `forcedTheme` in sync across client-side navigation (the initial
// value is seeded synchronously above). We lift the value to the stable provider rather
// than wrapping `children` in the boundary — wrapping children would remount the whole
// app on resolve, recreating next-themes' inline <script> on the client and re-triggering
// render-time side effects in the Renown SDK.
function ForcedThemeSync({ onChange }: { onChange: (theme: ForcedTheme) => void }) {
  const pathname = usePathname()
  const forcedTheme: ForcedTheme = isAchraMarketingHomePath(pathname) ? 'light' : undefined

  useEffect(() => {
    onChange(forcedTheme)
  }, [forcedTheme, onChange])

  return null
}

function RootThemeProvider({ children }: RootThemeProviderProps) {
  const [forcedTheme, setForcedTheme] = useState<ForcedTheme>(getInitialForcedTheme)

  return (
    <ThemeProvider {...rootThemeProviderProps} forcedTheme={forcedTheme}>
      <MarketingThemeFlashScript />
      <Suspense fallback={null}>
        <ForcedThemeSync onChange={setForcedTheme} />
      </Suspense>
      {children}
    </ThemeProvider>
  )
}

export { RootThemeProvider }
