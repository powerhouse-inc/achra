'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@achra/ui/avatar'
import { Button } from '@achra/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@achra/ui/dropdown-menu'
import { Skeleton } from '@achra/ui/skeleton'
import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { ChevronDown, LogIn, LogOut, User, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import {
  CopyAnimatedIcon,
  CopyButton,
  CopyTrigger,
} from '@/modules/shared/components/copy-button/copy-button'
import { Identicon } from '@/modules/shared/components/identicon/identicon'
import { useMyBuilderProfile } from '@/modules/shared/hooks/use-my-builder-profile'
import * as NavbarPrimitives from '../primitives'
import { NavbarDrivesSection } from './navbar-drives-section'

interface UserButtonProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

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
 * Desktop Sign up link that includes the current pathname as `returnTo`.
 * Wrapped in Suspense so the parent (UserButton) can be rendered as a
 * Suspense fallback during static prerender without accessing pathname.
 */
function SignUpButton() {
  return (
    <Suspense
      fallback={
        <Button asChild>
          <Link href="/get-started">Sign up</Link>
        </Button>
      }
    >
      <SignUpButtonWithReturnTo />
    </Suspense>
  )
}

function SignUpButtonWithReturnTo() {
  const pathname = usePathname()
  return (
    <Button asChild>
      <Link href={`/get-started?returnTo=${encodeURIComponent(pathname)}`}>Sign up</Link>
    </Button>
  )
}

/**
 * Mobile Sign up option that includes the current pathname as `returnTo`.
 * Wrapped in Suspense for the same reason as SignUpButton.
 */
function SignUpOption() {
  return (
    <Suspense
      fallback={
        <NavbarPrimitives.ActionOption asChild>
          <Link href="/get-started">
            <UserPlus />
            <span>Sign up</span>
          </Link>
        </NavbarPrimitives.ActionOption>
      }
    >
      <SignUpOptionWithReturnTo />
    </Suspense>
  )
}

function SignUpOptionWithReturnTo() {
  const pathname = usePathname()
  return (
    <NavbarPrimitives.ActionOption asChild>
      <Link href={`/get-started?returnTo=${encodeURIComponent(pathname)}`}>
        <UserPlus />
        <span>Sign up</span>
      </Link>
    </NavbarPrimitives.ActionOption>
  )
}

/**
 * Placeholder that holds the trigger's footprint (Identicon + label + chevron)
 * while we resolve the final state, so the button doesn't shift or flicker
 * through intermediate states (logged-out → Renown identity → builder profile).
 */
function UserButtonSkeleton() {
  return (
    <div
      aria-hidden
      className="bg-popover inline-flex h-9 items-center gap-2 rounded-md border px-2"
    >
      <Skeleton className="size-5 shrink-0 rounded-full" />
      <Skeleton className="h-4 w-20" />
      <ChevronDown className="text-muted-foreground/40 size-4 shrink-0" />
    </div>
  )
}

/**
 * User avatar or login button for desktop
 */
function UserButton({ open, onOpenChange }: UserButtonProps) {
  const auth = useRenownAuth()
  // Prefer the user's builder profile (avatar + name) when they have one, falling
  // back to the Renown identity (Identicon + display address) below. The query is
  // disabled until authorized, so this is a no-op for logged-out users.
  const { drivesQuery, profileQuery, builderProfileId } = useMyBuilderProfile()

  // `undefined`/`loading`/`checking` are transient pre-resolution auth states that
  // advance on their own; `initial`/`not-authorized` are settled logged-out states.
  // (Mirrors `AuthGuard` — both exist to avoid flashing the wrong state at an
  // already-authenticated user on refresh.)
  const isAuthResolving =
    auth.status === undefined || auth.status === 'loading' || auth.status === 'checking'
  const isAuthenticated = auth.status === 'authorized' && Boolean(auth.address)

  // Once authenticated, the profile chip isn't final until the builder-drive
  // lookup settles and — if a profile exists — its document settles too. Gating on
  // this collapses the three-step flicker into a single skeleton → final hop.
  const isProfileResolving =
    isAuthenticated &&
    (drivesQuery.isPending || (Boolean(builderProfileId) && profileQuery.isPending))

  if (isAuthResolving || isProfileResolving) {
    return <UserButtonSkeleton />
  }

  if (auth.status !== 'authorized' || !auth.address) {
    return (
      <>
        <Button variant="outline" onClick={auth.login}>
          Log in
        </Button>
        <SignUpButton />
      </>
    )
  }

  const address = auth.address
  const displayAddress = auth.displayAddress ?? address
  const profile = profileQuery.data
  const displayLabel = profile?.name ?? auth.displayName ?? displayAddress
  // Mirror the My Account page's avatar logic: with a builder profile, show its
  // icon and fall back to the name's initial (see `AccountBuilderProfile`);
  // otherwise show the Renown avatar and fall back to the address Identicon (see
  // `RenownIdentity`). `|| undefined` (not `??`) coerces an empty-string image to
  // undefined so the Avatar falls through to the fallback instead of a broken
  // `src=""`.
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- empty string must coerce to undefined
  const avatarImage = (profile ? profile.icon : auth.avatarUrl) || undefined

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="items-center gap-2 px-2">
          <Avatar className="size-5">
            <AvatarImage src={avatarImage} alt={displayLabel} className="object-cover" />
            {profile ? (
              <AvatarFallback className="text-[10px] font-semibold">
                {profile.name?.charAt(0).toUpperCase() ?? 'U'}
              </AvatarFallback>
            ) : (
              <AvatarFallback className="bg-transparent">
                <Identicon value={address} className="size-full" />
              </AvatarFallback>
            )}
          </Avatar>
          <span>{displayLabel}</span>
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-170 w-56 max-md:hidden">
        <AddressLabel address={address} displayAddress={displayAddress} />
        <DropdownMenuSeparator />
        {auth.profileId ? (
          <DropdownMenuItem className="cursor-pointer" onClick={auth.openProfile}>
            <User />
            <span>View Profile</span>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/my-account">
            <User />
            <span>My Account</span>
          </Link>
        </DropdownMenuItem>
        <NavbarDrivesSection />
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
      <>
        <NavbarPrimitives.ActionOption onClick={auth.login}>
          <LogIn />
          <span>Log in</span>
        </NavbarPrimitives.ActionOption>
        <SignUpOption />
      </>
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
      <NavbarPrimitives.ActionOption asChild>
        <Link href="/my-account">
          <User />
          <span>My Account</span>
        </Link>
      </NavbarPrimitives.ActionOption>
      <NavbarDrivesSection
        ItemComponent={NavbarPrimitives.ActionOption}
        Separator={NavbarPrimitives.ActionOptionSeparator}
      />
      <NavbarPrimitives.ActionOption variant="destructive" onClick={() => void auth.logout()}>
        <LogOut />
        <span>Log out</span>
      </NavbarPrimitives.ActionOption>
    </>
  )
}

export { UserButton, UserOption }
