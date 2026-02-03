'use server'

import 'server-only'
import { z } from 'zod'

import { Plan } from '../components/service-purchase/components/configure-services-purchase/components/types'
import { sendServiceRequest } from '../lib/send-service-request'
import type { SectionId } from '../components/service-purchase/components/service-purchase-form/service-purchase-form'
import type { ServiceRequestFormState } from '../config/types'

/**
 * Email validation using standard pattern
 * Matches client-side validation in summary.tsx
 * Validates basic email structure: local@domain.tld
 */
const emailSchema = z
  .string()
  .min(1, { message: 'Email is required.' })
  .max(254, { message: 'Email is too long.' })
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Please enter a valid email address.' })

const serviceRequestSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: emailSchema,
  selectedPlan: z.enum([Plan.Basic, Plan.Team, Plan.Premium, Plan.Enterprise]),
  enabledSections: z.string(),
  configuration: z.string(),
})

export async function submitServiceRequestAction(
  _prevState: ServiceRequestFormState,
  formData: FormData,
): Promise<ServiceRequestFormState> {
  try {
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      selectedPlan: formData.get('selectedPlan') as string,
      enabledSections: formData.get('enabledSections') as string,
      configuration: formData.get('configuration') as string,
    }

    const result = serviceRequestSchema.safeParse(rawData)

    if (!result.success) {
      const fieldErrors: ServiceRequestFormState['fieldErrors'] = {}

      for (const issue of result.error.issues) {
        const field = issue.path[0]
        if (field === 'name' || field === 'email') {
          fieldErrors[field] = issue.message
        }
      }

      return {
        success: false,
        error: 'Please fix the errors below.',
        fieldErrors,
      }
    }

    const enabledSections = JSON.parse(result.data.enabledSections) as Record<SectionId, boolean>
    const configuration = JSON.parse(result.data.configuration) as {
      legalEntity: string
      teamStructure: string
      anonymityLevel: string
    }

    const sendResult = await sendServiceRequest({
      name: result.data.name,
      email: result.data.email,
      selectedPlan: result.data.selectedPlan as Plan,
      enabledSections,
      configuration,
    })

    if (!sendResult) {
      return {
        success: false,
        error: 'Failed to submit your request. Please try again.',
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Service request submission error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    }
  }

  return {
    success: true,
    message: 'Request submitted successfully.',
  }
}
