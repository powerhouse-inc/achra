'use client'
import { useScrollToSection } from '../../hooks/use-scroll-to-section'
import { ThemeToggle } from '../theme-toggle'

export function Footer() {
  useScrollToSection()
  return (
    <footer className="bg-background/95 supports-[backdrop-filter]:bg-background/60 w-full border-t backdrop-blur">
      <div className="container flex h-16 items-center justify-center">
        <div>Achra - Coming soon</div>
        <ThemeToggle />
      </div>
    </footer>
  )
}
