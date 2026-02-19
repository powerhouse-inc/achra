import type { submitRequestSchema } from './lib/submit-request-schema'
import type { z } from 'zod'

export interface CreateResourceInstancesResult {
  data: Record<string, unknown> | null
}

export interface SubmitRequestFormState {
  success: boolean
  error?: string
  data?: CreateResourceInstancesResult['data']
}

export type SubmitRequestFormValues = z.infer<typeof submitRequestSchema>
