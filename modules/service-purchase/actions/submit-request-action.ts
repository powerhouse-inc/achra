'use server'

import { submitRequestSchema } from '../lib/submit-request-schema'
import { submitResourceRequest } from '../services/create-resource-instances'
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
    const serviceSlug = (formData.get('serviceSlug') as string | null) ?? ''
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

    if (!serviceSlug) {
      return {
        ...initialState,
        success: false,
        error: 'Service context is missing. Please refresh and try again.',
      }
    }

    const mutationResult = await submitResourceRequest({
      name: result.data.name,
      teamName: result.data.teamName,
      resourceTemplateId: serviceSlug,
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
