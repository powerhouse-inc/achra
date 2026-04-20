'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { ChevronDown, LogIn, LogOut, User } from 'lucide-react'
import {
  CopyAnimatedIcon,
  CopyButton,
  CopyTrigger,
} from '@/modules/shared/components/copy-button/copy-button'
import { Identicon } from '@/modules/shared/components/identicon/identicon'
import { Button } from '@/modules/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/modules/shared/components/ui/dropdown-menu'
import * as NavbarPrimitives from '../primitives'

function AddressLabel({ address, displayAddress }: { address: string; displayAddress: string }) {
  return (
    <DropdownMenuLabel
      className="flex items-center justify-between gap-2 font-normal"
      onSelect={(e) => {
        e.preventDefault()
      }}
    >
      <span>{displayAddress}</span>
      <CopyButton value={address}>
        <CopyTrigger className="text-muted-foreground hover:text-accent-foreground">
          <CopyAnimatedIcon />
        </CopyTrigger>
      </CopyButton>
    </DropdownMenuLabel>
  )
}

/**
 * User avatar or login button for desktop
 */
function UserButton() {
  const auth = useRenownAuth()

  if (auth.status !== 'authorized' || !auth.address) {
    return (
      <Button variant="outline" onClick={auth.login}>
        Log in
      </Button>
    )
  }

  const address = auth.address
  const displayAddress = auth.displayAddress ?? address
  const displayLabel = auth.displayName ?? displayAddress

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="items-center gap-2 px-2">
          <Identicon value={address} className="size-5" />
          <span>{displayLabel}</span>
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-170 w-56">
        <AddressLabel address={address} displayAddress={displayAddress} />
        <DropdownMenuSeparator />
        {auth.profileId ? (
          <DropdownMenuItem className="cursor-pointer" onClick={auth.openProfile}>
            <User />
            <span>View Profile</span>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={() => void auth.logout()}
        >
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
UserButton.displayName = 'NavbarUserButton'

/**
 * User option(s) in mobile dropdown menu — returns menu items directly
 */
function UserOption() {
  const auth = useRenownAuth()

  if (auth.status !== 'authorized' || !auth.address) {
    return (
      <NavbarPrimitives.ActionOption onClick={auth.login}>
        <LogIn />
        <span>Log in</span>
      </NavbarPrimitives.ActionOption>
    )
  }

  const address = auth.address
  const displayAddress = auth.displayAddress ?? address

  return (
    <>
      <AddressLabel address={address} displayAddress={displayAddress} />
      <NavbarPrimitives.ActionOptionSeparator />
      {auth.profileId ? (
        <NavbarPrimitives.ActionOption onClick={auth.openProfile}>
          <User />
          <span>View Profile</span>
        </NavbarPrimitives.ActionOption>
      ) : null}
      <NavbarPrimitives.ActionOption variant="destructive" onClick={() => void auth.logout()}>
        <LogOut />
        <span>Log out</span>
      </NavbarPrimitives.ActionOption>
    </>
  )
}

export { UserButton, UserOption }
