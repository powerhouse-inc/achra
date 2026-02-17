'use server'

import 'server-only'
import { z } from 'zod'

import { sendServiceRequest } from '../lib/send-service-request'
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
  name: z.string().optional().default(''),
  teamName: z.string().min(2, { message: 'Team name must be at least 2 characters.' }),
  email: emailSchema,
  selectedPlan: z.string().min(1, { message: 'Please select a plan.' }),
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
      teamName: formData.get('teamName') as string,
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
        if (field === 'teamName' || field === 'email') {
          fieldErrors[field] = issue.message
        }
      }

      return {
        success: false,
        error: 'Please fix the errors below.',
        fieldErrors,
      }
    }

    const enabledSections = JSON.parse(result.data.enabledSections) as Record<string, boolean>
    const configuration = JSON.parse(result.data.configuration) as {
      legalEntity: string
      teamStructure: string
      anonymityLevel: string
    }

    const sendResult = await sendServiceRequest({
      name: result.data.name,
      teamName: result.data.teamName,
      email: result.data.email,
      selectedPlan: result.data.selectedPlan,
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
