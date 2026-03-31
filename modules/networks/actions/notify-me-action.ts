'use server'

import { notifyMeSchema } from '@/modules/networks/lib/notify-me-schema'
import type { NotifyMeFormState } from '@/modules/networks/types'
import 'server-only'

const initialState: NotifyMeFormState = {
  success: false,
}

export async function notifyMeAction(
  _prevState: NotifyMeFormState,
  formData: FormData,
): Promise<NotifyMeFormState> {
  try {
    const rawData = {
      email: (formData.get('email') as string | null) ?? '',
    }

    const result = notifyMeSchema.safeParse(rawData)

    if (!result.success) {
      const firstIssue = result.error.issues[0]
      return {
        ...initialState,
        success: false,
        error: firstIssue.message,
      }
    }

    // The mutation call will be executed here

    const mutationResult = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ username: 'Dummy' }) // Fulfilled state
      }, 2000)
    })

    // eslint-disable-next-line no-console
    console.log({ mutationResult })

    return {
      success: true,
      data: {
        email: result.data.email,
      },
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
    return {
      ...initialState,
      success: false,
      error: message,
    }
  }
}
