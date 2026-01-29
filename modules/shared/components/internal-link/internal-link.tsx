import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import type { Route } from 'next'

// Note: The style behaviour when hovering this button is also required in scenarios where there is no navigation, such as in the operator card.
// We should consider renaming it to fit a wider use purpose.Something like ArrowButton.
interface InternalLinkProps extends React.ComponentProps<typeof Button> {
  href?: Route
}

export function InternalLink({
  href,
  children,
  className,
  variant = 'secondary',
  ...buttonProps
}: InternalLinkProps) {
  return (
    <Button variant={variant} asChild className={cn('group/link', className)} {...buttonProps}>
      <Link href={href ?? '#'}>
        {children}{' '}
        <ArrowRight className="size-4 transition-transform duration-200 ease-in-out group-hover/link:translate-x-1.5" />
      </Link>
    </Button>
  )
}
