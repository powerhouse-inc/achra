'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Route } from 'next'
import type { ReactNode } from 'react'

interface BuilderProfileWebsiteLinkProps {
  href: string
  icon: ReactNode
}

function BuilderProfileWebsiteLink({ href, icon }: BuilderProfileWebsiteLinkProps) {
  const pathname = usePathname()

  if (pathname.includes('/budget-statements')) {
    return null
  }

  return (
    <div className="flex items-center gap-2 md:pl-12 lg:pl-14">
      {icon}
      <Link
        href={href as Route}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary text-xs/4.5 sm:text-sm/5.5"
      >
        {href}
      </Link>
    </div>
  )
}

export { BuilderProfileWebsiteLink }
