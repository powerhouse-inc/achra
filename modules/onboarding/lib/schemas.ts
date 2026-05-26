import { z } from 'zod'
import { PERSONA_IDS } from './personas'

export const stepOneSchema = z.object({
  personaId: z.enum(PERSONA_IDS).refine((value) => value !== 'organization', {
    message: 'Running a network is coming in Phase 2. Pick Operator or Builder for now.',
  }),
  displayName: z
    .string()
    .trim()
    .min(2, { message: 'Display name must be at least 2 characters.' })
    .max(50, { message: 'Display name must be 50 characters or fewer.' }),
})

export type StepOneValues = z.infer<typeof stepOneSchema>
