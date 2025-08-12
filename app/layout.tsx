import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/modules/shared/providers/theme-provider'
import { Footer } from '@/shared/components/footer/footer'
import { Navbar } from '@/shared/components/navbar/navbar'
import type { Metadata } from 'next'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
