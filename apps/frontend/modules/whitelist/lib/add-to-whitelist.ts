import { MailchimpProvider } from './providers/mailchimp-provider'
import 'server-only'

/**
 * Adds a user to the Achra waitlist using the Mailchimp provider.
 *
 * @param email - The email address of the user to add to the waitlist
 * @returns True if the user was added to the waitlist, false otherwise
 */
async function addToWhitelist(email: string): Promise<boolean> {
  const provider = new MailchimpProvider()

  return await provider.addEmail(email)
}

export { addToWhitelist }
