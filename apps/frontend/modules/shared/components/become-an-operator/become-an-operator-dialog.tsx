'use client'

import { Button } from '@achra/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@achra/ui/dialog'
import { AlertTriangle, ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react'
import { useCallback } from 'react'
import OperatorIcon from '@/modules/shared/components/svgs/operator-icon.svg'
import { driveLinkFor } from '@/modules/shared/lib/switchboard-urls'
import { useBecomeAnOperator } from './use-become-an-operator'

interface BecomeAnOperatorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** The builder's display name, passed through as identity for the upgrade. */
  profileName?: string
}

/**
 * Modal that promotes an existing builder to an operator.
 *
 * Four phases driven by the mutation state: intro →
 * upgrading (spinner) → success (link to the new operator drive) / error. Only
 * the service-offering drive is created — the builder workspace and profile
 * already exist, so `ensure(['operator'])` skips them (no duplication).
 */
function BecomeAnOperatorDialog({ open, onOpenChange, profileName }: BecomeAnOperatorDialogProps) {
  const { mutate, isPending, isSuccess, isError, error, data, reset } = useBecomeAnOperator()

  const handleOpenChange = useCallback(
    (next: boolean) => {
      // Don't let the user dismiss mid-upgrade — the signing/creation is in flight.
      if (isPending) return
      // Reset the mutation when closing so a future open starts at the intro.
      if (!next) reset()
      onOpenChange(next)
    },
    [isPending, reset, onOpenChange],
  )

  const handleBecomeOperator = useCallback(() => {
    mutate({ name: profileName })
  }, [mutate, profileName])

  const operatorDriveLink = data?.operatorDriveSlug ? driveLinkFor(data.operatorDriveSlug) : null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={!isPending}>
        {isPending ? (
          <div className="flex flex-col items-center gap-5 py-6 text-center">
            <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
              <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-2">
              <DialogTitle className="text-xl">Upgrading your account</DialogTitle>
              <DialogDescription className="mx-auto max-w-sm">
                Setting up your operator workspace — this takes just a few seconds.
              </DialogDescription>
            </div>
          </div>
        ) : isSuccess ? (
          <>
            <div className="flex flex-col items-center gap-5 py-2 text-center">
              <div className="bg-status-success/15 text-status-success flex size-12 items-center justify-center rounded-full">
                <CheckCircle2 className="size-5" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-2">
                <DialogTitle className="text-xl">You&apos;re now an operator!</DialogTitle>
                <DialogDescription className="mx-auto max-w-sm">
                  Your service offering workspace is ready. Start offering your own services to
                  builders across Achra.
                </DialogDescription>
              </div>
            </div>
            <DialogFooter className="items-center justify-center sm:justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  handleOpenChange(false)
                }}
              >
                Done
              </Button>
              <Button asChild disabled={!operatorDriveLink}>
                {operatorDriveLink ? (
                  <a href={operatorDriveLink} target="_blank" rel="noopener noreferrer">
                    Open operator workspace
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                ) : (
                  <span aria-disabled="true">Open operator workspace</span>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : isError ? (
          <>
            <div className="flex flex-col items-center gap-5 py-2 text-center">
              <div className="bg-destructive/10 text-destructive flex size-12 items-center justify-center rounded-full">
                <AlertTriangle className="size-5" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-2">
                <DialogTitle className="text-xl">Couldn&apos;t upgrade your account</DialogTitle>
                <DialogDescription className="mx-auto max-w-sm">
                  {error.message || 'Something went wrong. Please try again.'}
                </DialogDescription>
              </div>
            </div>
            <DialogFooter className="items-center justify-center sm:justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  handleOpenChange(false)
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleBecomeOperator}>Try again</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader className="items-center gap-4 py-2 text-center sm:text-center">
              <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-lg">
                <OperatorIcon className="size-6" />
              </div>
              <div className="flex flex-col gap-2">
                <DialogTitle className="text-xl">Become an Operator</DialogTitle>
                <DialogDescription className="mx-auto max-w-sm">
                  Start offering your own services that builders across Achra can subscribe to.
                </DialogDescription>
              </div>
            </DialogHeader>
            <DialogFooter className="items-center justify-center sm:justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  handleOpenChange(false)
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleBecomeOperator}>Become an Operator</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { BecomeAnOperatorDialog }
