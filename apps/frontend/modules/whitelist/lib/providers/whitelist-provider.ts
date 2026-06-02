import 'server-only'

/**
 * Whitelist provider interface for integrating with any backend service.
 */
export interface WhitelistProvider {
  /**
   * Adds an email address to the whitelist.
   *
   * @param email - The email address to add to the whitelist
   * @returns Promise that resolves to true if the email was successfully added, false otherwise
   */
  addEmail(email: string): Promise<boolean>
}
