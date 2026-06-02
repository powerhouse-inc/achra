import client, { type ErrorResponse } from '@mailchimp/mailchimp_marketing'
import {
  MAILCHIMP_API_KEY,
  MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_SERVER_LOCATION,
} from '@/modules/shared/config/mailchimp'
import 'server-only'

interface MailchimpError extends Error {
  response?: {
    body?: ErrorResponse
  }
}

function getClient() {
  client.setConfig({
    apiKey: MAILCHIMP_API_KEY,
    server: MAILCHIMP_SERVER_LOCATION,
  })

  return client
}

function isMailchimpError(error: unknown): error is MailchimpError {
  if (typeof error !== 'object' || error === null) {
    return false
  }

  const mailchimpError = error as MailchimpError

  if (!('response' in mailchimpError) || typeof mailchimpError.response !== 'object') {
    return false
  }

  const responseBody = mailchimpError.response.body

  return (
    typeof responseBody === 'object' &&
    'title' in responseBody &&
    typeof responseBody.title === 'string'
  )
}

/**
 * Subscribes an email to the Mailchimp audience with the given tag.
 * If the member already exists, adds the tag via updateListMemberTags.
 */
export async function subscribeOrTagMember(email: string, tag: string): Promise<boolean> {
  const mailchimp = getClient()

  try {
    await mailchimp.lists.addListMember(MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed',
      tags: [tag],
    })

    return true
  } catch (error) {
    if (isMailchimpError(error) && error.response?.body?.title === 'Member Exists') {
      await mailchimp.lists.updateListMemberTags(MAILCHIMP_AUDIENCE_ID, email, {
        tags: [
          {
            name: tag,
            status: 'active',
          },
        ],
      })

      return true
    }

    return false
  }
}
