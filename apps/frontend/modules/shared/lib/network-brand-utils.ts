import type { Network } from '@/modules/__generated__/graphql/switchboard-generated'
import { isImageFieldEmpty } from './navbar-utils'

/**
 * Result of image selection for a network
 */
export interface ImageSelectionResult {
  lightImage: string | null
  darkImage: string | null
  source: 'logo' | 'icon' | 'none'
}

/**
 * Selects the appropriate images (logo or icon) for a network based on preference
 * @param network - The network object
 * @param preference - Whether to prefer 'logo' or 'icon'
 * @returns ImageSelectionResult with light/dark images and source type
 */
export function selectNetworkImages(
  network: Network,
  preference: 'logo' | 'icon',
): ImageSelectionResult {
  const logo = network.logo
  const logoDark = network.darkThemeLogo
  const icon = network.icon
  const iconDark = network.darkThemeIcon

  const hasLogo = !isImageFieldEmpty(logo)
  const hasLogoDark = !isImageFieldEmpty(logoDark)
  const hasIcon = !isImageFieldEmpty(icon)
  const hasIconDark = !isImageFieldEmpty(iconDark)

  if (preference === 'logo') {
    // Prefer logo, fallback to icon
    if (hasLogo || hasLogoDark) {
      return {
        lightImage: hasLogo ? (logo as string) : null,
        darkImage: hasLogoDark ? (logoDark as string) : null,
        source: 'logo',
      }
    }
    if (hasIcon || hasIconDark) {
      return {
        lightImage: hasIcon ? (icon as string) : null,
        darkImage: hasIconDark ? (iconDark as string) : null,
        source: 'icon',
      }
    }
  } else {
    // Prefer icon, fallback to logo
    if (hasIcon || hasIconDark) {
      return {
        lightImage: hasIcon ? (icon as string) : null,
        darkImage: hasIconDark ? (iconDark as string) : null,
        source: 'icon',
      }
    }
    if (hasLogo || hasLogoDark) {
      return {
        lightImage: hasLogo ? (logo as string) : null,
        darkImage: hasLogoDark ? (logoDark as string) : null,
        source: 'logo',
      }
    }
  }

  // No images available
  return {
    lightImage: null,
    darkImage: null,
    source: 'none',
  }
}
