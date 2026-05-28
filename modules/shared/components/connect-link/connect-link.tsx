'use client'

import { LucideExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '../../lib/utils'

type ConnectLinkProps = Omit<React.ComponentProps<typeof Link>, 'children'> & {
  action?: 'open' | 'edit'
  driveName: string
  disabled?: boolean
}

function ConnectLink({
  href,
  action = 'open',
  driveName,
  disabled,
  className,
  ...props
}: ConnectLinkProps) {
  const onClickOverride = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault()
    }

    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <Link
      href={disabled ? 'void:0' : href}
      target="_blank"
      aria-disabled={disabled ? true : undefined}
      data-action={action}
      onClick={onClickOverride}
      className={cn(
        'text-primary-foreground',
        disabled && 'cursor-not-allowed opacity-100',
        className,
      )}
      {...props}
    >
      <div className="outline-border bg-primary flex items-center gap-2 rounded-xl py-[6px] pr-4 pl-2 outline-2">
        <Image src="/networks/logos/connect-light.png" alt="Connect logo" width={40} height={40} />
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-1">
            <span className="text-[11px]/[18px] uppercase">
              {action === 'edit' ? 'Edit' : 'Open'} in Connect
            </span>
            <LucideExternalLink className="size-3" />
          </div>
          <div className="text-4 truncate font-semibold">{driveName}</div>
        </div>
      </div>
    </Link>
  )
}

export { ConnectLink }
