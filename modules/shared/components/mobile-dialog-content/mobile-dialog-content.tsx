'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import * as React from 'react'
import { DialogClose, DialogOverlay, DialogPortal } from '@/modules/shared/components/ui/dialog'
import { cn } from '@/modules/shared/lib/utils'

interface MobileDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  className?: string
  children: React.ReactNode
}

const MobileDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  MobileDialogContentProps
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay
      className={cn(
        'bg-foreground/10 fixed inset-0 z-200 backdrop-blur-sm',

        className,
      )}
    />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'bg-background fixed top-1/2 left-1/2 z-200 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 border p-6 shadow-lg duration-200',

        'max-w-[calc(100%-32px)] rounded-md md:rounded-2xl',
        className,
      )}
      {...props}
    >
      {children}
      <DialogClose className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </DialogPrimitive.Content>
  </DialogPortal>
))
MobileDialogContent.displayName = DialogPrimitive.Content.displayName

export { MobileDialogContent }
