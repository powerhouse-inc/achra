import Link from 'next/link'
import type { Route } from 'next'
import type { ReactNode } from 'react'

interface OrgAnchorProps {
  href: Route
  children: ReactNode
}

function OrgAnchor({ href, children }: OrgAnchorProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      prefetch={false}
      className="text-primary hover:text-primary/80 underline underline-offset-2"
    >
      {children}
    </Link>
  )
}

export { OrgAnchor }
