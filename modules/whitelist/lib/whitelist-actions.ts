'use server'

import { z } from 'zod'
import type { WhitelistFormState } from '../config/types'
import 'server-only'

const emailSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address' }),
})

export async function submitWhitelistEmailAction(
  _prevState: WhitelistFormState,
  formData: FormData,
): Promise<WhitelistFormState> {
  try {
    const email = formData.get('email') as string

    // Validate the email
    const result = emailSchema.safeParse({ email })

    if (!result.success) {
      return {
        success: false,
        error: result.error.issues[0]?.message ?? 'Invalid email address',
        email, // Preserve the email value for the form
      }
    }

    // Here you would typically save to a database
    // For now, we'll simulate a successful submission
    await new Promise((resolve) => setTimeout(resolve, 500))

    // TODO: save the email somewhere

    return {
      success: true,
      message: 'Successfully joined the waitlist!',
      email,
    }
  } catch (_error) {
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}
