import { SOCIAL_MEDIA_TYPES } from '../config/constants'
import type { SocialMedia } from '../links-popover'

export function isSocialMediaType(type: string): type is SocialMedia {
  return SOCIAL_MEDIA_TYPES.includes(type as SocialMedia)
}
