import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { useEffect } from 'react'
import AchraLayout from '@/app/(achra)/layout'
import RootLayout from '@/app/layout'
import NetworkLayout from '@/app/network/[slug]/layout'
import { QueryClientProvider } from '@/shared/providers/query-client'
import type { StoryContext } from '@storybook/nextjs'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const openSansCondensed = localFont({
  src: [
    {
      path: '../public/fonts/OpenSansCondensed/OpenSansCondensed-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSansCondensed/OpenSansCondensed-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSansCondensed/OpenSansCondensed-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
  ],
  variable: '--font-open-sans-condensed',
})

/**
 * Storybook decorator to apply the root layout to the page stories
 */
export const withNextjsExtras = (Story: React.ComponentType, context: StoryContext) => {
  if (context.parameters.includeLayout) {
    const pathname = context.parameters.nextjs?.navigation?.pathname
    const isNetworkRoute = pathname?.startsWith('/network/')
    const NestedLayout = isNetworkRoute ? NetworkLayout : AchraLayout

    return (
      <RootLayout>
        <NestedLayout>
          <Story />
        </NestedLayout>
      </RootLayout>
    )
  }

  return (
    <div
      className={`${inter.className} ${openSansCondensed.variable} antialiased`}
      style={
        {
          '--font-open-sans-condensed': 'Open Sans Condensed, sans-serif',
        } as React.CSSProperties
      }
    >
      <Story />
    </div>
  )
}

function PortalFontProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const body = document.body
    body.classList.add(inter.variable, openSansCondensed.variable, inter.className)

    return () => {
      body.classList.remove(inter.variable, openSansCondensed.variable, inter.className)
    }
  }, [])

  return <>{children}</>
}

/**
 * Storybook decorator for components that render portals, tooltips, menus, and overlays
 * that need font styles applied to the document body
 */
export const withPortalFontStyles = (Story: React.ComponentType) => {
  return (
    <PortalFontProvider>
      <Story />
    </PortalFontProvider>
  )
}

/**
 * Storybook decorator to apply the Nuqs adapter to the page stories
 */
export const withNuqsAdapter = (Story: React.ComponentType) => (
  <NuqsAdapter>
    <Story />
  </NuqsAdapter>
)

/**
 * Storybook decorator to apply the React Query provider to the page stories
 */
export const withReactQueryProvider = (Story: React.ComponentType) => (
  <QueryClientProvider>
    <Story />
  </QueryClientProvider>
)
