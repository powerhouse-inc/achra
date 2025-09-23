import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/shared/lib/utils'
import type { Route } from 'next'

interface ExternalLinkButtonProps extends React.PropsWithChildren {
  href: Route<string>
  className?: string
  wrapText?: boolean
}
export function ExternalLinkButton({
  href,
  children,
  className,
  wrapText = true,
}: ExternalLinkButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      className={cn(
        'border-input hover:text-foreground/50 flex h-9 items-center gap-2 rounded-md border-1 px-4 py-2 text-sm font-medium xl:text-base',
        wrapText ? 'w-fit' : 'max-w-full whitespace-nowrap',
        className,
      )}
    >
      {wrapText ? (
        children
      ) : (
        <span className="max-w-fit flex-1 overflow-hidden text-ellipsis">{children}</span>
      )}

      <div className="flex h-6 w-6 items-center justify-center self-center">
        <ExternalLink className="h-4 w-4" />
      </div>
    </Link>
  )
}
