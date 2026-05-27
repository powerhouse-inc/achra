'use client'

import { HardDrive } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/modules/shared/components/ui/dropdown-menu'
import { useUserDrives } from '@/modules/shared/hooks/use-user-drives'
import { Skeleton } from '@/shared/components/ui/skeleton'

type MenuItemComponent = React.ComponentType<React.ComponentProps<typeof DropdownMenuItem>>
type SeparatorComponent = React.ComponentType

interface NavbarDrivesSectionProps {
  /** Menu-item component to render each drive with. Defaults to the desktop
   * `DropdownMenuItem`; the mobile menu passes `NavbarPrimitives.ActionOption`. */
  ItemComponent?: MenuItemComponent
  /** Trailing separator component. Defaults to `DropdownMenuSeparator`; the mobile
   * menu passes `NavbarPrimitives.ActionOptionSeparator`. */
  Separator?: SeparatorComponent
}

/**
 * Renders the authenticated user's drives as inline menu items, meant to sit between
 * "My Account" and "Log out" in the account dropdown. Reads from the shared
 * `useUserDrives` React Query cache (deduped across every navbar mount), so no extra
 * provider or store is needed.
 *
 * Shows a skeleton while loading and renders nothing (including its trailing separator)
 * when the user has no drives or the request errors.
 */
function NavbarDrivesSection({
  ItemComponent = DropdownMenuItem,
  Separator = DropdownMenuSeparator,
}: NavbarDrivesSectionProps) {
  const { data: drives, isPending, isError } = useUserDrives()

  // Hide the whole section on error or when the authed user has no drives.
  if (isError) return null
  if (!isPending && drives.length === 0) return null

  return (
    <>
      <DropdownMenuLabel className="text-muted-foreground text-xs font-normal uppercase">
        Drives
      </DropdownMenuLabel>
      {isPending
        ? Array.from({ length: 2 }, (_, index) => (
            <div key={index} className="flex items-center gap-2 px-2 py-1.5" aria-hidden>
              <HardDrive className="text-muted-foreground size-4 shrink-0" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))
        : drives.map((drive) => (
            <ItemComponent key={drive.driveId} asChild className="cursor-pointer">
              <Link href={drive.driveLink} target="_blank" rel="noreferrer">
                <HardDrive />
                <span className="min-w-0 flex-1 truncate">{drive.driveName}</span>
              </Link>
            </ItemComponent>
          ))}
      <Separator />
    </>
  )
}

export { NavbarDrivesSection }
