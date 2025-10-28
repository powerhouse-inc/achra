'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useScrollToSection } from '../../hooks/use-scroll-to-section'

export function Footer() {
  useScrollToSection()

  return (
    <footer className="bg-background/95 supports-backdrop-filter:bg-background/60 w-full border-t backdrop-blur">
      <div className="container flex h-16 items-center justify-center">
        <div className="flex items-center gap-1.5">
          Made with ❤️ by{' '}
          <Link href="https://www.powerhouse.inc/" target="_blank">
            <Image
              src="/networks/logos/powerhouse.png"
              alt="Powerhouse"
              height={16}
              width={111}
              className="dark:invert"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}
