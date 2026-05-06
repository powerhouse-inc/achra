import { Slot } from '@radix-ui/react-slot'
import Link from 'next/link'
import React from 'react'
import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarPrimitive,
} from '@/modules/shared/components/ui/avatar'
import { cn } from '@/modules/shared/lib/utils'
import type { Route } from 'next'

export interface AvatarTitleRootProps {
  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior.
   *
   * @default false
   */
  asChild?: boolean
  /**
   * URL to navigate to. When provided, renders as Next.js Link.
   * When omitted and asChild is false, renders as div.
   */
  href?: Route
  className?: string
  children?: React.ReactNode
}

function AvatarTitleRoot({ className, asChild = false, href, ...props }: AvatarTitleRootProps) {
  const baseClassName = cn('flex items-center gap-1 lg:gap-2', className)

  if (asChild) {
    return <Slot data-slot="avatar-title-root" className={baseClassName} {...props} />
  }

  if (href) {
    const { href: _, ...linkProps } = props as React.ComponentProps<typeof Link> & { href?: Route }
    return (
      <Link href={href} data-slot="avatar-title-root" className={baseClassName} {...linkProps} />
    )
  }

  return (
    <div
      data-slot="avatar-title-root"
      className={baseClassName}
      {...(props as React.ComponentProps<'div'>)}
    />
  )
}

export type AvatarTitleAvatarProps = React.ComponentProps<typeof AvatarPrimitive> & {
  src: string
  alt: string
  fallback?: string
}

function AvatarTitleAvatar({ src, alt, fallback, className, ...props }: AvatarTitleAvatarProps) {
  const fallbackText = fallback ?? alt.substring(0, 2).toUpperCase()

  return (
    <AvatarPrimitive className={cn('size-6', className)} {...props}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </AvatarPrimitive>
  )
}

export type AvatarTitleTextProps = React.ComponentProps<'p'>

function AvatarTitleText({ className, ...props }: AvatarTitleTextProps) {
  return (
    <p
      data-slot="avatar-title-text"
      className={cn('text-base font-semibold', className)}
      {...props}
    />
  )
}

export { AvatarTitleRoot, AvatarTitleAvatar, AvatarTitleText }
