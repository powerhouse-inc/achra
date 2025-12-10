'use client'

import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { InfoIcon } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/modules/shared/components/ui/drawer'
import { useBuilderDrawerState } from '../../hooks/use-builder-drawer-state'
import { ProfileCardEditContent } from '../profile-card-content'

function EditContentDrawer() {
  const [open, setOpen] = useBuilderDrawerState()

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="View more information">
          <InfoIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <VisuallyHidden>
          <DrawerTitle>Finances</DrawerTitle>
        </VisuallyHidden>
        <div className="px-4 pb-8">
          <ProfileCardEditContent />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { EditContentDrawer }
