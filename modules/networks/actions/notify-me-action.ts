'use server'

import { addNetworkNotifySubscriber } from '@/modules/networks/lib/add-network-notify-subscriber'
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

    const subscribed = await addNetworkNotifySubscriber(result.data.email)

    if (subscribed) {
      return {
        success: true,
        data: {
          email: result.data.email,
        },
      }
    }

    return {
      ...initialState,
      success: false,
      error:
        'We could not complete your signup right now. Please try again in a moment or contact support if the problem continues.',
    }
  } catch {
    return {
      ...initialState,
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}
