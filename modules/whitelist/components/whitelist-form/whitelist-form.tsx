'use client'

import { useActionState, useEffect } from 'react'
import type { WhitelistFormState } from '@/modules/whitelist/config/types'
import { submitWhitelistEmailAction } from '@/modules/whitelist/lib/whitelist-actions'
import { Button } from '@/shared/components/ui/button'
import { Field, FieldLabel } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/utils'
import { JoinedUsersBadge } from '../joined-users-badge'

const initialState: WhitelistFormState = {
  success: false,
}

interface WhitelistFormProps {
  onSuccess: () => void
}

export function WhitelistForm({ onSuccess }: WhitelistFormProps) {
  const [state, formAction, isPending] = useActionState(submitWhitelistEmailAction, initialState)

  // Handle success state in useEffect to avoid setState during render
  useEffect(() => {
    if (state.success) {
      onSuccess()
    }
  }, [state.success, onSuccess])

  return (
    <>
      <h2 className="relative z-20 py-2 text-center font-sans text-4xl font-semibold tracking-tighter md:py-10 md:text-8xl">
        Join the Waitlist
      </h2>
      <p className="text-md text-muted-foreground mx-auto max-w-xl text-center lg:text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </p>
      <form action={formAction} className="relative z-20 mt-10 w-full max-w-md">
        <Field data-invalid={!!state.error}>
          <FieldLabel htmlFor="whitelist-email" className="sr-only">
            Email Address
          </FieldLabel>
          <div className="flex items-center gap-3 rounded-full p-1">
            <Input
              id="whitelist-email"
              name="email"
              type="email"
              aria-invalid={!!state.error}
              placeholder="Enter your email"
              defaultValue={state.email ?? ''}
              key={state.email}
              className={cn(
                'bg-muted h-10 w-full rounded-xl border-none shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none active:ring-0 active:outline-0',
                state.error && 'ring-destructive/50 ring-2',
              )}
              disabled={isPending}
              required
            />
            <Button type="submit" className="h-10 rounded-xl" disabled={isPending}>
              {isPending ? 'Joining...' : 'Join the Waitlist'}
            </Button>
          </div>
          {state.error && (
            <div role="alert" className="text-destructive mt-2 px-1 text-sm font-normal">
              {state.error}
            </div>
          )}
        </Field>
      </form>
      <JoinedUsersBadge />
    </>
  )
}
