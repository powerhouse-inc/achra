import { DateTime } from 'luxon'
import type { Team } from '@/modules/shared/types/team'

export const getProfileUpdateDate = (team: Team): DateTime | undefined => {
  if (team.lastActivity.update_at) {
    return DateTime.fromISO(team.lastActivity.update_at)
  }
  if (team.lastActivity.created_at) {
    return DateTime.fromISO(team.lastActivity.created_at)
  }
  return undefined
}
