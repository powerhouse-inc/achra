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
        'border-input text-charcoal-400 hover:border-charcoal-200 hover:text-charcoal-500 flex items-center gap-2 rounded-md border-2 py-1 pr-4 pl-6 text-sm leading-6 font-semibold xl:text-base',
        wrapText ? 'w-fit' : 'max-w-full whitespace-nowrap',
        className,
      )}
    >
      {wrapText ? (
        children
      ) : (
        <span className="max-w-fit flex-1 overflow-hidden text-ellipsis">{children}</span>
      )}

      <div className="text-charcoal-400 flex h-6 w-6 items-center justify-center self-center">
        <ExternalLink className="h-4 w-4" />
      </div>
    </Link>
  )
}
