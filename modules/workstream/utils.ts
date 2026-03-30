import { format } from 'date-fns'
import type { Maybe, Sow_BudgetType } from '@/modules/__generated__/graphql/switchboard-generated'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import type { WorkstreamDetailsProject } from '../project/types'

/**
 * Finds the project that contains the deliverable ID
 * @param deliverableId The ID of the deliverable
 * @param projects The list of projects
 * @returns The project that contains the deliverable ID
 */
export function getProjectByDeliverableId(
  deliverableId: string,
  projects: WorkstreamDetailsProject[],
) {
  return projects.find((project) => project.scope?.deliverables.includes(deliverableId))
}

// TODO: Improve these functions when the API is ready
export function formatBudgetType(budgetType?: Sow_BudgetType | null): string {
  if (!budgetType) return '-'
  return budgetType.toUpperCase()
}

export function formatApplicationDeadline(deadline?: Maybe<string>): string {
  if (!deadline) return 'TBD'
  return format(new Date(deadline), 'd MMM yyyy').toUpperCase()
}

export function formatProjectBudget(budget?: number | null, currency?: string | null): string {
  if (budget == null) return '-'
  return `${usLocalizedNumber(budget, 2)} ${currency ?? 'USD'}`
}
