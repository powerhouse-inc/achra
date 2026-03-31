import { subscribeOrTagMember } from '@/modules/shared/lib/mailchimp/subscribe-or-tag-member'
import { MAILCHIMP_TAG } from '../../config/mailchimp-config'
import type { WhitelistProvider } from './whitelist-provider'
import 'server-only'

/**
 * Implements WhitelistProvider for Mailchimp.
 * Manages member operations via shared subscribe/tag helper.
 */
export class MailchimpProvider implements WhitelistProvider {
  /**
   * Adds an email address to the Mailchimp whitelist.
   * If the member already exists, updates their tags instead.
   */
  async addEmail(email: string): Promise<boolean> {
    return subscribeOrTagMember(email, MAILCHIMP_TAG)
  }
}
