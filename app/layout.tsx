import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ThemeProvider } from '@/modules/shared/providers/theme-provider'
import { Footer } from '@/shared/components/footer/footer'
import Navbar from '@/shared/components/navbar/navbar'
import { QueryClientProvider } from '@/shared/providers/query-client'
import type { Metadata } from 'next'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})
const openSansCondensed = localFont({
  src: [
    {
      path: './fonts/OpenSansCondensed/OpenSansCondensed-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/OpenSansCondensed/OpenSansCondensed-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/OpenSansCondensed/OpenSansCondensed-LightItalic.ttf',
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
      <body className={`${inter.className} ${openSansCondensed.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <QueryClientProvider>
            <NuqsAdapter>
              <Navbar />
              <div className="pt-18 md:pt-21">{children}</div>
            </NuqsAdapter>
          </QueryClientProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
