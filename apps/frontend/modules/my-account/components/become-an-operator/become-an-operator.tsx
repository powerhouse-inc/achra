'use client'

import { Button } from '@achra/ui/button'
import { Loader2 } from 'lucide-react'
import { useCallback } from 'react'
import { toast } from 'sonner'
import OperatorSVG from '@/modules/shared/components/svgs/operator.svg'
import { useMyBuilderProfile } from '@/modules/shared/hooks/use-my-builder-profile'
import { useBecomeAnOperator } from './use-become-an-operator'

function BecomeAnOperator() {
  const { profileQuery } = useMyBuilderProfile()
  const profile = profileQuery.data

  const { mutate, isPending } = useBecomeAnOperator()

  const handleBecomeOperator = useCallback(() => {
    mutate(
      { name: profile?.name ?? undefined },
      {
        onSuccess: () => {
          toast.success("You're now an operator. Your service offering is ready to set up.")
        },
        onError: (error) => {
          toast.error(error.message || 'Could not set you up as an operator. Please try again.')
        },
      },
    )
  }, [mutate, profile?.name])

  // Only prompt builders who have a profile and aren't already operators.
  if (!profile || profile.isOperator) return null

  return (
    <div className="border-primary/20 bg-primary/5 flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4">
      <div className="flex items-center gap-4">
        <OperatorSVG className="size-11 shrink-0" />
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="font-medium">Become an Operator</span>
          <span className="text-muted-foreground text-sm">
            Offer services and get discovered by networks across Achra.
          </span>
        </div>
      </div>
      <Button onClick={handleBecomeOperator} disabled={isPending}>
        {isPending && <Loader2 className="animate-spin" aria-hidden="true" />}
        Become an Operator
      </Button>
    </div>
  )
}

export { BecomeAnOperator }
