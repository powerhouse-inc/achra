import { http, HttpResponse, passthrough } from 'msw'

/**
 * MSW handlers for whitelist form submission.
 * Mocks the Mailchimp API endpoint that submitWhitelistEmailAction calls via addToWhitelist.
 * The Mailchimp SDK POSTs to https://{dc}.api.mailchimp.com/3.0/lists/{list_id}/members
 */
const MAILCHIMP_API_PATTERN =
  /^https:\/\/[a-z0-9]+\.api\.mailchimp\.com\/3\.0\/lists\/[^/]+\/members$/

export const whitelistMailchimpSuccessHandler = http.post(MAILCHIMP_API_PATTERN, () =>
  HttpResponse.json({
    id: 'mock-member-id',
    email_address: 'test@example.com',
    status: 'subscribed',
  }),
)

export const whitelistMailchimpErrorHandler = http.post(MAILCHIMP_API_PATTERN, () =>
  HttpResponse.json(
    {
      title: 'Invalid Resource',
      status: 400,
      detail: 'The resource submitted could not be validated.',
    },
    { status: 400 },
  ),
)

/**
 * Mocks the Next.js server action POST (form submission).
 * Intercepts form POSTs with Next-Action header and returns a success state.
 */
export const whitelistFormSuccessHandler = http.post('*', ({ request }) => {
  if (request.headers.get('Next-Action')) {
    return HttpResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      email: 'test@example.com',
    })
  }
  return passthrough()
})

export const whitelistHandlers = [whitelistMailchimpSuccessHandler, whitelistFormSuccessHandler]
