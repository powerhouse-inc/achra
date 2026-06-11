'use client'

import { Button } from '@achra/ui/button'
import { useState } from 'react'
import { BecomeAnOperatorDialog } from '@/modules/shared/components/become-an-operator'
import OperatorIcon from '@/modules/shared/components/svgs/operator-icon.svg'
import { useMyBuilderProfile } from '@/modules/shared/hooks/use-my-builder-profile'

function BecomeAnOperator() {
  const { profileQuery } = useMyBuilderProfile()
  const profile = profileQuery.data

  const [open, setOpen] = useState(false)

  // Prompt only builders who have a profile and aren't already operators. While
  // the dialog is open we keep the banner mounted even after `isOperator` flips
  // (the success `onSuccess` refetch), so the dialog's success screen isn't
  // unmounted out from under the user — it closes on their action.
  if (!profile || (profile.isOperator && !open)) return null

  return (
    <div className="border-primary/20 bg-primary/5 flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-lg">
          <OperatorIcon className="size-6" />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="font-medium">Become an Operator</span>
          <span className="text-muted-foreground text-sm">Start offering your own services.</span>
        </div>
      </div>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Become an Operator
      </Button>
      <BecomeAnOperatorDialog
        open={open}
        onOpenChange={setOpen}
        profileName={profile.name ?? undefined}
      />
    </div>
  )
}

export { BecomeAnOperator }
