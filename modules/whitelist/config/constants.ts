/**
 * Whether to show the whitelist overlay
 */
export const SHOW_WHITELIST_OVERLAY = process.env.NEXT_PUBLIC_SHOW_WHITELIST_OVERLAY === 'true'

/**
 * Routes that should not show the whitelist overlay if enabled
 */
export const OMIT_WHITELIST_OVERLAY_FROM_ROUTES = ['/', '/networks', '/cases']
