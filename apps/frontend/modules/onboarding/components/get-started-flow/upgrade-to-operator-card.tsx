'use client'

import { Button } from '@achra/ui/button'
import { Card, CardContent } from '@achra/ui/card'
import { BecomeAnOperatorDialog } from '@/modules/shared/components/become-an-operator'
import OperatorIcon from '@/modules/shared/components/svgs/operator-icon.svg'
import { useMyBuilderProfile } from '@/modules/shared/hooks/use-my-builder-profile'

interface UpgradeToOperatorCardProps {
  /**
   * Dialog open state is owned by the parent so a successful upgrade (which
   * refetches the drives list and would otherwise swap this card out) can't
   * unmount the dialog's success screen while it's still open.
   */
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Shown when a user arriving with operator intent has completed onboarding but
 * is still only a builder. Offers the upgrade-to-operator flow inline by opening
 * the shared `BecomeAnOperatorDialog`.
 */
function UpgradeToOperatorCard({ open, onOpenChange }: UpgradeToOperatorCardProps) {
  const { profileQuery } = useMyBuilderProfile()
  // Pass the builder's name (best-effort, non-blocking) as identity for the
  // upgrade. The Service Offering drive itself is named canonically (no prefix).
  const profileName = profileQuery.data?.name ?? undefined

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-5 px-8 py-12 text-center">
        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
          <OperatorIcon className="size-6" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">Become an Operator</h2>
          <p className="text-muted-foreground max-w-md text-sm">
            You&apos;re set up as a builder. Upgrade to an operator to publish services that
            builders across Achra can subscribe to.
          </p>
        </div>
        <Button
          onClick={() => {
            onOpenChange(true)
          }}
        >
          Become an Operator
        </Button>
        <BecomeAnOperatorDialog open={open} onOpenChange={onOpenChange} profileName={profileName} />
      </CardContent>
    </Card>
  )
}

export { UpgradeToOperatorCard }
