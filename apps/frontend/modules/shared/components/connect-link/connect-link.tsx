'use client'

import { cn } from '@achra/ui/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { LucideExternalLink } from 'lucide-react'
import Link from 'next/link'
import { ConnectIsotype } from '../svgs'

const connectLinkVariants = cva('group transition-colors', {
  variants: {
    variant: {
      default: 'text-foreground hover:text-accent-foreground aria-disabled:hover:text-foreground',
      primary: 'text-primary-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const connectLinkInnerVariants = cva(
  'outline-border flex items-center gap-2 rounded-xl py-[6px] pr-4 pl-2 outline-2 transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-card group-hover:bg-accent group-aria-disabled:group-hover:bg-card',
        primary: 'bg-primary group-hover:bg-primary/90 group-aria-disabled:group-hover:bg-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const connectIsotypeVariants = cva('size-10 shrink-0 p-1.5 transition-colors', {
  variants: {
    variant: {
      default:
        'text-foreground group-hover:text-accent-foreground group-aria-disabled:group-hover:text-foreground',
      primary: 'text-primary-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type ConnectLinkProps = Omit<React.ComponentProps<typeof Link>, 'children'> &
  VariantProps<typeof connectLinkVariants> & {
    action?: 'open' | 'edit'
    driveName: string
    disabled?: boolean
  }

function ConnectLink({
  href,
  action = 'open',
  driveName,
  disabled,
  variant,
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
        connectLinkVariants({ variant }),
        disabled && 'cursor-not-allowed opacity-100',
        className,
      )}
      {...props}
    >
      <div className={connectLinkInnerVariants({ variant })}>
        <ConnectIsotype aria-label="Connect logo" className={connectIsotypeVariants({ variant })} />
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
