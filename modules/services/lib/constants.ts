import { RsTemplateStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import type { ServiceBadge } from '../types'

/** Public path to the default service cover image when `thumbnailUrl` is missing. */
export const SERVICE_INFO_DEFAULT_COVER_PATH = '/services/covers/cover-01.jpg'

/** Duration (ms) within which a service is considered "new" based on lastModified. */
export const NEW_SERVICE_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1000

/**
 * Hardcoded service IDs for badges that will come from the API later.
 * TODO: [API Integration] Replace with API-driven badge data.
 */
export const RECOMMENDED_SERVICE_IDS: string[] = []
export const MOST_POPULAR_SERVICE_IDS: string[] = []

/** Sort priority for service statuses (lower = higher priority). */
export const STATUS_PRIORITY: Record<string, number> = {
  [RsTemplateStatus.Active]: 0,
  [RsTemplateStatus.ComingSoon]: 1,
}

/** Visual config for each service badge type (label text + Tailwind classes). */
export const BADGE_CONFIG: Record<ServiceBadge, { label: string; className: string }> = {
  'coming-soon': {
    label: 'Coming Soon',
    className: 'bg-destructive/15 text-destructive',
  },
  recommended: {
    label: 'Recommended',
    className: 'bg-status-success/20 text-status-success',
  },
  'most-popular': {
    label: 'Most Popular',
    className: 'bg-primary/15 text-primary',
  },
  new: {
    label: 'New',
    className: 'bg-primary/15 text-primary',
  },
  'free-tier': {
    label: 'Free tier included',
    className: 'bg-status-success/20 text-status-success',
  },
  'pro-only': {
    label: 'Pro only',
    className: 'bg-muted text-muted-foreground',
  },
}
