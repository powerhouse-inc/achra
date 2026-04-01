import 'server-only'

/**
 * Mailchimp audience credentials and tags (server-only).
 * Used by whitelist and networks notify-me flows.
 */
export const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY!
export const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!
export const MAILCHIMP_SERVER_LOCATION = process.env.MAILCHIMP_SERVER_LOCATION!
export const MAILCHIMP_TAG = process.env.MAILCHIMP_TAG ?? 'achra-waitlist'
export const MAILCHIMP_NETWORK_TAG = process.env.MAILCHIMP_NETWORK_TAG ?? ''
