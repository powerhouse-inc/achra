import type {
  ScopeOfWork_Progress,
  Sow_Binary,
  Sow_Percentage,
  Sow_Progress,
  Sow_StoryPoint,
} from '@/modules/__generated__/graphql/switchboard-generated'

// Switchboard exposes deliverable progress under two parallel schemas:
// - Sow_Progress: discriminated union (SOW_Binary | SOW_Percentage | SOW_StoryPoint)
// - ScopeOfWork_Progress: flat object with all fields optional
// These helpers accept either shape since callers across the codebase use both.
type AnyProgress = Sow_Progress | ScopeOfWork_Progress

/**
 * Type guard to check if a progress object represents percentage-based progress
 * @param progress - The progress object to check
 * @returns True if the progress is percentage-based, false otherwise
 */
export function isPercentageProgress(
  progress: AnyProgress | undefined,
): progress is Sow_Percentage {
  return !!progress && (progress.__typename === 'SOW_Percentage' || 'value' in progress)
}

/**
 * Type guard to check if a progress object represents binary (done/not done) progress
 * @param progress - The progress object to check
 * @returns True if the progress is binary-based, false otherwise
 */
export function isBinaryProgress(progress: AnyProgress | undefined): progress is Sow_Binary {
  return !!progress && (progress.__typename === 'SOW_Binary' || 'done' in progress)
}

/**
 * Type guard to check if a progress object represents story point-based progress
 * @param progress - The progress object to check
 * @returns True if the progress is story point-based, false otherwise
 */
export function isStoryPointProgress(
  progress: AnyProgress | undefined,
): progress is Sow_StoryPoint {
  return (
    !!progress &&
    (progress.__typename === 'SOW_StoryPoint' || ('completed' in progress && 'total' in progress))
  )
}

/**
 * Calculates the progress percentage from a progress object
 * @param progress - The progress object to calculate percentage from
 * @returns The progress percentage as a number (0-100), rounded to nearest integer
 */
export function getProgressPercentage(progress: AnyProgress | undefined): number {
  if (!progress) return 0

  if (isPercentageProgress(progress)) {
    return Math.round(progress.value || 0)
  }

  if (isBinaryProgress(progress)) {
    return progress.done ? 100 : 0
  }

  if (isStoryPointProgress(progress)) {
    if (!progress.completed || !progress.total) return 0
    return Math.round((progress.completed / progress.total) * 100)
  }

  // Fallback for unknown progress types
  return 0
}
