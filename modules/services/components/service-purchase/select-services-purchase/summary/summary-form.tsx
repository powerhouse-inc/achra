'use client'

import { Link, SendHorizontal } from 'lucide-react'
import { startTransition, useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { submitServiceRequestAction } from '@/modules/services/actions/service-request-actions'
import type { ServiceRequestFormState } from '@/modules/services/config/types'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { cn } from '@/shared/lib/utils'

import type { SectionId } from '../../components/service-purchase-form/service-purchase-form'
import type { PricingPlan } from '../types'

export interface SummaryFormProps {
  /** Additional CSS classes */
  className?: string
  /** Selected pricing plan */
  selectedPlan: PricingPlan
  /** Enabled service sections */
  enabledSections: Record<SectionId, boolean>
  /** Configuration selections */
  configuration: {
    legalEntity: string
    teamStructure: string
    anonymityLevel: string
  }
  /** Callback when share configuration button is clicked */
  onShareConfiguration?: () => void
}

const initialState: ServiceRequestFormState = {
  success: false,
}

export function SummaryForm({
  className,
  selectedPlan,
  enabledSections,
  configuration,
  onShareConfiguration,
}: Readonly<SummaryFormProps>) {
  const [state, formAction, isPending] = useActionState(submitServiceRequestAction, initialState)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const onSubmit = (data: { name: string; email: string }) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('selectedPlan', selectedPlan)
    formData.append('enabledSections', JSON.stringify(enabledSections))
    formData.append('configuration', JSON.stringify(configuration))

    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <Card className="mx-auto w-full max-w-218.5 py-0!">
      <CardContent className="p-6">
        <div className={cn('flex flex-col gap-6', className)}>
          <div className="flex flex-col gap-6">
            {/* Success Message */}
            {state.success && state.message && (
              <div className="border-status-success/20 bg-status-success/10 rounded-lg border p-4">
                <p className="text-status-success text-sm font-medium">{state.message}</p>
              </div>
            )}

            {!state.success && state.error && (
              <div className="border-destructive/20 bg-destructive/10 rounded-lg border p-4">
                <p className="text-destructive text-sm font-medium">{state.error}</p>
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
                aria-describedby={
                  errors.name
                    ? 'summary-name-error'
                    : state.fieldErrors?.name
                      ? 'summary-name-server-error'
                      : undefined
                }
                className={errors.name || state.fieldErrors?.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p id="summary-name-error" className="text-destructive text-sm">
                  {errors.name.message}
                </p>
              )}
              {state.fieldErrors?.name && (
                <p id="summary-name-server-error" className="text-destructive text-sm">
                  {state.fieldErrors.name}
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
                aria-describedby={
                  errors.email
                    ? 'summary-email-error'
                    : state.fieldErrors?.email
                      ? 'summary-email-server-error'
                      : 'summary-email-description'
                }
                className={errors.email || state.fieldErrors?.email ? 'border-destructive' : ''}
              />
              <p id="summary-email-description" className="text-muted-foreground text-sm">
                We&apos;ll send a PDF summary and next steps to this address.
              </p>
              {errors.email && (
                <p id="summary-email-error" className="text-destructive text-sm">
                  {errors.email.message}
                </p>
              )}
              {state.fieldErrors?.email && (
                <p id="summary-email-server-error" className="text-destructive text-sm">
                  {state.fieldErrors.email}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="button"
              onClick={(e) => void handleSubmit(onSubmit)(e)}
              disabled={isPending}
              className="w-full"
            >
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

          {/* Share Configuration Button */}
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
