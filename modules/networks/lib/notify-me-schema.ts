import { z } from 'zod'
import type { NotifyMeFormState, NotifyMeFormValues } from '../types'

export const notifyMeSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }),
})

export const initialActionState: NotifyMeFormState = {
  success: false,
}

export const formDefaultValues: NotifyMeFormValues = {
  email: '',
}
