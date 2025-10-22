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
    <div className={cn('flex items-center gap-2', className)}>
      <Avatar className="size-6">
        <AvatarImage src={avatar} alt={title} />
        <AvatarFallback>{title.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-row gap-1">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
    </div>
  )
}
