import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button, type buttonVariants } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import type { VariantProps } from 'class-variance-authority'
import type { Route } from 'next'

interface InternalLinkProps {
  href: Route
  children?: React.ReactNode
  className?: string
  variant?: VariantProps<typeof buttonVariants>['variant']
}

export function InternalLink({
  href,
  children,
  className,
  variant = 'secondary',
}: InternalLinkProps) {
  return (
    <Button variant={variant} asChild className={cn('group/link', className)}>
      <Link href={href}>
        {children}{' '}
        <ArrowRight className="size-4 transition-transform duration-200 ease-in-out group-hover/link:translate-x-1.5" />
      </Link>
    </Button>
  )
}
