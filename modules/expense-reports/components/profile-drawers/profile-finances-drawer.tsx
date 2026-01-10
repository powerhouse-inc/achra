'use client'

import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { WalletIcon } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/modules/shared/components/ui/drawer'
import { useBuilderDrawerState } from '../../hooks/use-builder-drawer-state'
import { ProfileFinancesCardContent } from '../profile-card-content'

interface ProfileFinancesDrawerProps {
  builderSlug: string
}

function ProfileFinancesDrawer({ builderSlug }: ProfileFinancesDrawerProps) {
  const [open, setOpen] = useBuilderDrawerState()

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="View finances links"
          className="sm:bg-secondary sm:size-13.5 sm:rounded-xl sm:border-2"
        >
          <WalletIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <VisuallyHidden>
          <DrawerTitle>Finances</DrawerTitle>
        </VisuallyHidden>
        <div className="px-4 pb-8">
          <ProfileFinancesCardContent builderSlug={builderSlug} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { ProfileFinancesDrawer }
