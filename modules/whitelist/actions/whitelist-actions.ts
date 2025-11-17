'use server'

import { z } from 'zod'
import { addToWhitelist } from '../lib/add-to-whitelist'
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

    const whitelistResult = await addToWhitelist(email)

    if (whitelistResult) {
      return {
        success: true,
        message: 'Successfully joined the waitlist!',
        email,
      }
    } else {
      return {
        success: false,
        error: 'Failed to join the waitlist. Please try again.',
        email,
      }
    }
  } catch (_error) {
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}
