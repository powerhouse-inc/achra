import type { SocialMedia } from '@/modules/shared/components/links-popover'
import { SOCIAL_MEDIA_TYPES } from '@/modules/shared/lib/constants'

export function isSocialMediaType(type: string): type is SocialMedia {
  return SOCIAL_MEDIA_TYPES.includes(type as SocialMedia)
}
