import client, { type ErrorResponse } from '@mailchimp/mailchimp_marketing'
import {
  MAILCHIMP_API_KEY,
  MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_SERVER_LOCATION,
  MAILCHIMP_TAG,
} from '../../config/mailchimp-config'
import type { WhitelistProvider } from './whitelist-provider'
import 'server-only'

interface MailchimpError extends Error {
  response?: {
    body?: ErrorResponse
  }
}

/**
 * Implements WhitelistProvider for Mailchimp.
 * Manages client setup and member operations.
 */
export class MailchimpProvider implements WhitelistProvider {
  private getClient() {
    client.setConfig({
      apiKey: MAILCHIMP_API_KEY,
      server: MAILCHIMP_SERVER_LOCATION,
    })

    return client
  }

  /**
   * Adds an email address to the Mailchimp whitelist.
   * If the member already exists, updates their tags instead.
   *
   * @param email - The email address to add to the whitelist
   * @returns Promise that resolves to true if the email was successfully added, false otherwise
   */
  async addEmail(email: string): Promise<boolean> {
    const client = this.getClient()

    try {
      await client.lists.addListMember(MAILCHIMP_AUDIENCE_ID, {
        email_address: email,
        status: 'subscribed',
        tags: [MAILCHIMP_TAG],
      })

      return true
    } catch (error) {
      if (this.isMailchimpError(error) && error.response?.body?.title === 'Member Exists') {
        // Member already exists, update tags instead
        // This ensures the Achra whitelist tag is added
        // in case the user has already subscribed to other products on the list
        return await this.updateMemberTags(email)
      }

      return false // something went wrong
    }
  }

  /**
   * Updates the tags for an existing member in the Mailchimp whitelist.
   *
   * @param email - The email address of the user to update the tags for
   * @returns True if the tags were updated, false otherwise
   * @throws An error if the tags could not be updated
   */
  private async updateMemberTags(email: string): Promise<boolean> {
    const client = this.getClient()

    await client.lists.updateListMemberTags(MAILCHIMP_AUDIENCE_ID, email, {
      tags: [
        {
          name: MAILCHIMP_TAG,
          status: 'active',
        },
      ],
    })

    return true
    // if this fails, it automatically throws an error
  }

  /**
   * Type guard to check if an error is a Mailchimp error.
   */
  private isMailchimpError(error: unknown): error is MailchimpError {
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
}
