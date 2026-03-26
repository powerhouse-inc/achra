import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar'
import { cn } from '@/modules/shared/lib/utils'
import { TwoUserIcon } from './two-user-icon'

export interface CircleAvatarWithIconProps extends React.ComponentProps<typeof Avatar> {
  icon: boolean
  image?: string | null
  fallbackText: string
  isCoreUnit?: boolean
}

export function AvatarWithIcon({
  image,
  fallbackText,
  className,
  icon,
  isCoreUnit = false,
  ...avatarProps
}: CircleAvatarWithIconProps) {
  return (
    <div data-slot="circle-avatar-with-icon-container" className={cn('relative flex', className)}>
      <Avatar
        data-slot="circle-avatar-with-icon-avatar"
        className={cn('h-8.5 w-8.5 shrink-0')}
        {...avatarProps}
      >
        {image ? <AvatarImage src={image} alt="" /> : null}
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>

      {icon && (
        <div
          data-slot="circle-avatar-with-icon-icon"
          className={cn(
            'absolute top-2.5 left-2 z-20 flex h-11 w-11',
            isCoreUnit ? 'text-status-progress' : 'text-status-success',
          )}
        >
          <TwoUserIcon className="size-full" />
        </div>
      )}
    </div>
  )
}
