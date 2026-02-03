'use client'

import { Link, Send } from 'lucide-react'
import { type FieldError, useFormContext } from 'react-hook-form'
import type { ServiceRequestFormState } from '@/modules/services/config/types'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { cn } from '@/shared/lib/utils'
import type { ServicePurchaseFormValues } from '../../service-purchase-form/service-purchase-form'

/**
 * Validation constants for form fields
 */
const VALIDATION_RULES = {
  name: {
    required: 'Name is required',
  },
  email: {
    required: 'Email is required',
    pattern: {
      // Standard email pattern - validates basic structure
      // Accepts: local@domain.tld (including short domains like a@b.co)
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
    maxLength: {
      // RFC 5321 maximum email length
      value: 254,
      message: 'Email address is too long',
    },
  },
} as const

interface FormFieldErrorProps {
  id: string
  clientError?: FieldError
  serverError?: string
}

function FormFieldError({ id, clientError, serverError }: Readonly<FormFieldErrorProps>) {
  if (clientError) {
    return (
      <p id={id} role="alert" className="text-destructive text-sm">
        {clientError.message}
      </p>
    )
  }

  if (serverError) {
    return (
      <p id={`${id}-server`} role="alert" className="text-destructive text-sm">
        {serverError}
      </p>
    )
  }

  return null
}

interface AlertBannerProps {
  variant: 'success' | 'error'
  message: string
}

function AlertBanner({ variant, message }: Readonly<AlertBannerProps>) {
  const styles = {
    success: 'border-status-success/20 bg-status-success/10 text-status-success',
    error: 'border-destructive/20 bg-destructive/10 text-destructive',
  }

  return (
    <div role="alert" className={cn('rounded-lg border p-4', styles[variant])}>
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}

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
    trigger,
    formState: { errors, dirtyFields, isValid },
  } = useFormContext<ServicePurchaseFormValues>()

  // Trigger validation on input - handles browser autocomplete
  const triggerValidation = (field: 'name' | 'email') => void trigger(field)

  // Server errors clear when user starts editing the field (dirtyFields becomes true)
  const nameServerError = dirtyFields.name ? undefined : actionState.fieldErrors?.name
  const emailServerError = dirtyFields.email ? undefined : actionState.fieldErrors?.email

  // Show error if: has client error OR has server error (not yet edited)
  // Client errors from react-hook-form, server errors from actionState
  const showNameError = errors.name || nameServerError
  const showEmailError = errors.email || emailServerError

  // Hide general error banner if user has started fixing (any field is dirty)
  const hasStartedFixing = dirtyFields.name || dirtyFields.email
  const showErrorBanner = actionState.error && !hasStartedFixing

  return (
    <Card className="mx-auto w-full max-w-218.5 py-0!">
      <CardContent className="p-3 lg:p-6">
        <div className={cn('flex flex-col gap-6', className)}>
          <fieldset disabled={isPending} className="flex flex-col gap-4">
            {showErrorBanner && actionState.error && (
              <AlertBanner variant="error" message={actionState.error} />
            )}

            <div className="flex flex-col gap-2.5">
              <Label htmlFor="summary-name" className="text-sm/3.5 font-medium">
                Name <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </Label>
              <Input
                id="summary-name"
                {...register('name', VALIDATION_RULES.name)}
                placeholder="Your name"
                autoComplete="name"
                onInput={() => {
                  triggerValidation('name')
                }}
                aria-invalid={Boolean(showNameError)}
                aria-describedby={showNameError ? 'name-error' : undefined}
                className={cn(showNameError && 'border-destructive')}
              />
              {showNameError && (
                <FormFieldError
                  id="name-error"
                  clientError={errors.name}
                  serverError={nameServerError}
                />
              )}
            </div>

            <div className="flex flex-col gap-2.5">
              <Label htmlFor="summary-email" className="text-sm/3.5 font-medium">
                Email <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </Label>
              <Input
                id="summary-email"
                type="email"
                {...register('email', VALIDATION_RULES.email)}
                placeholder="your@email.com"
                autoComplete="email"
                onInput={() => {
                  triggerValidation('email')
                }}
                aria-invalid={Boolean(showEmailError)}
                aria-describedby={
                  showEmailError ? 'email-description email-error' : 'email-description'
                }
                className={cn(showEmailError && 'border-destructive')}
              />
              <p id="email-description" className="text-foreground/50 text-sm/5 font-normal">
                We&apos;ll send a PDF summary and next steps to this address.
              </p>
              {showEmailError && (
                <FormFieldError
                  id="email-error"
                  clientError={errors.email}
                  serverError={emailServerError}
                />
              )}
            </div>
          </fieldset>

          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={isPending || !isValid} className="w-full">
              {isPending ? 'Submitting...' : 'Submit Request'}
              {!isPending && <Send className="size-4" aria-hidden="true" />}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onShareConfiguration}
              disabled={isPending}
              className="w-full"
            >
              Share Configuration
              <Link className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
