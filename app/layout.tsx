import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Suspense } from 'react'
import { Toaster } from '@/modules/shared/components/ui/sonner'
import ff from '@/modules/shared/lib/feature-flags'
import { RootThemeProvider } from '@/modules/shared/providers/theme-provider'
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

const title = 'Achra | The Marketplace for Global Coordination'
const description =
  'An operational marketplace where organizations, builders, and service providers collaborate to deliver customized solutions.'
const ogImage = '/og-image.png'

export const metadata: Metadata = {
  title: {
    default: title,
    template: '%s | Achra',
  },
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://achra.com'),
  openGraph: {
    title,
    description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    type: 'website',
    siteName: 'Achra',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} ${openSansCondensed.variable} flex min-h-dvh flex-col antialiased`}
      >
        <RootThemeProvider>
          <QueryClientProvider>
            <NuqsAdapter>
              <main className="flex-1">{children}</main>

              {ff.WHITELIST_OVERLAY_ENABLED && (
                <Suspense>
                  <WhitelistOverlay />
                </Suspense>
              )}

              <Footer />
              <Toaster />
            </NuqsAdapter>
          </QueryClientProvider>
        </RootThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
