import type {
  ScopeOfWork_Binary,
  ScopeOfWork_Percentage,
  ScopeOfWork_Progress,
  ScopeOfWork_StoryPoint,
} from '@/modules/__generated__/graphql/switchboard-generated'

/**
 * Type guard to check if a progress object represents percentage-based progress
 * @param progress - The progress object to check
 * @returns True if the progress is percentage-based, false otherwise
 */
export function isPercentageProgress(
  progress: ScopeOfWork_Progress | undefined,
): progress is ScopeOfWork_Percentage {
  return !!progress && (progress.__typename === 'ScopeOfWork_Percentage' || 'value' in progress)
}

/**
 * Type guard to check if a progress object represents binary (done/not done) progress
 * @param progress - The progress object to check
 * @returns True if the progress is binary-based, false otherwise
 */
export function isBinaryProgress(
  progress: ScopeOfWork_Progress | undefined,
): progress is ScopeOfWork_Binary {
  return !!progress && (progress.__typename === 'ScopeOfWork_Binary' || 'done' in progress)
}

/**
 * Type guard to check if a progress object represents story point-based progress
 * @param progress - The progress object to check
 * @returns True if the progress is story point-based, false otherwise
 */
export function isStoryPointProgress(
  progress: ScopeOfWork_Progress | undefined,
): progress is ScopeOfWork_StoryPoint {
  return (
    !!progress &&
    (progress.__typename === 'ScopeOfWork_StoryPoint' ||
      ('completed' in progress && 'total' in progress))
  )
}

/**
 * Calculates the progress percentage from a ScopeOfWork_Progress object
 * @param progress - The progress object to calculate percentage from
 * @returns The progress percentage as a number (0-100), rounded to nearest integer
 */
export function getProgressPercentage(progress: ScopeOfWork_Progress | undefined): number {
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
