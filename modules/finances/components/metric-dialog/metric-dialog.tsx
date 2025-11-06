'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Info, XIcon } from 'lucide-react'

import { Button } from '@/modules/shared/components/ui/button'
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/modules/shared/components/ui/dialog'
import { cn } from '@/modules/shared/lib/utils'
import { metrics } from '../../constants'

export function BudgetMetricsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Budget Metrics
          <Info className="fill-status-progress stroke-popover h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="z-170!" />
        <DialogPrimitive.Content
          className={cn(
            'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-180 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-0 shadow-lg duration-200 sm:max-w-lg',
          )}
        >
          <DialogHeader className="border-b px-6 py-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <DialogTitle>About budget metrics</DialogTitle>
            <DialogDescription>
              An estimate of income and expenditure for a set period.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 px-4 pb-4">
            {metrics.map((metric) => (
              <div key={metric.title}>
                <h3 className="text-foreground font-semibold">{metric.title}</h3>
                <p className="text-muted-foreground text-sm">{metric.description}</p>
              </div>
            ))}
          </div>
          <DialogPrimitive.Close className="data-[state=open]:bg-foreground data-[state=open]:text-foreground absolute top-4 right-4 cursor-pointer rounded-xs transition-opacity hover:opacity-100 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6">
            <XIcon className="text-foreground" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
