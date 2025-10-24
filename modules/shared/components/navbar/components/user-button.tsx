'use client'

import { UserIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Button } from '../../ui/button'
import * as NavbarPrimitives from '../primitives'
import { useAuth } from '../primitives/use-auth'

/**
 * Renders authenticated user avatar or login button for desktop
 */
function UserButton() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <AuthenticatedUserAvatar className="hidden md:flex" />
  }

  return (
    <Button variant="outline" className="hidden cursor-pointer items-center gap-2 md:flex">
      Log in
    </Button>
  )
}
UserButton.displayName = 'NavbarUserButton'

/**
 * Renders user option in dropdown menu for mobile
 */
function UserOption() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return (
      <NavbarPrimitives.ActionOption>
        <AuthenticatedUserAvatar />
      </NavbarPrimitives.ActionOption>
    )
  }

  return (
    <NavbarPrimitives.ActionOption>
      <UserIcon className="mr-2 size-4" />
      <span>Login</span>
    </NavbarPrimitives.ActionOption>
  )
}

/**
 * Shared authenticated user avatar component
 * Consolidates duplicate rendering logic (DRY principle)
 */
function AuthenticatedUserAvatar({ className }: { className?: string }) {
  return (
    <div className={className ?? 'flex items-center gap-2'}>
      <Avatar>
        <AvatarImage src="/images/avatar.png" alt="avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <span className="flex text-sm font-medium md:hidden">Jhon Doe</span>
    </div>
  )
}

export { UserButton, UserOption }
