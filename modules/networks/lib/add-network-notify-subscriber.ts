import {
  MAILCHIMP_API_KEY,
  MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_NETWORK_TAG,
  MAILCHIMP_SERVER_LOCATION,
} from '@/modules/shared/config/mailchimp'
import { subscribeOrTagMember } from '@/modules/shared/lib/mailchimp/subscribe-or-tag-member'
import 'server-only'

function isMailchimpConfigured(): boolean {
  return Boolean(
    MAILCHIMP_API_KEY &&
      MAILCHIMP_AUDIENCE_ID &&
      MAILCHIMP_SERVER_LOCATION &&
      MAILCHIMP_NETWORK_TAG.trim(),
  )
}

/**
 * Adds an email to the Mailchimp audience with the networks notify tag.
 */
export async function addNetworkNotifySubscriber(email: string): Promise<boolean> {
  if (!isMailchimpConfigured()) {
    return false
  }

  return subscribeOrTagMember(email, MAILCHIMP_NETWORK_TAG.trim())
}
