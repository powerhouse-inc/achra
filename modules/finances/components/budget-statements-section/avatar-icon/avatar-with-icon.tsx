import * as React from 'react'
import { TwoUserIcon } from '@/modules/shared/components/svgs'
import { Avatar, AvatarImage } from '@/modules/shared/components/ui/avatar'
import { cn } from '@/modules/shared/lib/utils'

export interface CircleAvatarWithIconProps extends React.ComponentProps<typeof Avatar> {
  icon: boolean
  image: string
  isCoreUnit?: boolean
}

export function AvatarWithIcon({
  image,
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
        <AvatarImage src={image} alt="" />
      </Avatar>

      {icon && (
        <div
          data-slot="circle-avatar-with-icon-icon"
          className={cn(
            'absolute top-2.5 left-2 z-10 flex h-11 w-11',
            isCoreUnit ? 'text-status-progress' : 'text-status-success',
          )}
        >
          <TwoUserIcon />
        </div>
      )}
    </div>
  )
}
