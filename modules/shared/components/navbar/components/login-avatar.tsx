import { UserIcon } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Button } from '../../ui/button'
import { type User } from '../types'

interface LoginAvatarProps {
  isLoggedIn: boolean
  user?: User
}

function LoginAvatar({ isLoggedIn, user }: LoginAvatarProps) {
  return (
    <div className="flexitems-center md:flex">
      <div className="bg-border mx-4 hidden h-9 w-px" />
      {isLoggedIn ? (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.avatar} alt="avatar" />
            <AvatarFallback>{user?.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="flex text-sm font-medium md:hidden">{user?.username}</span>
        </div>
      ) : (
        <>
          <Button
            variant="outline"
            onClick={() => {}}
            className="hidden items-center gap-2 md:flex"
          >
            Log in
          </Button>
          <div className="flex items-center gap-2 md:hidden">
            <UserIcon className="h-4 w-4" />
            <span className="flex text-sm font-medium md:hidden">Log in</span>
          </div>
        </>
      )}
    </div>
  )
}

export default LoginAvatar
