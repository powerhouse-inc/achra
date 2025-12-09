'use client'

import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { WalletIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/modules/shared/components/ui/drawer'
import { ProfileFinancesCardContent } from '../profile-card-content'

function ProfileFinancesDrawer() {
  const [open, setOpen] = useState<boolean>(false)

  // close the drawer if the screen is resized
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const listener = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setOpen(false)
      }
    }
    mediaQuery.addEventListener('change', listener)

    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  }, [])

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="View finances links">
          <WalletIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <VisuallyHidden>
          <DrawerTitle>Finances</DrawerTitle>
        </VisuallyHidden>
        <div className="px-4 pb-8">
          <ProfileFinancesCardContent />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { ProfileFinancesDrawer }
