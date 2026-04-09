'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/modules/shared/components/ui/dialog'
import ff from '@/modules/shared/lib/feature-flags'
import { Button } from '@/shared/components/ui/button'
import { useServicePurchaseState } from '../../providers/service-purchase-store-provider'
import { ServicePurchaseStep } from '../../types'
import type { Route } from 'next'

function LeavePageGuard() {
  const pathname = usePathname()
  const router = useRouter()
  const { visitedSteps, requestEntityData, activeStep } = useServicePurchaseState()
  const [pendingHref, setPendingHref] = useState<string | null>(null)

  const hasSubmitted = activeStep === ServicePurchaseStep.Confirmation
  const hasProgress =
    !hasSubmitted &&
    (visitedSteps.length > 1 ||
      requestEntityData !== null ||
      activeStep !== ServicePurchaseStep.ProductInfo)

  const isPersisted = ff.ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE

  useEffect(() => {
    if (!hasProgress) return

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasProgress])

  useEffect(() => {
    if (!hasProgress) return

    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement) || !anchor.href) return

      const href = anchor.href
      if (!href || href.startsWith('#') || anchor.target === '_blank') return

      try {
        const targetUrl = new URL(href)
        if (targetUrl.origin !== window.location.origin) return
        if (targetUrl.pathname === pathname) return

        event.preventDefault()
        event.stopPropagation()
        setPendingHref(targetUrl.pathname + targetUrl.search)
      } catch {
        // Invalid URL, allow default behavior
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [hasProgress, pathname])

  const handleConfirmLeave = () => {
    if (pendingHref) {
      router.push(pendingHref as Route)
      setPendingHref(null)
    }
  }

  return (
    <Dialog
      open={pendingHref !== null}
      onOpenChange={(open) => {
        if (!open) {
          setPendingHref(null)
        }
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Leave this page?</DialogTitle>
          <DialogDescription>
            {isPersisted
              ? 'Your progress is saved automatically. You can leave and return later to continue where you left off.'
              : "Your progress will not be saved. Leaving will discard your selections and you'll need to start over."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={handleConfirmLeave}>
            {isPersisted ? 'Leave' : 'Leave anyway'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { LeavePageGuard }
