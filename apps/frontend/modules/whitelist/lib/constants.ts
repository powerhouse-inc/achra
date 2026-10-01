import { PUBLIC_SHOW_WHITELIST_OVERLAY } from '@/modules/shared/lib/public-env'

/**
 * Whether to show the whitelist overlay
 */
export const SHOW_WHITELIST_OVERLAY = PUBLIC_SHOW_WHITELIST_OVERLAY === 'true'

/**
 * Storage key for the whitelist overlay
 */
export const WHITELIST_OVERLAY_STORAGE_KEY = 'whitelist-overlay-submitted'

/**
 * Routes that should not show the whitelist overlay if enabled
 */
export const OMIT_WHITELIST_OVERLAY_FROM_ROUTES = ['/', '/networks', '/cases']
