import 'server-only'

/**
 * Mailchimp-specific configuration constants.
 * These are only required when using Mailchimp as the whitelist provider.
 */
export const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY!
export const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!
export const MAILCHIMP_SERVER_LOCATION = process.env.MAILCHIMP_SERVER_LOCATION!
export const MAILCHIMP_TAG = process.env.MAILCHIMP_TAG ?? 'achra-waitlist'
