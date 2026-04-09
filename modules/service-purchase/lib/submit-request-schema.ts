import { z } from 'zod'
import type { SubmitRequestFormState, SubmitRequestFormValues } from '../types'

export const submitRequestSchema = z.object({
  name: z.string(),
  teamName: z.string().min(2, { message: 'Team name must be at least 2 characters.' }),
  email: z.email({ message: 'Please enter a valid email address.' }),
})

export const initialActionState: SubmitRequestFormState = {
  success: false,
}

export const formDefaultValues: SubmitRequestFormValues = {
  name: '',
  teamName: '',
  email: '',
}
