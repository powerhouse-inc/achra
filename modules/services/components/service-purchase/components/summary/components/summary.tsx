'use client'

import { Link, SendHorizontal } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import type { ServiceRequestFormState } from '@/modules/services/config/types'

import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { cn } from '@/shared/lib/utils'

import type { ServicePurchaseFormValues } from '../../service-purchase-form/service-purchase-form'

export interface SummaryFormProps {
  className?: string
  onShareConfiguration?: () => void
  actionState: ServiceRequestFormState
  isPending: boolean
}

export function Summary({
  className,
  onShareConfiguration,
  actionState,
  isPending,
}: Readonly<SummaryFormProps>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ServicePurchaseFormValues>()

  const nameErrorId = errors.name
    ? 'summary-name-error'
    : actionState.fieldErrors?.name
      ? 'summary-name-server-error'
      : undefined

  const emailErrorId = errors.email
    ? 'summary-email-error'
    : actionState.fieldErrors?.email
      ? 'summary-email-server-error'
      : 'summary-email-description'

  return (
    <Card className="mx-auto w-full max-w-218.5 py-0!">
      <CardContent className="p-6">
        <div className={cn('flex flex-col gap-6', className)}>
          <div className="flex flex-col gap-6">
            {/* Success Message */}
            {actionState.success && actionState.message && (
              <div className="border-status-success/20 bg-status-success/10 rounded-lg border p-4">
                <p className="text-status-success text-sm font-medium">{actionState.message}</p>
              </div>
            )}

            {!actionState.success && actionState.error && (
              <div className="border-destructive/20 bg-destructive/10 rounded-lg border p-4">
                <p className="text-destructive text-sm font-medium">{actionState.error}</p>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label htmlFor="summary-name">
                Name <span>*</span>
              </Label>
              <Input
                id="summary-name"
                {...register('name', { required: 'Name is required' })}
                placeholder="Your name"
                disabled={isPending}
                autoComplete="name"
                aria-describedby={nameErrorId}
                className={errors.name || actionState.fieldErrors?.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p id="summary-name-error" className="text-destructive text-sm">
                  {errors.name.message}
                </p>
              )}
              {actionState.fieldErrors?.name && (
                <p id="summary-name-server-error" className="text-destructive text-sm">
                  {String(actionState.fieldErrors.name)}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="summary-email">
                Email <span>*</span>
              </Label>
              <Input
                id="summary-email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                placeholder="your@email.com"
                disabled={isPending}
                autoComplete="email"
                aria-describedby={emailErrorId}
                className={
                  errors.email || actionState.fieldErrors?.email ? 'border-destructive' : ''
                }
              />
              <p id="summary-email-description" className="text-muted-foreground text-sm">
                We&apos;ll send a PDF summary and next steps to this address.
              </p>
              {errors.email && (
                <p id="summary-email-error" className="text-destructive text-sm">
                  {errors.email.message}
                </p>
              )}
              {actionState.fieldErrors?.email && (
                <p id="summary-email-server-error" className="text-destructive text-sm">
                  {String(actionState.fieldErrors.email)}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                'Submitting...'
              ) : (
                <>
                  Submit Request
                  <SendHorizontal className="ml-2 h-4 w-4" aria-hidden="true" />
                </>
              )}
            </Button>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={onShareConfiguration}
            disabled={isPending}
            className="w-full"
          >
            Share Configuration
            <Link className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
