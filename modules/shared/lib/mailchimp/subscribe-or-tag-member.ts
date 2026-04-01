import client from '@mailchimp/mailchimp_marketing'
import {
  MAILCHIMP_API_KEY,
  MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_SERVER_LOCATION,
} from '@/modules/shared/config/mailchimp'
import 'server-only'

function getClient() {
  client.setConfig({
    apiKey: MAILCHIMP_API_KEY,
    server: MAILCHIMP_SERVER_LOCATION,
  })

  return client
}

function isMemberExistsError(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) {
    return false
  }

  const err = error as Record<string, unknown>

  // Check @mailchimp/mailchimp_marketing error shape: { response: { body: { title } } }
  if (typeof err.response === 'object' && err.response !== null) {
    const response = err.response as Record<string, unknown>

    // superagent-style: response.body.title
    if (typeof response.body === 'object' && response.body !== null) {
      const body = response.body as Record<string, unknown>
      if (body.title === 'Member Exists') return true
    }

    // superagent-style: response.text (JSON string)
    if (typeof response.text === 'string') {
      try {
        const parsed = JSON.parse(response.text) as Record<string, unknown>
        if (parsed.title === 'Member Exists') return true
      } catch {
        // ignore parse errors
      }
    }
  }

  // Direct status + title check (some versions of the client)
  if (err.status === 400 && err.title === 'Member Exists') return true

  return false
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
    // logging the error to the console
    // eslint-disable-next-line no-console
    console.log(error)
    if (isMemberExistsError(error)) {
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
