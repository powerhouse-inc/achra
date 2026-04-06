'use server'

import { z } from 'zod'
import { MAILCHIMP_TAG } from '@/modules/shared/config/mailchimp'
import { subscribeOrTagMember } from '@/modules/shared/lib/mailchimp/subscribe-or-tag-member'
import 'server-only'

export interface HomeWaitlistFormState {
  success: boolean
  error?: string
  message?: string
  email?: string
}

const emailSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address' }),
})

export async function submitHomeWaitlistAction(
  _prevState: HomeWaitlistFormState,
  formData: FormData,
): Promise<HomeWaitlistFormState> {
  try {
    const email = formData.get('email') as string

    const result = emailSchema.safeParse({ email })

    if (!result.success) {
      return {
        success: false,
        error: result.error.issues[0]?.message ?? 'Invalid email address',
        email,
      }
    }

    const ok = await subscribeOrTagMember(result.data.email, MAILCHIMP_TAG)

    if (ok) {
      return {
        success: true,
        message: "You're on the list — we'll be in touch.",
        email: result.data.email,
      }
    }

    return {
      success: false,
      error: 'Something went wrong. Please try again.',
      email: result.data.email,
    }
  } catch {
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}
