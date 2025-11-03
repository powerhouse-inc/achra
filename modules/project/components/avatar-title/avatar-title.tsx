import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar'
import { cn } from '@/modules/shared/lib/utils'
import type { Route } from 'next'

interface AvatarTitleProps {
  avatar: string
  title: string
  className?: string
  href: Route
}

export function AvatarTitle({ avatar, title, className, href }: AvatarTitleProps) {
  return (
    <Link href={href} className={cn('flex items-center gap-1 lg:gap-2')}>
      <Avatar className={cn('size-6', className)}>
        <AvatarImage src={avatar} alt={title} />
        <AvatarFallback>{title.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-row gap-1">
        <p className="text-base font-semibold">{title}</p>
      </div>
    </Link>
  )
}
