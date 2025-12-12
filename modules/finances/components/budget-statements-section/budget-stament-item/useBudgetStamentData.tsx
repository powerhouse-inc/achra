import type { Team } from '@/modules/shared/types/team'

interface BuildersStamentProps {
  builders: Team[]
}

// TODO: Implement this hook to process correct data
export function useBudgetStamentData({ builders }: BuildersStamentProps) {
  return {
    buildersProcessed: builders,
  }
}
