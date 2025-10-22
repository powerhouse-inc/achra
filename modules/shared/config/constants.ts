/**
 * Fast refresh interval for UseQuery to refetch data every X interval
 */
export const FAST_REFRESH_INTERVAL = 5000 // 5 seconds

/**
 * Base URL for the application
 */
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://achra.com'

/**
 * Whether to show the whitelist overlay
 */
export const SHOW_WHITELIST_OVERLAY = process.env.NEXT_PUBLIC_SHOW_WHITELIST_OVERLAY === 'true'

/**
 * Storage key for the whitelist overlay
 */
export const WHITELIST_OVERLAY_STORAGE_KEY = 'whitelist-overlay-submitted'

/**
 * Routes that should not show the whitelist overlay if enabled
 */
export const OMIT_WHITELIST_OVERLAY_FROM_ROUTES = ['/', '/networks', '/cases']
