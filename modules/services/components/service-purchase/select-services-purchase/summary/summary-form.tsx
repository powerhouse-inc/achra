'use client'

import { Link, SendHorizontal } from 'lucide-react'
import { startTransition, useActionState, useState } from 'react'
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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
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
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  {state.message}
                </p>
              </div>
            )}

            {/* Error Message */}
            {!state.success && state.error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">{state.error}</p>
              </div>
            )}

            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="summary-name">
                Name <span>*</span>
              </Label>
              <Input
                id="summary-name"
                name="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                disabled={isPending}
                autoComplete="name"
                aria-describedby={state.fieldErrors?.name ? 'summary-name-error' : undefined}
                className={state.fieldErrors?.name ? 'border-red-500' : ''}
              />
              {state.fieldErrors?.name && (
                <p id="summary-name-error" className="text-sm text-red-500">
                  {state.fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="summary-email">
                Email <span>*</span>
              </Label>
              <Input
                id="summary-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                disabled={isPending}
                autoComplete="email"
                aria-describedby={
                  state.fieldErrors?.email ? 'summary-email-error' : 'summary-email-description'
                }
                className={state.fieldErrors?.email ? 'border-red-500' : ''}
              />
              <p id="summary-email-description" className="text-muted-foreground text-sm">
                We&apos;ll send a PDF summary and next steps to this address.
              </p>
              {state.fieldErrors?.email && (
                <p id="summary-email-error" className="text-sm text-red-500">
                  {state.fieldErrors.email}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="button" onClick={handleSubmit} disabled={isPending} className="w-full">
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
