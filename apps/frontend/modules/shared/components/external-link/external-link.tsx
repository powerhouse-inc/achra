import { Button } from '@achra/ui/button'
import { cn } from '@achra/ui/lib/utils'
import { ExternalLink as ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'

import type { Route } from 'next'

interface ExternalLinkProps extends React.PropsWithChildren {
  href: Route<string>
  className?: string
  wrapText?: boolean
}

function ExternalLink({ href, children, className, wrapText = true }: ExternalLinkProps) {
  return (
    <Button
      variant="outline"
      asChild
      className={cn(
        wrapText ? 'w-fit' : 'max-w-full whitespace-nowrap',
        'shadow-none xl:text-base',
        className,
      )}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {wrapText ? (
          children
        ) : (
          <span className="max-w-fit flex-1 overflow-hidden text-ellipsis">{children}</span>
        )}
        <ExternalLinkIcon className="h-4 w-4" />
      </Link>
    </Button>
  )
}

export { ExternalLink }
