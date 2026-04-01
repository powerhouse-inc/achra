import type { notifyMeSchema } from './lib/notify-me-schema'
import type { z } from 'zod'

export interface NotifyMeResult {
  email: string
}

export interface NotifyMeFormState {
  success: boolean
  error?: string
  data?: NotifyMeResult
}

export type NotifyMeFormValues = z.infer<typeof notifyMeSchema>
