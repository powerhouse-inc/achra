'use server'

import type { RsBillingCycle } from '@/modules/__generated__/graphql/switchboard-generated'
import { submitRequestSchema } from '../lib/submit-request-schema'
import { submitResourceRequest } from '../services/create-product-instances'
import type { SubmitRequestFormState } from '../types'
import 'server-only'

const initialState: SubmitRequestFormState = {
  success: false,
}

export async function submitRequestAction(
  _prevState: SubmitRequestFormState,
  formData: FormData,
): Promise<SubmitRequestFormState> {
  try {
    const serviceOfferingId = (formData.get('serviceOfferingId') as string | null) ?? ''
    const rawData = {
      name: (formData.get('name') as string | null) ?? '',
      teamName: (formData.get('teamName') as string | null) ?? '',
      email: (formData.get('email') as string | null) ?? '',
    }

    const result = submitRequestSchema.safeParse(rawData)

    if (!result.success) {
      const firstIssue = result.error.issues[0]
      return {
        ...initialState,
        success: false,
        error: firstIssue.message,
      }
    }

    if (!serviceOfferingId) {
      return {
        ...initialState,
        success: false,
        error: 'We ran into an internal error. Please try again later.',
      }
    }

    const mutationResult = await submitResourceRequest({
      name: result.data.name,
      teamName: result.data.teamName,
      customerEmail: result.data.email,
      serviceOfferingId,
      userSelection: {
        billingCycle: formData.get('billingCycle') as RsBillingCycle,
        tierId: formData.get('tierId') as string,
        optionGroupIds: JSON.parse(formData.get('optionGroupIds') as string) as string[],
      },
    })

    return {
      success: true,
      data: {
        name: result.data.name,
        teamName: result.data.teamName,
        email: result.data.email,
        driveUrl: mutationResult.driveUrl,
      },
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
    return {
      ...initialState,
      success: false,
      error: message,
    }
  }
}
