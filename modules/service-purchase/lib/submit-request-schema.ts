import { z } from 'zod'

export const submitRequestSchema = z.object({
  name: z.string(),
  teamName: z.string().min(2, { message: 'Team name must be at least 2 characters.' }),
  email: z.email({ message: 'Please enter a valid email address.' }),
})
