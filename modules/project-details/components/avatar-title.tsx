import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar'
import { cn } from '@/modules/shared/lib/utils'

interface AvatarTitleProps {
  avatar: string
  title: string
  className?: string
}

export function AvatarTitle({ avatar, title, className }: AvatarTitleProps) {
  return (
    <div className={cn('gap:1 flex items-center lg:gap-2')}>
      <Avatar className={cn('size-6', className)}>
        <AvatarImage src={avatar} alt={title} />
        <AvatarFallback>{title.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-row gap-1">
        <p className="text-base font-semibold">{title}</p>
      </div>
    </div>
  )
}
