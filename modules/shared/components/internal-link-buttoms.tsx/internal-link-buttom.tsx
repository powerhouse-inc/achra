import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/shared/lib/utils'
import type { Route } from 'next'

interface InternalLinkButtonProps {
  href: Route
  children?: React.ReactNode
  className?: string
}

export function InternalLinkButton({ href, children, className }: InternalLinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-foreground inline-flex min-h-[32px] w-fit items-center gap-2 rounded-lg border border-transparent bg-slate-50 transition-all duration-200 ease-in-out',
        children ? 'py-1 pr-4 pl-6' : 'px-4 py-1',
        'hover:gap-4 hover:pr-2',
        className,
      )}
    >
      {children && <span className="text-base leading-6 font-semibold">{children}</span>}

      <div className="flex items-center">
        <ArrowRight className="h-5 w-5" />
      </div>
    </Link>
  )
}

export default InternalLinkButton
