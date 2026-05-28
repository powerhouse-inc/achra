import { z } from 'zod'
import { PERSONA_IDS } from './personas'

export const stepOneSchema = z.object({
  personaId: z.enum(PERSONA_IDS).refine((value) => value !== 'organization', {
    message: 'Running a network is coming in Phase 2. Pick Operator or Builder for now.',
  }),
  // Optional — an empty value is allowed, but when provided it must be 2–50 chars.
  displayName: z
    .string()
    .trim()
    .max(50, { message: 'Display name must be 50 characters or fewer.' })
    .refine((value) => value.length === 0 || value.length >= 2, {
      message: 'Display name must be at least 2 characters.',
    }),
})

export type StepOneValues = z.infer<typeof stepOneSchema>
