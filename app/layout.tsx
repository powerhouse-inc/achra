import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Suspense } from 'react'
import ff from '@/modules/shared/lib/feature-flags'
import { ThemeProvider } from '@/modules/shared/providers/theme-provider'
import { WhitelistOverlay } from '@/modules/whitelist/components/whitelist-overlay'
import { Footer } from '@/shared/components/footer/footer'
import { QueryClientProvider } from '@/shared/providers/query-client'
import type { Metadata } from 'next'

import './globals.css'

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

export const metadata: Metadata = {
  title: 'Achra',
  description: 'Achra',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${openSansCondensed.variable} flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <QueryClientProvider>
            <NuqsAdapter>
              <main className="flex-1">{children}</main>

              {ff.WHITELIST_OVERLAY_ENABLED && (
                <Suspense>
                  <WhitelistOverlay />
                </Suspense>
              )}

              <Footer />
            </NuqsAdapter>
          </QueryClientProvider>
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
